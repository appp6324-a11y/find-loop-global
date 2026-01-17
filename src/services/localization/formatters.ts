// Locale-aware formatting utilities for prices, numbers, dates, etc.

import type { CountryConfig } from './countries';

// Currency formatter factory
export function createCurrencyFormatter(config: CountryConfig) {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Format price with proper locale
export function formatPrice(
  amount: number,
  currencyCode: string,
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback for invalid currency codes
    return `${currencyCode} ${amount.toLocaleString(locale)}`;
  }
}

// Format price range
export function formatPriceRange(
  min: number,
  max: number,
  currencyCode: string,
  locale: string = 'en-US'
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

// Number formatter
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

// Compact number formatter (1K, 1M, etc.)
export function formatCompactNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

// Date formatter
export function formatDate(
  date: Date | string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...options,
  }).format(d);
}

// Relative time formatter (e.g., "2 hours ago", "in 3 days")
export function formatRelativeTime(
  date: Date | string,
  locale: string = 'en-US'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, 'second');
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, 'minute');
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, 'hour');
  } else if (Math.abs(diffDay) < 7) {
    return rtf.format(diffDay, 'day');
  } else if (Math.abs(diffWeek) < 4) {
    return rtf.format(diffWeek, 'week');
  } else if (Math.abs(diffMonth) < 12) {
    return rtf.format(diffMonth, 'month');
  } else {
    return rtf.format(diffYear, 'year');
  }
}

// Time formatter
export function formatTime(
  date: Date | string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
    ...options,
  }).format(d);
}

// Full datetime formatter
export function formatDateTime(
  date: Date | string,
  locale: string = 'en-US'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}

// List formatter (e.g., "A, B, and C")
export function formatList(
  items: string[],
  locale: string = 'en-US',
  type: 'conjunction' | 'disjunction' = 'conjunction'
): string {
  // Fallback for environments without ListFormat
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) {
    return type === 'conjunction' ? `${items[0]} and ${items[1]}` : `${items[0]} or ${items[1]}`;
  }
  const last = items[items.length - 1];
  const rest = items.slice(0, -1).join(', ');
  return type === 'conjunction' ? `${rest}, and ${last}` : `${rest}, or ${last}`;
}

// Percentage formatter
export function formatPercent(
  value: number,
  locale: string = 'en-US',
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}
