import React from "react";
import Link from "next/link";
import { getDictionary, i18nConfig, type Locale } from "@/lib/i18n/config";
import ProductCard from "@/components/ProductCard";
import {
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedHeroBanner,
} from "@/components/AnimatedSection";

// Import subcategory images for metal machines
import laserImage from "@/assets/images/laser machine/Open-Type-2000W-Fiber-Laser-Cutting-Machine-2.webp";
import pressBrakeImage from "@/assets/images/ALUMINUM-MACHINE/press brake.webp";
import shearImage from "@/assets/images/ALUMINUM-MACHINE/SPARK metal cutting machine 400 mm.webp";
import weldingImage from "@/assets/images/laser machine/iWeld_992_PRIMARY.webp";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface MetalPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MetalWorkingMachinesPage({
  params,
}: MetalPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const subcategories = [
    {
      title:
        dict.navbar?.subcategories?.fiberLaserCutting ||
        "Fiber Laser Cutting Machine",
      image: laserImage,
      href: `/${lang}/metal/laser`,
      description:
        dict.metal?.laserDescription ||
        "High-precision fiber laser cutting for metal sheets",
    },
    {
      title: dict.navbar?.subcategories?.pressBrake || "Press Brake",
      image: pressBrakeImage,
      href: `/${lang}/metal/press-brake`,
      description:
        dict.metal?.pressBrakeDescription ||
        "CNC press brake machines for metal bending",
    },
    {
      title: dict.navbar?.subcategories?.shearMachine || "Shear Machine",
      image: shearImage,
      href: `/${lang}/metal/shear`,
      description:
        dict.metal?.shearDescription ||
        "Industrial shearing machines for metal cutting",
    },
    {
      title:
        dict.navbar?.subcategories?.fiberLaserWelding || "Fiber Laser Welding",
      image: weldingImage,
      href: `/${lang}/metal/welding`,
      description:
        dict.metal?.weldingDescription ||
        "Advanced fiber laser welding systems",
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
            { label: dict.navbar?.metalMachines || "Metal Working Machines" },
          ]}
          title={dict.navbar?.metalMachines || "Metal Working Machines"}
          description={
            dict.metal?.pageDescription ||
            "Explore our advanced metal processing machinery. From fiber laser cutting to press brakes, we offer cutting-edge solutions for the metal fabrication industry."
          }
        />
      </section>

      {/* Subcategories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSectionHeader
            badge={dict.metal?.subcategoriesBadge || "Metal Machinery"}
            title={
              dict.metal?.subcategoriesTitle ||
              "Browse Metal Machine Categories"
            }
            subtitle={
              dict.metal?.subcategoriesSubtitle ||
              "Select a category to view our specialized metal processing equipment"
            }
          />

          {/* Subcategory Grid */}
          <AnimatedCardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
