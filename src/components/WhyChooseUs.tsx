"use client";

import React from "react";
import { useDictionary } from "@/lib/i18n/dictionary-context";
import { FaAward, FaCogs, FaHeadset, FaShippingFast } from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group text-center p-6 lg:p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
      {/* Icon Container */}
      <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[--color-primary]/10 text-[--color-primary] mb-6 group-hover:bg-[--color-primary] group-hover:text-white transition-all duration-300 mx-auto">
        <div className="text-3xl lg:text-4xl">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const dict = useDictionary();

  const features = [
    {
      icon: <FaAward />,
      title: dict.whyChooseUs?.experience?.title || "20+ Years Experience",
      description:
        dict.whyChooseUs?.experience?.description ||
        "Two decades of excellence in providing industrial machinery solutions to businesses worldwide.",
    },
    {
      icon: <FaCogs />,
      title: dict.whyChooseUs?.quality?.title || "High Quality Machinery",
      description:
        dict.whyChooseUs?.quality?.description ||
        "We source only the finest machinery from trusted manufacturers, ensuring durability and precision.",
    },
    {
      icon: <FaHeadset />,
      title: dict.whyChooseUs?.support?.title || "24/7 Support",
      description:
        dict.whyChooseUs?.support?.description ||
        "Our dedicated support team is available around the clock to assist with any technical issues.",
    },
    {
      icon: <FaShippingFast />,
      title: dict.whyChooseUs?.delivery?.title || "Fast Delivery",
      description:
        dict.whyChooseUs?.delivery?.description ||
        "Quick and reliable delivery services to get your machinery up and running without delays.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="down" className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 bg-[--color-cta]/10 text-[--color-cta] text-sm font-semibold rounded-full mb-4">
            {dict.whyChooseUs?.badge || "Why Us"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {dict.whyChooseUs?.title || "Why Choose Us?"}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {dict.whyChooseUs?.subtitle ||
              "We are committed to delivering exceptional value and service to our clients"}
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 0.1}
              className="h-full"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <ScrollReveal direction="up" delay={0} className="h-full">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-[--color-primary] text-white h-full flex flex-col justify-center min-h-[100px] sm:min-h-[120px]">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--color-cta] mb-1 sm:mb-2">
                20+
              </div>
              <div className="text-xs sm:text-sm lg:text-base opacity-90 leading-tight">
                {dict.whyChooseUs?.stats?.years || "Years Experience"}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} className="h-full">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-[--color-primary] text-white h-full flex flex-col justify-center min-h-[100px] sm:min-h-[120px]">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--color-cta] mb-1 sm:mb-2">
                500+
              </div>
              <div className="text-xs sm:text-sm lg:text-base opacity-90 leading-tight">
                {dict.whyChooseUs?.stats?.clients || "Happy Clients"}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-[--color-primary] text-white h-full flex flex-col justify-center min-h-[100px] sm:min-h-[120px]">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--color-cta] mb-1 sm:mb-2">
                1000+
              </div>
              <div className="text-xs sm:text-sm lg:text-base opacity-90 leading-tight">
                {dict.whyChooseUs?.stats?.products || "Products Delivered"}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3} className="h-full">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-[--color-primary] text-white h-full flex flex-col justify-center min-h-[100px] sm:min-h-[120px]">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[--color-cta] mb-1 sm:mb-2">
                24/7
              </div>
              <div className="text-xs sm:text-sm lg:text-base opacity-90 leading-tight">
                {dict.whyChooseUs?.stats?.support || "Support Available"}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
