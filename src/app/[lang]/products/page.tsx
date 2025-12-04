import React from "react";
import Link from "next/link";
import { getDictionary, i18nConfig, type Locale } from "@/lib/i18n/config";
import ProductCard from "@/components/ProductCard";
import {
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedHeroBanner,
} from "@/components/AnimatedSection";

// Import category images
import woodImage from "@/assets/images/wood machine/squadratrice-optima-3200.webp";
import metalImage from "@/assets/images/laser machine/Open-Type-2000W-Fiber-Laser-Cutting-Machine-2.webp";
import glassAluminiumImage from "@/assets/images/ALUMINUM-MACHINE/copy router machine galaxy-1.webp";
import airCompressorImage from "@/assets/images/air-compressor/pm-vsd-speed-screw-air-compressor.webp";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface ProductsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const categories = [
    {
      title: dict.navbar?.woodMachines || "Wood Working Machines",
      image: woodImage,
      href: `/${lang}/wood`,
      description:
        dict.machinery?.woodDescription ||
        "CNC and ordinary wood processing machines",
    },
    {
      title:
        dict.navbar?.glassAluminiumMachines ||
        "Aluminum & Glass Working Machines",
      image: glassAluminiumImage,
      href: `/${lang}/glass-aluminium`,
      description:
        dict.machinery?.glassAluminiumDescription ||
        "Professional glass and aluminum processing",
    },
    {
      title: dict.navbar?.metalMachines || "Metal Working Machines",
      image: metalImage,
      href: `/${lang}/metal`,
      description:
        dict.machinery?.metalDescription ||
        "Laser, waterjet, and bandsaw cutting solutions",
    },
    {
      title: dict.navbar?.airCompressors || "Air Compressors",
      image: airCompressorImage,
      href: `/${lang}/air-compressor`,
      description:
        dict.machinery?.airCompressorDescription ||
        "Industrial air compressor systems",
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
            { label: dict.products?.title || "Products" },
          ]}
          title={dict.products?.title || "Our Products"}
          description={
            dict.products?.description ||
            "Discover our comprehensive range of industrial machinery. From wood processing to metal cutting, we provide high-quality solutions for every manufacturing need."
          }
        />
      </section>

      {/* Product Categories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSectionHeader
            badge={dict.products?.categoriesBadge || "Browse Categories"}
            title={dict.products?.categoriesTitle || "Product Categories"}
            subtitle={
              dict.products?.categoriesSubtitle ||
              "Select a category to explore our specialized machinery collections"
            }
          />

          {/* Category Grid */}
          <AnimatedCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <ProductCard
                key={index}
                title={category.title}
                image={category.image}
                href={category.href}
                description={category.description}
                viewText={dict.products?.viewCategory || "View Category"}
              />
            ))}
          </AnimatedCardGrid>
        </div>
      </section>
    </>
  );
}
