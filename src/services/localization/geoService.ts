// Geolocation Service
// Handles IP-based and browser-based location detection with graceful fallbacks

import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY, getCountryByCode, type CountryConfig } from './countries';

export interface GeoLocation {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
}

export interface GeoDetectionResult {
  location: GeoLocation;
  countryConfig: CountryConfig;
  source: 'ip' | 'browser' | 'stored' | 'default';
  confidence: 'high' | 'medium' | 'low';
}

const STORAGE_KEY = 'hireloop_user_location';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface StoredLocation {
  location: GeoLocation;
  countryConfig: CountryConfig;
  timestamp: number;
  userOverride: boolean;
}

// Check if we have a valid stored location
function getStoredLocation(): StoredLocation | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data: StoredLocation = JSON.parse(stored);
    const now = Date.now();
    
    // User overrides never expire
    if (data.userOverride) return data;
    
    // Check if cache has expired
    if (now - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

// Save location to storage
export function saveLocation(location: GeoLocation, countryConfig: CountryConfig, userOverride = false): void {
  try {
    const data: StoredLocation = {
      location,
      countryConfig,
      timestamp: Date.now(),
      userOverride,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage might be full or disabled
    console.warn('[GeoService] Failed to save location to storage');
  }
}

// IP-based geolocation using free APIs
// Note: In production, consider using a paid service for reliability
async function detectByIP(): Promise<GeoDetectionResult | null> {
  const apis = [
    // Primary: ip-api.com (free, no key required, 45 req/min limit)
    {
      url: 'http://ip-api.com/json/?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp',
      parse: (data: any): GeoLocation | null => {
        if (data.status !== 'success') return null;
        return {
          country: data.country,
          countryCode: data.countryCode,
          region: data.regionName,
          city: data.city,
          latitude: data.lat,
          longitude: data.lon,
          timezone: data.timezone,
          isp: data.isp,
        };
      },
    },
    // Fallback: ipapi.co (free tier, 1000 req/day)
    {
      url: 'https://ipapi.co/json/',
      parse: (data: any): GeoLocation | null => {
        if (data.error) return null;
        return {
          country: data.country_name,
          countryCode: data.country_code,
          region: data.region,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
        };
      },
    },
  ];

  for (const api of apis) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(api.url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeout);
      
      if (!response.ok) continue;
      
      const data = await response.json();
      const location = api.parse(data);
      
      if (location && location.countryCode) {
        const countryConfig = getCountryByCode(location.countryCode) || DEFAULT_COUNTRY;
        return {
          location,
          countryConfig,
          source: 'ip',
          confidence: getCountryByCode(location.countryCode) ? 'high' : 'medium',
        };
      }
    } catch (error) {
      // Try next API
      console.warn('[GeoService] IP detection failed for API:', api.url);
    }
  }
  
  return null;
}

// Browser Geolocation API (requires permission)
async function detectByBrowser(): Promise<GeoDetectionResult | null> {
  if (!navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode using free API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'HireLoop/1.0',
                'Accept': 'application/json',
              },
            }
          );
          
          if (!response.ok) {
            resolve(null);
            return;
          }
          
          const data = await response.json();
          const countryCode = data.address?.country_code?.toUpperCase();
          
          if (countryCode) {
            const countryConfig = getCountryByCode(countryCode) || DEFAULT_COUNTRY;
            const location: GeoLocation = {
              country: data.address?.country || '',
              countryCode,
              region: data.address?.state || data.address?.region || '',
              city: data.address?.city || data.address?.town || data.address?.village || '',
              latitude,
              longitude,
            };
            
            resolve({
              location,
              countryConfig,
              source: 'browser',
              confidence: 'high',
            });
            return;
          }
        } catch {
          // Reverse geocoding failed
        }
        
        resolve(null);
      },
      () => {
        // User denied permission or error
        resolve(null);
      },
      {
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
        enableHighAccuracy: false,
      }
    );
  });
}

// Main detection function - non-blocking, returns immediately with stored/default
// and updates asynchronously
export async function detectLocation(forceRefresh = false): Promise<GeoDetectionResult> {
  // Check stored location first (unless forcing refresh)
  if (!forceRefresh) {
    const stored = getStoredLocation();
    if (stored) {
      return {
        location: stored.location,
        countryConfig: stored.countryConfig,
        source: 'stored',
        confidence: stored.userOverride ? 'high' : 'medium',
      };
    }
  }

  // Try IP-based detection first (non-blocking, no permission required)
  const ipResult = await detectByIP();
  if (ipResult) {
    saveLocation(ipResult.location, ipResult.countryConfig, false);
    return ipResult;
  }

  // Fallback to browser geolocation (might show permission dialog)
  const browserResult = await detectByBrowser();
  if (browserResult) {
    saveLocation(browserResult.location, browserResult.countryConfig, false);
    return browserResult;
  }

  // Ultimate fallback to default
  const defaultLocation: GeoLocation = {
    country: DEFAULT_COUNTRY.name,
    countryCode: DEFAULT_COUNTRY.code,
  };

  return {
    location: defaultLocation,
    countryConfig: DEFAULT_COUNTRY,
    source: 'default',
    confidence: 'low',
  };
}

// Quick sync check for initial render (doesn't block)
export function getInitialLocation(): GeoDetectionResult {
  const stored = getStoredLocation();
  if (stored) {
    return {
      location: stored.location,
      countryConfig: stored.countryConfig,
      source: 'stored',
      confidence: stored.userOverride ? 'high' : 'medium',
    };
  }

  // Return default for immediate render
  return {
    location: {
      country: DEFAULT_COUNTRY.name,
      countryCode: DEFAULT_COUNTRY.code,
    },
    countryConfig: DEFAULT_COUNTRY,
    source: 'default',
    confidence: 'low',
  };
}

// Set user's manual country selection
export function setUserCountry(countryCode: string): GeoDetectionResult | null {
  const countryConfig = getCountryByCode(countryCode);
  if (!countryConfig) return null;

  const location: GeoLocation = {
    country: countryConfig.name,
    countryCode: countryConfig.code,
  };

  saveLocation(location, countryConfig, true);

  return {
    location,
    countryConfig,
    source: 'stored',
    confidence: 'high',
  };
}

// Clear stored location (for testing or reset)
export function clearStoredLocation(): void {
  localStorage.removeItem(STORAGE_KEY);
}
