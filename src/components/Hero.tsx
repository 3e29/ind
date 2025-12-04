"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDictionary, useLocale } from "@/lib/i18n/dictionary-context";

// Import hero images
import heroImage1 from "@/assets/images/laser machine/Open-Type-2000W-Fiber-Laser-Cutting-Machine-2.webp";
import heroImage2 from "@/assets/images/wood machine/squadratrice-optima-3200.webp";
import heroImage3 from "@/assets/images/ALUMINUM-MACHINE/LEO-R-Automatic Cutting Machine Ø 550 mm - 2 Axis.webp";

const slides = [
  {
    image: heroImage1,
    alt: "Laser Cutting Machine",
  },
  {
    image: heroImage2,
    alt: "Wood Processing Machine",
  },
  {
    image: heroImage3,
    alt: "Aluminum Processing Machine",
  },
];

const Hero: React.FC = () => {
  const dict = useDictionary();
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Slides - Crossfade animation */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            placeholder="blur"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay - Blue to transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary]/90 via-[--color-primary]/70 to-transparent" />

      {/* Additional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Main Heading - Animated */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {dict.home?.hero?.title ||
                "Over 20 Years of Experience in the Field"}
            </motion.h1>

            {/* Subtitle - Animated */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed"
            >
              {dict.home?.hero?.subtitle ||
                "Providing high-quality machinery for wood, metal, glass, and aluminum processing"}
            </motion.p>

            {/* CTA and Experience Badge - Side by side on larger screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              {/* CTA Button */}
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center justify-center px-8 py-4 bg-[--color-cta] hover:bg-[--color-cta]/90 text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {dict.home?.hero?.cta || "Explore Products"}
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

              {/* Experience Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3">
                <div className="text-[--color-cta] font-bold text-3xl">20+</div>
                <div className="text-white">
                  <div className="text-xs uppercase tracking-wider opacity-80">
                    {dict.home?.hero?.yearsLabel || "Years of"}
                  </div>
                  <div className="text-sm font-semibold">
                    {dict.home?.hero?.experienceLabel || "Experience"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 hidden md:block"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 hidden md:block"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[--color-cta] w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
