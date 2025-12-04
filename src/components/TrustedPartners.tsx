"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/dictionary-context";
import ScrollReveal from "@/components/ScrollReveal";

// Placeholder partner logos - in production, these would be actual brand logos
const partners = [
  { name: "Bosch", initial: "B" },
  { name: "Makita", initial: "M" },
  { name: "DeWalt", initial: "D" },
  { name: "Hitachi", initial: "H" },
  { name: "Siemens", initial: "S" },
  { name: "ABB", initial: "A" },
];

const TrustedPartners: React.FC = () => {
  const dict = useDictionary();

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="down" className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {dict.partners?.title || "Trusted By Leading Brands"}
          </h2>
          <p className="text-gray-600">
            {dict.partners?.subtitle ||
              "We partner with the world's best machinery manufacturers"}
          </p>
        </ScrollReveal>

        {/* Partners Logo Strip */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative overflow-hidden">
            {/* Gradient Fade Effects */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Scrolling Container */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap lg:flex-nowrap">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-24 h-16 sm:w-32 sm:h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  {/* Placeholder logo - replace with actual Image component and logo files */}
                  <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 hover:border-[--color-primary] hover:bg-[--color-primary]/5 transition-all duration-300">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-400 hover:text-[--color-primary]">
                      {partner.initial}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Optional: Animated scrolling version for more partners */}
        {/* 
        <div className="overflow-hidden">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="w-32 h-20 flex items-center justify-center border border-gray-200 rounded-lg">
                  <span className="text-3xl font-bold text-gray-400">{partner.initial}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default TrustedPartners;
