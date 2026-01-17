// Country, currency, and language mapping for 20+ countries
// This data is used for auto-localization based on detected location

export interface CountryConfig {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  flag: string;
  currency: {
    code: string; // ISO 4217
    symbol: string;
    name: string;
  };
  language: {
    code: string; // BCP-47
    name: string;
    nativeName: string;
  };
  locale: string; // Used for number/date formatting
  phoneCode: string;
  continent: string;
}

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar' },
    language: { code: 'en-US', name: 'English', nativeName: 'English' },
    locale: 'en-US',
    phoneCode: '+1',
    continent: 'North America',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: { code: 'GBP', symbol: '£', name: 'British Pound' },
    language: { code: 'en-GB', name: 'English', nativeName: 'English' },
    locale: 'en-GB',
    phoneCode: '+44',
    continent: 'Europe',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    language: { code: 'en-CA', name: 'English', nativeName: 'English' },
    locale: 'en-CA',
    phoneCode: '+1',
    continent: 'North America',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    language: { code: 'en-IN', name: 'English', nativeName: 'English' },
    locale: 'en-IN',
    phoneCode: '+91',
    continent: 'Asia',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    language: { code: 'ar-AE', name: 'Arabic', nativeName: 'العربية' },
    locale: 'ar-AE',
    phoneCode: '+971',
    continent: 'Asia',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    language: { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
    locale: 'de-DE',
    phoneCode: '+49',
    continent: 'Europe',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    language: { code: 'fr-FR', name: 'French', nativeName: 'Français' },
    locale: 'fr-FR',
    phoneCode: '+33',
    continent: 'Europe',
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    language: { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
    locale: 'es-ES',
    phoneCode: '+34',
    continent: 'Europe',
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    language: { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
    locale: 'it-IT',
    phoneCode: '+39',
    continent: 'Europe',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    language: { code: 'nl-NL', name: 'Dutch', nativeName: 'Nederlands' },
    locale: 'nl-NL',
    phoneCode: '+31',
    continent: 'Europe',
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    currency: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    language: { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português' },
    locale: 'pt-BR',
    phoneCode: '+55',
    continent: 'South America',
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    currency: { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
    language: { code: 'es-MX', name: 'Spanish', nativeName: 'Español' },
    locale: 'es-MX',
    phoneCode: '+52',
    continent: 'North America',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    language: { code: 'en-AU', name: 'English', nativeName: 'English' },
    locale: 'en-AU',
    phoneCode: '+61',
    continent: 'Oceania',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    language: { code: 'en-SG', name: 'English', nativeName: 'English' },
    locale: 'en-SG',
    phoneCode: '+65',
    continent: 'Asia',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    currency: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    language: { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    locale: 'id-ID',
    phoneCode: '+62',
    continent: 'Asia',
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    currency: { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    language: { code: 'en-PH', name: 'English', nativeName: 'English' },
    locale: 'en-PH',
    phoneCode: '+63',
    continent: 'Asia',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currency: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    language: { code: 'en-NG', name: 'English', nativeName: 'English' },
    locale: 'en-NG',
    phoneCode: '+234',
    continent: 'Africa',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    language: { code: 'en-ZA', name: 'English', nativeName: 'English' },
    locale: 'en-ZA',
    phoneCode: '+27',
    continent: 'Africa',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    language: { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
    locale: 'ja-JP',
    phoneCode: '+81',
    continent: 'Asia',
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    currency: { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    language: { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
    locale: 'ko-KR',
    phoneCode: '+82',
    continent: 'Asia',
  },
];

// Helper functions
export function getCountryByCode(code: string): CountryConfig | undefined {
  return SUPPORTED_COUNTRIES.find(c => c.code === code);
}

export function getCountryByCurrency(currencyCode: string): CountryConfig | undefined {
  return SUPPORTED_COUNTRIES.find(c => c.currency.code === currencyCode);
}

export function getCountriesByLanguage(langCode: string): CountryConfig[] {
  const baseLang = langCode.split('-')[0];
  return SUPPORTED_COUNTRIES.filter(c => c.language.code.startsWith(baseLang));
}

export function getCountriesByContinent(continent: string): CountryConfig[] {
  return SUPPORTED_COUNTRIES.filter(c => c.continent === continent);
}

// Default country when detection fails
export const DEFAULT_COUNTRY: CountryConfig = SUPPORTED_COUNTRIES[0]; // United States
