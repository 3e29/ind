import React from "react";
import Link from "next/link";
import { getDictionary, i18nConfig, type Locale } from "@/lib/i18n/config";
import ProductCard from "@/components/ProductCard";
import {
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedHeroBanner,
} from "@/components/AnimatedSection";

// Import subcategory images for wood machines
import cncImage from "@/assets/images/wood machine/squadratrice-optima-3200.webp";
import beamSawImage from "@/assets/images/wood machine/squadratrice-optima-1600-315.webp";
import edgeBanderImage from "@/assets/images/wood machine/piallatrice-mitica-FSC260-standard_3.webp";
import drillingImage from "@/assets/images/wood machine/pialla-a-spessore-rekord-630_1.webp";
import joineryImage from "@/assets/images/wood machine/piallatrice-per-legno-voyager-fsc-310.webp";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

interface WoodPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function WoodMachinesPage({ params }: WoodPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const subcategories = [
    {
      title:
        dict.navbar?.subcategories?.cncMachiningCenters ||
        "CNC Machining Centers",
      image: cncImage,
      href: `/${lang}/wood/cnc`,
      description:
        dict.wood?.cncDescription ||
        "Advanced CNC machines for precise wood processing",
    },
    {
      title: dict.navbar?.subcategories?.beamSaws || "Beam Saws",
      image: beamSawImage,
      href: `/${lang}/wood/beam-saws`,
      description:
        dict.wood?.beamSawsDescription ||
        "High-performance panel cutting solutions",
    },
    {
      title: dict.navbar?.subcategories?.edgeBanders || "Edge Banders",
      image: edgeBanderImage,
      href: `/${lang}/wood/edge-banders`,
      description:
        dict.wood?.edgeBandersDescription ||
        "Professional edge banding machines",
    },
    {
      title:
        dict.navbar?.subcategories?.drillingMachines || "Drilling Machines",
      image: drillingImage,
      href: `/${lang}/wood/drilling`,
      description:
        dict.wood?.drillingDescription ||
        "Precision drilling solutions for woodworking",
    },
    {
      title: dict.navbar?.subcategories?.joineryMachines || "Joinery Machines",
      image: joineryImage,
      href: `/${lang}/wood/joinery`,
      description:
        dict.wood?.joineryDescription || "Quality machines for wood joinery",
    },
    {
      title: dict.navbar?.subcategories?.wideBeltSanders || "Wide Belt Sanders",
      image: cncImage,
      href: `/${lang}/wood/sanders`,
      description:
        dict.wood?.sandersDescription ||
        "Industrial wide belt sanding machines",
    },
    {
      title: dict.navbar?.subcategories?.hotPresses || "Hot Presses",
      image: beamSawImage,
      href: `/${lang}/wood/hot-presses`,
      description:
        dict.wood?.hotPressesDescription || "Hot press machines for lamination",
    },
    {
      title: dict.navbar?.subcategories?.veneerMachines || "Veneer Machines",
      image: edgeBanderImage,
      href: `/${lang}/wood/veneer`,
      description:
        dict.wood?.veneerDescription || "Veneer processing equipment",
    },
    {
      title: dict.navbar?.subcategories?.dustCollectors || "Dust Collectors",
      image: drillingImage,
      href: `/${lang}/wood/dust-collectors`,
      description:
        dict.wood?.dustCollectorsDescription ||
        "Efficient dust collection systems",
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
            { label: dict.navbar?.woodMachines || "Wood Working Machines" },
          ]}
          title={dict.navbar?.woodMachines || "Wood Working Machines"}
          description={
            dict.wood?.pageDescription ||
            "Explore our comprehensive range of wood processing machinery. From CNC machining centers to dust collection systems, we offer complete solutions for the woodworking industry."
          }
        />
      </section>

      {/* Subcategories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSectionHeader
            badge={dict.wood?.subcategoriesBadge || "Wood Machinery"}
            title={
              dict.wood?.subcategoriesTitle || "Browse Wood Machine Categories"
            }
            subtitle={
              dict.wood?.subcategoriesSubtitle ||
              "Select a category to view our specialized wood processing equipment"
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
