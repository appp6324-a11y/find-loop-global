import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import de from './translations/de.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import pt from './translations/pt.json';

// Supported languages mapping
export const SUPPORTED_LANGUAGES = {
  'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  'pt': { name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Get language from locale code (e.g., 'en-US' -> 'en')
export function getLanguageFromLocale(locale: string): SupportedLanguage {
  const lang = locale.split('-')[0].toLowerCase();
  return (lang in SUPPORTED_LANGUAGES ? lang : 'en') as SupportedLanguage;
}

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      es: { translation: es },
      fr: { translation: fr },
      pt: { translation: pt },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
