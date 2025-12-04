import React from "react";
import Link from "next/link";
import { getDictionary, i18nConfig, type Locale } from "@/lib/i18n/config";
import ProductCard from "@/components/ProductCard";
import {
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedHeroBanner,
} from "@/components/AnimatedSection";

// Import subcategory images for air compressors
import screwImage from "@/assets/images/air-compressor/pm-vsd-speed-screw-air-compressor.webp";
import pistonImage from "@/assets/images/air-compressor/piston-air-compresor.webp";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface AirCompressorPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AirCompressorPage({
  params,
}: AirCompressorPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const subcategories = [
    {
      title:
        dict.navbar?.subcategories?.screwTypeCompressors ||
        "Screw Type Compressors",
      image: screwImage,
      href: `/${lang}/air-compressor/screw`,
      description:
        dict.airCompressor?.screwDescription ||
        "High-efficiency rotary screw air compressors",
    },
    {
      title:
        dict.navbar?.subcategories?.pistonTypeCompressors ||
        "Piston Type Compressors",
      image: pistonImage,
      href: `/${lang}/air-compressor/piston`,
      description:
        dict.airCompressor?.pistonDescription ||
        "Reliable piston-driven air compressors",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-[--color-primary] pt-32 pb-16 sm:pt-36 sm:pb-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[--color-cta]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <AnimatedHeroBanner
          breadcrumbItems={[
            { label: dict.navbar?.home || "Home", href: `/${lang}` },
            {
              label: dict.products?.title || "Products",
              href: `/${lang}/products`,
            },
            { label: dict.navbar?.airCompressors || "Air Compressors" },
          ]}
          title={dict.navbar?.airCompressors || "Air Compressors"}
          description={
            dict.airCompressor?.pageDescription ||
            "Explore our range of industrial air compressors. From screw type to piston compressors, we provide reliable compressed air solutions for every application."
          }
        />
      </section>

      {/* Subcategories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSectionHeader
            badge={dict.airCompressor?.subcategoriesBadge || "Air Compressors"}
            title={
              dict.airCompressor?.subcategoriesTitle ||
              "Browse Compressor Types"
            }
            subtitle={
              dict.airCompressor?.subcategoriesSubtitle ||
              "Select a category to view our air compressor solutions"
            }
          />

          {/* Subcategory Grid */}
          <AnimatedCardGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {subcategories.map((subcategory, index) => (
              <ProductCard
                key={index}
                title={subcategory.title}
                image={subcategory.image}
                href={subcategory.href}
                description={subcategory.description}
                viewText={dict.products?.viewProducts || "View Products"}
              />
            ))}
          </AnimatedCardGrid>
        </div>
      </section>
    </>
  );
}
