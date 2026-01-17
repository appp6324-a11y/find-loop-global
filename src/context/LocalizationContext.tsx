import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  detectLocation, 
  getInitialLocation, 
  setUserCountry,
  type GeoDetectionResult 
} from '@/services/localization/geoService';
import { 
  SUPPORTED_COUNTRIES, 
  getCountryByCode,
  type CountryConfig 
} from '@/services/localization/countries';
import { formatPrice, formatNumber, formatDate, formatRelativeTime } from '@/services/localization/formatters';
import { getLanguageFromLocale } from '@/i18n';

interface LocalizationContextType {
  // Current location state
  country: CountryConfig;
  location: GeoDetectionResult['location'];
  isDetecting: boolean;
  
  // Currency & locale
  currency: CountryConfig['currency'];
  locale: string;
  
  // Actions
  setCountry: (countryCode: string) => void;
  refreshLocation: () => Promise<void>;
  
  // Formatting helpers
  formatPrice: (amount: number, currencyOverride?: string) => string;
  formatNumber: (value: number) => string;
  formatDate: (date: Date | string) => string;
  formatRelativeTime: (date: Date | string) => string;
  
  // All supported countries for selectors
  supportedCountries: typeof SUPPORTED_COUNTRIES;
}

const LocalizationContext = createContext<LocalizationContextType | null>(null);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  
  // Initialize with stored or default location (non-blocking)
  const initial = getInitialLocation();
  const [geoResult, setGeoResult] = useState<GeoDetectionResult>(initial);
  const [isDetecting, setIsDetecting] = useState(initial.source === 'default');

  // Detect location on mount (async, doesn't block render)
  useEffect(() => {
    if (geoResult.source === 'default') {
      detectLocation().then((result) => {
        setGeoResult(result);
        setIsDetecting(false);
        // Update language based on detected country
        const lang = getLanguageFromLocale(result.countryConfig.language.code);
        i18n.changeLanguage(lang);
      });
    }
  }, []);

  // Update language when country changes
  useEffect(() => {
    const lang = getLanguageFromLocale(geoResult.countryConfig.language.code);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [geoResult.countryConfig, i18n]);

  const setCountry = useCallback((countryCode: string) => {
    const result = setUserCountry(countryCode);
    if (result) {
      setGeoResult(result);
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    setIsDetecting(true);
    const result = await detectLocation(true);
    setGeoResult(result);
    setIsDetecting(false);
  }, []);

  const value = useMemo<LocalizationContextType>(() => ({
    country: geoResult.countryConfig,
    location: geoResult.location,
    isDetecting,
    currency: geoResult.countryConfig.currency,
    locale: geoResult.countryConfig.locale,
    setCountry,
    refreshLocation,
    formatPrice: (amount: number, currencyOverride?: string) => 
      formatPrice(amount, currencyOverride || geoResult.countryConfig.currency.code, geoResult.countryConfig.locale),
    formatNumber: (value: number) => 
      formatNumber(value, geoResult.countryConfig.locale),
    formatDate: (date: Date | string) => 
      formatDate(date, geoResult.countryConfig.locale),
    formatRelativeTime: (date: Date | string) => 
      formatRelativeTime(date, geoResult.countryConfig.locale),
    supportedCountries: SUPPORTED_COUNTRIES,
  }), [geoResult, isDetecting, setCountry, refreshLocation]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}
