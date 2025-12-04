import React from "react";
import Link from "next/link";
import { getDictionary, i18nConfig, type Locale } from "@/lib/i18n/config";
import ProductCard from "@/components/ProductCard";
import {
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedHeroBanner,
} from "@/components/AnimatedSection";

// Import subcategory images for aluminum & glass machines
import cncImage from "@/assets/images/ALUMINUM-MACHINE/copy router machine galaxy-1.webp";
import cuttingOffImage from "@/assets/images/ALUMINUM-MACHINE/LEO-R-Automatic Cutting Machine Ø 550 mm - 2 Axis.webp";
import copyRouterImage from "@/assets/images/ALUMINUM-MACHINE/copy router machine galaxy-2.webp";
import endMillingImage from "@/assets/images/ALUMINUM-MACHINE/end milling machine polar.webp";
import crimpingImage from "@/assets/images/ALUMINUM-MACHINE/Automatic Hydraulic.webp";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface GlassAluminiumPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function GlassAluminiumMachinesPage({
  params,
}: GlassAluminiumPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const subcategories = [
    {
      title:
        dict.navbar?.subcategories?.cncMachiningCenters ||
        "CNC Machining Centers",
      image: cncImage,
      href: `/${lang}/glass-aluminium/cnc`,
      description:
        dict.glassAluminium?.cncDescription ||
        "Advanced CNC centers for aluminum and glass processing",
    },
    {
      title:
        dict.navbar?.subcategories?.cuttingOffMachines ||
        "Cutting-Off Machines",
      image: cuttingOffImage,
      href: `/${lang}/glass-aluminium/cutting-off`,
      description:
        dict.glassAluminium?.cuttingOffDescription ||
        "Precision cutting machines for profiles",
    },
    {
      title: dict.navbar?.subcategories?.copyRouter || "Copy Router",
      image: copyRouterImage,
      href: `/${lang}/glass-aluminium/copy-router`,
      description:
        dict.glassAluminium?.copyRouterDescription ||
        "Copy router machines for profile duplication",
    },
    {
      title: dict.navbar?.subcategories?.endMilling || "End Milling",
      image: endMillingImage,
      href: `/${lang}/glass-aluminium/end-milling`,
      description:
        dict.glassAluminium?.endMillingDescription ||
        "End milling machines for aluminum profiles",
    },
    {
      title:
        dict.navbar?.subcategories?.crimpingMachines || "Crimping Machines",
      image: crimpingImage,
      href: `/${lang}/glass-aluminium/crimping`,
      description:
        dict.glassAluminium?.crimpingDescription ||
        "Hydraulic crimping machines for corners",
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
            {
              label:
                dict.navbar?.glassAluminiumMachines ||
                "Aluminum & Glass Working Machines",
            },
          ]}
          title={
            dict.navbar?.glassAluminiumMachines ||
            "Aluminum & Glass Working Machines"
          }
          description={
            dict.glassAluminium?.pageDescription ||
            "Discover our premium selection of aluminum and glass processing machinery. From CNC machining centers to crimping machines, we provide complete solutions for the aluminum and glass industry."
          }
        />
      </section>

      {/* Subcategories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSectionHeader
            badge={
              dict.glassAluminium?.subcategoriesBadge ||
              "Aluminum & Glass Machinery"
            }
            title={
              dict.glassAluminium?.subcategoriesTitle ||
              "Browse Machine Categories"
            }
            subtitle={
              dict.glassAluminium?.subcategoriesSubtitle ||
              "Select a category to view our specialized aluminum and glass processing equipment"
            }
          />

          {/* Subcategory Grid */}
          <AnimatedCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
