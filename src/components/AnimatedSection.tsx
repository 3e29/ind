"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface AnimatedSectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  badgeColor?: "primary" | "cta";
}

export function AnimatedSectionHeader({
  badge,
  title,
  subtitle,
  badgeColor = "primary",
}: AnimatedSectionHeaderProps) {
  const badgeColorClass =
    badgeColor === "cta"
      ? "bg-[--color-cta]/10 text-[--color-cta]"
      : "bg-[--color-primary]/10 text-[--color-primary]";

  return (
    <ScrollReveal direction="down" className="text-center mb-12 lg:mb-16">
      {badge && (
        <span
          className={`inline-block px-4 py-1 ${badgeColorClass} text-sm font-semibold rounded-full mb-4`}
        >
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </ScrollReveal>
  );
}

interface AnimatedCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCardGrid({
  children,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
}: AnimatedCardGridProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal key={index} direction="up" delay={index * 0.1}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

interface AnimatedHeroBannerProps {
  breadcrumbItems: { label: string; href?: string }[];
  title: string;
  description: string;
}

export function AnimatedHeroBanner({
  breadcrumbItems,
  title,
  description,
}: AnimatedHeroBannerProps) {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <ScrollReveal direction="left" delay={0}>
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              {item.href ? (
                <a
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-lg text-white/80 max-w-2xl">{description}</p>
      </ScrollReveal>
    </div>
  );
}
