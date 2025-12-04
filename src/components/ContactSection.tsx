"use client";

import React, { useState } from "react";
import { useDictionary } from "@/lib/i18n/dictionary-context";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";

const ContactSection: React.FC = () => {
  const dict = useDictionary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    const phoneNumber = "966594504614"; // Replace with actual number
    const message = encodeURIComponent(
      dict.contact?.whatsappMessage ||
        "Hello! I'm interested in your machinery products."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary] via-[--color-primary] to-blue-900" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[--color-cta]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal
              direction="left"
              className="text-center lg:text-start"
            >
              <span className="inline-block px-4 py-1 bg-white/10 text-[--color-cta] text-sm font-semibold rounded-full mb-4">
                {dict.contact?.badge || "Get In Touch"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {dict.contact?.title || "Have a Project in Mind?"}
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {dict.contact?.subtitle ||
                  "Whether you need a quote, technical assistance, or want to discuss your requirements, we're here to help. Reach out to us today!"}
              </p>

              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a
                  href="tel:+966594504614"
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl text-start hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[--color-cta] rounded-lg">
                    <FaPhone className="w-5 h-5 text-[--color-primary] rtl:-scale-x-100" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">
                      {dict.contact?.phone || "Phone"}
                    </div>
                    <div className="text-white font-semibold" dir="ltr">
                      +966594504614
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:info@company.com"
                  onClick={(e) => {
                    // Check if likely desktop based on screen width and pointer type
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
                    // On mobile/tablet, the default mailto: will open the device's email app
                  }}
                  className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl text-start hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[--color-cta] rounded-lg">
                    <FaEnvelope className="w-5 h-5 text-[--color-primary]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">
                      {dict.contact?.email || "Email"}
                    </div>
                    <div className="text-white font-semibold" dir="ltr">
                      info@company.com
                    </div>
                  </div>
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-start">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[--color-cta] hover:bg-[--color-cta]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {dict.contact?.cta || "Request a Quote"}
                  <svg
                    className="ms-2 w-5 h-5 rtl:rotate-180"
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
                </button>
                <button
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <FaWhatsapp className="w-5 h-5 me-2" />
                  {dict.contact?.whatsapp || "WhatsApp Us"}
                </button>
              </div>
            </ScrollReveal>

            {/* Right Content - Quick Contact Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {dict.contact?.formTitle || "Send Us a Message"}
                </h3>
                <form className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {dict.contact?.form?.name || "Your Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all text-gray-900 bg-white"
                      placeholder={
                        dict.contact?.form?.namePlaceholder || "John Doe"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {dict.contact?.form?.email || "Email Address"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all text-gray-900 bg-white"
                      placeholder={
                        dict.contact?.form?.emailPlaceholder ||
                        "john@example.com"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {dict.contact?.form?.phone || "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all text-gray-900 bg-white"
                      placeholder={
                        dict.contact?.form?.phonePlaceholder || "+966594503614"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {dict.contact?.form?.message || "Your Message"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none text-gray-900 bg-white"
                      placeholder={
                        dict.contact?.form?.messagePlaceholder ||
                        "Tell us about your project..."
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[--color-primary] hover:bg-[--color-primary]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {dict.contact?.form?.submit || "Send Message"}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Simple Modal - In production, use ContactModal component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 end-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {dict.contact?.modal?.title || "Request a Quote"}
            </h3>
            <p className="text-gray-600 mb-6">
              {dict.contact?.modal?.description ||
                "Fill out the form below and our team will get back to you within 24 hours."}
            </p>
            {/* Add your ContactModal form content here */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder={dict.contact?.form?.name || "Your Name"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] text-gray-900 bg-white"
              />
              <input
                type="email"
                placeholder={dict.contact?.form?.email || "Email Address"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] text-gray-900 bg-white"
              />
              <textarea
                rows={3}
                placeholder={dict.contact?.form?.message || "Your Message"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] resize-none text-gray-900 bg-white"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[--color-cta] hover:bg-[--color-cta]/90 text-white font-semibold rounded-lg transition-all"
              >
                {dict.contact?.form?.submit || "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSection;
