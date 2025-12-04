"use client";

import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
  title: string;
  image: StaticImageData | string;
  href: string;
  description?: string;
  viewText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  href,
  description,
  viewText = "View Products",
}) => {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
    >
      {/* Background Image - Lazy loaded with blur placeholder to prevent CLS */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        placeholder={typeof image === "string" ? "empty" : "blur"}
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
          <div className="flex items-center gap-2 text-[--color-accent] opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <span className="text-sm font-medium">{viewText}</span>
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

export default ProductCard;
