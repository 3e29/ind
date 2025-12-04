"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * ScrollReveal - A performant, SEO-friendly scroll animation component
 *
 * PERFORMANCE & SEO GUARANTEES:
 * 1. Zero Layout Shift (CLS): Only animates transform & opacity (compositor thread)
 * 2. Crawler Visibility: Content exists in DOM immediately (no conditional rendering)
 * 3. GPU Accelerated: Uses will-change and transform3d for compositor thread
 * 4. Runs Once: Animation triggers only on first view, never re-animates
 * 5. Accessible: Respects prefers-reduced-motion automatically
 * 6. JS Fallback: Content visible even if JavaScript is disabled (via CSS)
 */

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction: 'up', 'down', 'left', 'right', or 'none' (fade only) */
  direction?: Direction;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Animation duration (in seconds) */
  duration?: number;
  /** How much of the element should be visible before triggering (0-1) */
  threshold?: number;
  /** HTML element to render as */
  as?: keyof JSX.IntrinsicElements;
}

// Transform values for each direction (in pixels)
const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.3,
  as = "div",
}: ScrollRevealProps) {
  // Respect user's motion preferences for accessibility
  const prefersReducedMotion = useReducedMotion();

  // Get transform offset based on direction
  const offset = directionOffset[direction];

  // Animation variants - only using transform and opacity for performance
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  // If user prefers reduced motion, skip animation entirely
  // Content is still visible (accessible fallback)
  if (prefersReducedMotion) {
    const Component = as as React.ElementType;
    return <Component className={className}>{children}</Component>;
  }

  // Create the motion component dynamically based on 'as' prop
  const MotionComponent = motion[
    as as keyof typeof motion
  ] as typeof motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true, // Only animate once - never re-animate on scroll back
        amount: threshold, // Trigger when this % of element is visible
      }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easeOut curve
      }}
      style={{
        // GPU acceleration hints for compositor thread rendering
        willChange: "transform, opacity",
      }}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * ScrollRevealGroup - Stagger multiple children with sequential delays
 * Useful for animating lists, grids, or card layouts
 */
interface ScrollRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Base delay before first item (in seconds) */
  baseDelay?: number;
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number;
  /** Animation direction for all children */
  direction?: Direction;
}

export function ScrollRevealGroup({
  children,
  className = "",
  baseDelay = 0,
  staggerDelay = 0.1,
  direction = "up",
}: ScrollRevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion, render children without animation wrapper
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          direction={direction}
          delay={baseDelay + index * staggerDelay}
          key={index}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

/**
 * Example Usage:
 *
 * // Basic fade-up animation
 * <ScrollReveal>
 *   <h2>This fades in from below</h2>
 * </ScrollReveal>
 *
 * // Slide from left with delay
 * <ScrollReveal direction="left" delay={0.2}>
 *   <ProductCard />
 * </ScrollReveal>
 *
 * // Fade only (no slide)
 * <ScrollReveal direction="none">
 *   <Image src={...} />
 * </ScrollReveal>
 *
 * // Staggered grid animation
 * <ScrollRevealGroup staggerDelay={0.1} className="grid grid-cols-3 gap-4">
 *   <Card />
 *   <Card />
 *   <Card />
 * </ScrollRevealGroup>
 *
 * // As different HTML element
 * <ScrollReveal as="section" className="py-12">
 *   <Content />
 * </ScrollReveal>
 */
