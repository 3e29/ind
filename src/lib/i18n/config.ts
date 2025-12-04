// i18n Configuration for URL-based routing
// This approach eliminates hydration mismatches by using server-side locale detection

export const i18nConfig = {
  defaultLocale: "en" as const,
  locales: ["en", "ar"] as const,
  localeNames: {
    en: "English",
    ar: "العربية",
  },
  localeDirection: {
    en: "ltr" as const,
    ar: "rtl" as const,
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

// Type-safe dictionary structure
export type Dictionary = typeof import("@/assets/language/english.json");

// Server-side dictionary loader - used in Server Components and layouts
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/assets/language/english.json").then((m) => m.default),
  ar: () => import("@/assets/language/arabic.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Validate locale, fallback to default
  const validLocale = i18nConfig.locales.includes(locale)
    ? locale
    : i18nConfig.defaultLocale;

  return dictionaries[validLocale]();
}

// Helper to get direction from locale
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return i18nConfig.localeDirection[locale] || "ltr";
}

// Helper to validate if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

// Helper to get alternate locale
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
