"use client";

import React from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/lib/i18n/dictionary-context";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";

const Footer: React.FC = () => {
  const dict = useDictionary();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: dict.navbar?.home || "Home" },
    { href: "/about", label: dict.navbar?.aboutUs || "About Us" },
    { href: "/products", label: dict.navbar?.productCategory || "Products" },
    { href: "/contact", label: dict.navbar?.contactUs || "Contact Us" },
  ];

  const productLinks = [
    { href: "/wood", label: dict.navbar?.woodMachines || "Wood Machines" },
    {
      href: "/metal",
      label: dict.navbar?.metalMachines || "Metal Working",
    },
    {
      href: "/glass-aluminium",
      label: dict.navbar?.glassAluminiumMachines || "Glass & Aluminium",
    },
    {
      href: "/air-compressor",
      label: dict.navbar?.airCompressors || "Air Compressors",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <ScrollReveal
            direction="up"
            delay={0}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold text-white mb-4 block"
            >
              LOGO
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {dict.footer?.description ||
                "Providing high-quality industrial machinery solutions for over 20 years. Your trusted partner in manufacturing excellence."}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[--color-primary] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[--color-primary] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[--color-primary] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[--color-primary] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal direction="up" delay={0.1}>
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer?.quickLinks || "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-gray-400 hover:text-[--color-cta] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Products */}
          <ScrollReveal direction="up" delay={0.2}>
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer?.products || "Products"}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-gray-400 hover:text-[--color-cta] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="up" delay={0.3}>
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer?.contactInfo || "Contact Info"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-[--color-cta] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {dict.footer?.address ||
                    "123 Industrial Area, Riyadh, Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-[--color-cta] flex-shrink-0" />
                <a
                  href="tel:+966594503614"
                  className="text-gray-400 hover:text-[--color-cta] transition-colors "
                  dir="ltr"
                >
                  +966594503614
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-[--color-cta] flex-shrink-0" />
                <a
                  href="mailto:info@company.com"
                  onClick={(e) => {
                    const hasCoarsePointer =
                      window.matchMedia("(pointer: coarse)").matches;
                    const isLargeScreen = window.innerWidth >= 1024;
                    const isDesktop = isLargeScreen && !hasCoarsePointer;

                    if (isDesktop) {
                      e.preventDefault();
                      window.open(
                        "https://mail.google.com/mail/?view=cm&to=info@company.com",
                        "_blank"
                      );
                    }
                  }}
                  className="text-gray-400 hover:text-[--color-cta] transition-colors"
                >
                  info@company.com
                </a>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} {dict.footer?.companyName || "Company Name"}.{" "}
              {dict.footer?.rights || "All rights reserved."}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-400 hover:text-[--color-cta] transition-colors"
              >
                {dict.footer?.privacy || "Privacy Policy"}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-400 hover:text-[--color-cta] transition-colors"
              >
                {dict.footer?.terms || "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
