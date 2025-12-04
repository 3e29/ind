"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDictionary, useLocale } from "@/lib/i18n/dictionary-context";
import ScrollReveal from "@/components/ScrollReveal";

// Import category images
import woodImage from "@/assets/images/wood machine/squadratrice-optima-3200.webp";
import metalImage from "@/assets/images/laser machine/Open-Type-2000W-Fiber-Laser-Cutting-Machine-2.webp";
import glassAluminiumImage from "@/assets/images/ALUMINUM-MACHINE/copy router machine galaxy-1.webp";
import airCompressorImage from "@/assets/images/laser machine/iWeld_992_PRIMARY.webp";

interface CategoryCardProps {
  title: string;
  image: any;
  href: string;
  description?: string;
  locale: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  href,
  description,
  locale,
}) => {
  return (
    <Link
      href={`/${locale}${href}`}
      className="group relative block overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
    >
      {/* Background Image - Lazy loaded with blur placeholder to prevent CLS */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        placeholder="blur"
        loading="lazy"
      />

      {/* Gradient Overlay - Top to bottom for title at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60 transition-opacity duration-300 group-hover:from-[--color-primary]/90 group-hover:via-[--color-primary]/40 group-hover:to-[--color-primary]/70" />

      {/* Content - Title at TOP, description at BOTTOM */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        {/* Title at Top */}
        <h3 className="text-white text-lg sm:text-xl font-bold leading-tight transform transition-transform duration-300 group-hover:translate-y-1">
          {title}
        </h3>

        {/* Bottom Content */}
        <div>
          {description && (
            <p className="text-white/80 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 mb-2">
              {description}
            </p>
          )}

          {/* Arrow indicator */}
          <div className="flex items-center gap-2 text-[--color-cta] opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <span className="text-sm font-medium">View Products</span>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MachinerySection: React.FC = () => {
  const dict = useDictionary();
  const locale = useLocale();

  const categories = [
    {
      title: dict.navbar?.woodMachines || "Wood Machines",
      image: woodImage,
      href: "/wood",
      description:
        dict.machinery?.woodDescription ||
        "CNC and ordinary wood processing machines",
    },
    {
      title:
        dict.navbar?.glassAluminiumMachines || "Glass & Aluminium Machines",
      image: glassAluminiumImage,
      href: "/glass-aluminium",
      description:
        dict.machinery?.glassAluminiumDescription ||
        "Professional glass and aluminum processing",
    },
    {
      title: dict.navbar?.metalMachines || "Metal Working Machines",
      image: metalImage,
      href: "/metal",
      description:
        dict.machinery?.metalDescription ||
        "Laser, waterjet, and bandsaw cutting solutions",
    },
    {
      title: dict.navbar?.airCompressors || "Air Compressors",
      image: airCompressorImage,
      href: "/air-compressor",
      description:
        dict.machinery?.airCompressorDescription ||
        "Industrial air compressor systems",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Fade in from top */}
        <ScrollReveal direction="down" className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 bg-[--color-primary]/10 text-[--color-primary] text-sm font-semibold rounded-full mb-4">
            {dict.machinery?.badge || "Our Products"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict.machinery?.title || "Product Categories"}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {dict.machinery?.subtitle ||
              "Explore our wide range of industrial machinery designed for precision, efficiency, and durability"}
          </p>
        </ScrollReveal>

        {/* Category Grid - Staggered fade-up animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1} // Stagger each card by 0.1s
            >
              <CategoryCard
                title={category.title}
                image={category.image}
                href={category.href}
                description={category.description}
                locale={locale}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button - Fade in */}
        <ScrollReveal
          direction="none"
          delay={0.4}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center px-6 py-3 border-2 border-[--color-primary] text-[--color-primary] font-semibold rounded-lg hover:bg-[--color-primary] hover:text-white transition-all duration-300"
          >
            {dict.machinery?.viewAll || "View All Products"}
            <svg
              className="ml-2 w-5 h-5 rtl:rotate-180 rtl:mr-2 rtl:ml-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MachinerySection;
