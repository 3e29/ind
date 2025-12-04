import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import MachinerySection from "@/components/MachinerySection";
import { i18nConfig, type Locale } from "@/lib/i18n/config";

// Dynamically import below-the-fold heavy components for better LCP
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
      </div>
    </div>
  ),
  ssr: true,
});

const TrustedPartners = dynamic(() => import("@/components/TrustedPartners"), {
  loading: () => (
    <div className="py-16 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
        <div className="flex justify-center gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-24 h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => (
    <div className="py-24 bg-[#0d47a1] animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="h-8 bg-white/20 rounded w-64 mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-96"></div>
          </div>
          <div className="bg-white/10 rounded-2xl h-96"></div>
        </div>
      </div>
    </div>
  ),
  ssr: true,
});

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Home({ params }: HomePageProps) {
  return (
    <>
      {/* Hero Section - Above the Fold (LCP Critical) - NOT lazy loaded */}
      <Hero />

      {/* Product Categories Section - Important for UX, keep static import */}
      <MachinerySection />

      {/* Below the Fold Sections - Dynamically imported for code splitting */}
      <WhyChooseUs />

      <TrustedPartners />

      <ContactSection />
    </>
  );
}
