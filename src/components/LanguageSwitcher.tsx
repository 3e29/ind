"use client";

import { usePathname, useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { i18nConfig, getAlternateLocale, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/dictionary-context";

interface LanguageSwitcherProps {
  className?: string;
  isScrolled?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  isScrolled = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const switchLanguage = () => {
    const newLocale = getAlternateLocale(locale);

    // Remove current locale from pathname and add new one
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace locale segment

    const newPath = segments.join("/");

    // Use router.push for client-side navigation
    router.push(newPath);
  };

  const alternateLocale = getAlternateLocale(locale);
  const flagCode = alternateLocale === "en" ? "US" : "SA";
  const flagTitle = alternateLocale === "en" ? "English" : "العربية";

  return (
    <button
      onClick={switchLanguage}
      className={`p-2 rounded-full transition-colors ${
        isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
      } ${className}`}
      aria-label={`Switch to ${flagTitle}`}
      title={`Switch to ${flagTitle}`}
    >
      <ReactCountryFlag
        countryCode={flagCode}
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title={flagTitle}
      />
    </button>
  );
}

// Alternate version using a dropdown (for future use)
export function LanguageDropdown({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      className={`bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm ${className}`}
      aria-label="Select language"
    >
      {i18nConfig.locales.map((loc) => (
        <option key={loc} value={loc}>
          {i18nConfig.localeNames[loc]}
        </option>
      ))}
    </select>
  );
}
