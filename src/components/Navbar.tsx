"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { usePathname, useRouter } from "next/navigation";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useDictionary, useLocale } from "@/lib/i18n/dictionary-context";
import { i18nConfig } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/config";

// Product categories with subcategories structure
interface SubCategory {
  href: string;
  titleKey: string;
}

interface ProductCategory {
  titleKey: string;
  href: string;
  subcategories: SubCategory[];
}

// Helper function to get localized href
const getLocalizedHref = (href: string, locale: string) => `/${locale}${href}`;

const productCategories: ProductCategory[] = [
  {
    titleKey: "woodMachines",
    href: "/wood",
    subcategories: [
      { href: "/wood/cnc", titleKey: "cncMachiningCenters" },
      { href: "/wood/beam-saws", titleKey: "beamSaws" },
      { href: "/wood/edge-banders", titleKey: "edgeBanders" },
      { href: "/wood/drilling", titleKey: "drillingMachines" },
      { href: "/wood/joinery", titleKey: "joineryMachines" },
      { href: "/wood/sanders", titleKey: "wideBeltSanders" },
      { href: "/wood/hot-presses", titleKey: "hotPresses" },
      { href: "/wood/veneer", titleKey: "veneerMachines" },
      { href: "/wood/dust-collectors", titleKey: "dustCollectors" },
    ],
  },
  {
    titleKey: "glassAluminiumMachines",
    href: "/glass-aluminium",
    subcategories: [
      { href: "/glass-aluminium/cnc", titleKey: "cncMachiningCenters" },
      { href: "/glass-aluminium/cutting-off", titleKey: "cuttingOffMachines" },
      { href: "/glass-aluminium/copy-router", titleKey: "copyRouter" },
      { href: "/glass-aluminium/end-milling", titleKey: "endMilling" },
      { href: "/glass-aluminium/crimping", titleKey: "crimpingMachines" },
    ],
  },
  {
    titleKey: "metalMachines",
    href: "/metal",
    subcategories: [
      { href: "/metal/laser", titleKey: "fiberLaserCutting" },
      { href: "/metal/press-brake", titleKey: "pressBrake" },
      { href: "/metal/shear", titleKey: "shearMachine" },
      { href: "/metal/welding", titleKey: "fiberLaserWelding" },
    ],
  },
  {
    titleKey: "airCompressors",
    href: "/air-compressor",
    subcategories: [
      { href: "/air-compressor/screw", titleKey: "screwTypeCompressors" },
      { href: "/air-compressor/piston", titleKey: "pistonTypeCompressors" },
    ],
  },
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled?: boolean;
  hasMegaMenu?: boolean;
  onMegaMenuToggle?: (isOpen: boolean) => void;
  locale: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isScrolled,
  hasMegaMenu,
  onMegaMenuToggle,
  locale,
}) => {
  const pathname = usePathname();
  const localizedHref = getLocalizedHref(href, locale);
  // Check if active by removing locale prefix first
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
  const isActive =
    pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);

  return (
    <div
      className="relative group"
      onMouseEnter={() => hasMegaMenu && onMegaMenuToggle?.(true)}
      onMouseLeave={() => hasMegaMenu && onMegaMenuToggle?.(false)}
    >
      <Link
        href={localizedHref}
        className={`px-3 py-2 relative group uppercase text-sm font-semibold tracking-wide flex items-center gap-1 transition-colors duration-300 ${
          isActive
            ? "text-[--color-cta]"
            : isScrolled
            ? "text-gray-800 hover:text-[--color-cta]"
            : "text-white hover:text-[--color-cta]"
        }`}
      >
        <span
          className={`${
            isActive
              ? "border-b-2 border-[--color-cta]"
              : "group-hover:border-b-2 group-hover:border-[--color-cta]"
          } pb-1`}
        >
          {children}
        </span>
        {hasMegaMenu && (
          <FaChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
        )}
      </Link>
    </div>
  );
};

const Navbar: React.FC = () => {
  const dict = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    document.body.classList.add("language-fade");

    const newLocale = locale === "en" ? "ar" : "en";
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    // Navigate to new locale URL
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    const newPath = `/${newLocale}${pathWithoutLocale || ""}`;

    router.push(newPath);

    setTimeout(() => {
      document.body.classList.remove("language-fade");
    }, 500);
  };

  // Translation helper
  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = dict;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo - Always First */}
            <div className="flex-shrink-0">
              <Link
                href={getLocalizedHref("/", locale)}
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-[--color-primary]" : "text-white"
                }`}
              >
                LOGO
              </Link>
            </div>

            {/* Desktop Navigation - Center/Right */}
            <div className="hidden md:flex md:items-center md:flex-1 md:justify-center lg:justify-end lg:mr-8">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <NavLink href="/" isScrolled={isScrolled} locale={locale}>
                  {t("navbar.home") || "HOME"}
                </NavLink>
                <NavLink
                  href="/products"
                  isScrolled={isScrolled}
                  hasMegaMenu
                  onMegaMenuToggle={setIsMegaMenuOpen}
                  locale={locale}
                >
                  {t("navbar.productCategory") || "PRODUCT CATEGORY"}
                </NavLink>
                <NavLink href="/about" isScrolled={isScrolled} locale={locale}>
                  {t("navbar.aboutUs") || "ABOUT US"}
                </NavLink>
                <NavLink
                  href="/contact"
                  isScrolled={isScrolled}
                  locale={locale}
                >
                  {t("navbar.contactUs") || "CONTACT US"}
                </NavLink>
              </div>
            </div>

            {/* Desktop Utilities - Right End */}
            <div className="hidden md:flex items-center">
              <span
                className={`mx-3 text-xl font-light ${
                  isScrolled ? "text-gray-300" : "text-white/50"
                }`}
              >
                |
              </span>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-white/10 text-white"
                }`}
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
                aria-label="Switch language"
              >
                <ReactCountryFlag
                  countryCode={locale === "en" ? "US" : "SA"}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title={locale === "en" ? "English" : "العربية"}
                />
              </button>
            </div>

            {/* Mobile Layout - Logo | Spacer | Search | Lang | Pipe | Hamburger */}
            <div className="flex md:hidden items-center flex-1 justify-end space-x-2 rtl:space-x-reverse">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                }`}
                aria-label="Switch language"
              >
                <ReactCountryFlag
                  countryCode={locale === "en" ? "US" : "SA"}
                  svg
                  style={{
                    width: "1.3em",
                    height: "1.3em",
                  }}
                  title={locale === "en" ? "English" : "العربية"}
                />
              </button>

              {/* Vertical Pipe Separator */}
              <span
                className={`text-lg font-light ${
                  isScrolled ? "text-gray-300" : "text-white/50"
                }`}
              >
                |
              </span>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-[--color-cta] hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu for Desktop - Compact dropdown style */}
        <div
          className={`hidden md:block absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-b-lg transition-all duration-300 overflow-hidden ${
            isMegaMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ minWidth: "900px" }}
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <div className="px-8 py-6">
            <div className="grid grid-cols-4 gap-8">
              {productCategories.map((category, index) => (
                <div key={index} className="space-y-4 min-w-[180px]">
                  {/* Category Header - Fixed height for balance */}
                  <Link
                    href={getLocalizedHref(category.href, locale)}
                    className="block text-xs font-bold text-gray-900 uppercase tracking-wider hover:text-[--color-cta] transition-colors pb-2 border-b border-gray-200 min-h-[40px] leading-tight"
                  >
                    {t(`navbar.${category.titleKey}`) || category.titleKey}
                  </Link>
                  {/* Subcategories */}
                  <ul className="space-y-2.5">
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={getLocalizedHref(sub.href, locale)}
                          className="block text-xs text-gray-500 hover:text-[--color-cta] transition-colors py-1 uppercase tracking-wide"
                        >
                          {t(`navbar.subcategories.${sub.titleKey}`) ||
                            sub.titleKey}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div
          className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
            isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder={
                  t("navbar.searchPlaceholder") || "Search products..."
                }
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-[90vh] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0"
          } ${
            isScrolled ? "bg-white" : "bg-[--color-primary]/95 backdrop-blur-md"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <MobileNavLink href="/" isScrolled={isScrolled} locale={locale}>
              {t("navbar.home") || "HOME"}
            </MobileNavLink>

            <MobileMegaMenu
              title={t("navbar.productCategory") || "PRODUCT CATEGORY"}
              categories={productCategories}
              isScrolled={isScrolled}
              t={t}
              locale={locale}
            />

            <MobileNavLink
              href="/about"
              isScrolled={isScrolled}
              locale={locale}
            >
              {t("navbar.aboutUs") || "ABOUT US"}
            </MobileNavLink>

            <MobileNavLink
              href="/contact"
              isScrolled={isScrolled}
              locale={locale}
            >
              {t("navbar.contactUs") || "CONTACT US"}
            </MobileNavLink>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-0"></div>
    </>
  );
};

// Mobile Nav Link Component
const MobileNavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
  locale: string;
}> = ({ href, children, isScrolled, locale }) => {
  const pathname = usePathname();
  const localizedHref = getLocalizedHref(href, locale);
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
  const isActive =
    pathWithoutLocale === href || (href === "/" && pathWithoutLocale === "");

  return (
    <Link
      href={localizedHref}
      className={`block px-3 py-2 rounded-md text-base font-medium uppercase transition-colors ${
        isActive
          ? "text-[--color-cta] bg-white/10"
          : isScrolled
          ? "text-gray-700 hover:text-[--color-cta] hover:bg-gray-50"
          : "text-white hover:bg-white/10"
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile Mega Menu Component
const MobileMegaMenu: React.FC<{
  title: string;
  categories: ProductCategory[];
  isScrolled: boolean;
  t: (key: string) => string;
  locale: string;
}> = ({ title, categories, isScrolled, t, locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setOpenCategory(null);
    }
  };

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium uppercase transition-colors ${
          isScrolled
            ? "text-gray-700 hover:text-[--color-cta] hover:bg-gray-50"
            : "text-white hover:bg-white/10"
        }`}
      >
        <span>{title}</span>
        {isOpen ? (
          <FaChevronUp className="w-4 h-4" />
        ) : (
          <FaChevronDown className="w-4 h-4" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[70vh]" : "max-h-0"
        }`}
      >
        <div className="pl-2 pr-2 py-2 space-y-1">
          {categories.map((category, index) => (
            <div key={index}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(index)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-bold uppercase transition-colors ${
                  isScrolled
                    ? "text-gray-800 hover:bg-gray-50"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                <span>
                  {t(`navbar.${category.titleKey}`) || category.titleKey}
                </span>
                {openCategory === index ? (
                  <FaChevronUp className="w-3 h-3" />
                ) : (
                  <FaChevronDown className="w-3 h-3" />
                )}
              </button>

              {/* Subcategories */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openCategory === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-4 py-1 space-y-1">
                  {category.subcategories.map((sub, subIndex) => {
                    const pathWithoutLocale = pathname.replace(
                      /^\/(en|ar)/,
                      ""
                    );
                    const isItemActive =
                      pathWithoutLocale === sub.href ||
                      pathWithoutLocale.startsWith(`${sub.href}/`);
                    return (
                      <Link
                        key={subIndex}
                        href={getLocalizedHref(sub.href, locale)}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          isItemActive
                            ? "text-[--color-cta]"
                            : isScrolled
                            ? "text-gray-600 hover:text-[--color-cta] hover:bg-gray-50"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {t(`navbar.subcategories.${sub.titleKey}`) ||
                          sub.titleKey}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
