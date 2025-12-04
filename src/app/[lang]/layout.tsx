import type { Metadata } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import "../globals.css";
import {
  i18nConfig,
  getDictionary,
  getDirection,
  type Locale,
  DictionaryProvider,
} from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Dynamically import Footer - it's below the fold and non-blocking for LCP
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => (
    <footer className="bg-gray-900 text-white py-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="h-32 bg-gray-800 rounded"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
        </div>
      </div>
    </footer>
  ),
});

// Local Inter font for English - Variable font with all weights
const inter = localFont({
  src: "../../assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
  display: "swap",
  variable: "--font-inter",
});

// Local Cairo font for Arabic - Variable font with all weights
const cairo = localFont({
  src: "../../assets/fonts/Cairo/Cairo-VariableFont_slnt,wght.ttf",
  display: "swap",
  variable: "--font-cairo",
});

// Generate static params for all locales at build time
export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }));
}

// Generate dynamic metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const isArabic = lang === "ar";

  return {
    title: {
      default: isArabic
        ? "حلول الآلات الصناعية"
        : "Industrial Machinery Solutions",
      template: isArabic
        ? "%s | حلول الآلات الصناعية"
        : "%s | Industrial Machinery",
    },
    description: isArabic
      ? "آلات عالية الجودة لمعالجة الأخشاب والمعادن والزجاج والألمنيوم"
      : "High-quality machinery for wood, metal, glass, and aluminum processing",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SA",
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  // Validate locale - fallback to default if invalid
  const validLang = i18nConfig.locales.includes(lang)
    ? lang
    : i18nConfig.defaultLocale;

  const direction = getDirection(validLang);
  const dictionary = await getDictionary(validLang);

  // Choose font based on locale
  const fontClass =
    validLang === "ar"
      ? `${cairo.variable} font-cairo`
      : `${inter.variable} font-sans`;

  return (
    <html lang={validLang} dir={direction} suppressHydrationWarning>
      <body className={fontClass}>
        <DictionaryProvider dictionary={dictionary} locale={validLang}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppIcon />
        </DictionaryProvider>
      </body>
    </html>
  );
}
