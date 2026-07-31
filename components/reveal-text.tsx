"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Reveal immediately on mount instead of waiting for viewport entry. */
  immediate?: boolean;
}

/**
 * Fades and lifts content into place when it enters the viewport.
 * Renders a plain div (content always accessible) when reduced motion is set.
 */
export function Reveal({ children, className, delay = 0, immediate = false }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } })}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface RevealLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  as?: "h1" | "h2" | "p";
}

/**
 * Line-by-line masked reveal for headlines. Each line rises out of an
 * overflow-hidden wrapper — the classic editorial text reveal.
 *
 * Viewport detection observes the heading element itself: the animated spans
 * start fully outside their clipping wrappers, so observing them directly
 * would never report an intersection and the reveal would deadlock.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  as: Tag = "h2",
}: RevealLinesProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shown = immediate || inView;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          {reduced ? (
            <span className={`block ${lineClassName ?? ""}`}>{line}</span>
          ) : (
            <motion.span
              className={`block will-change-transform ${lineClassName ?? ""}`}
              initial={{ y: "110%" }}
              animate={shown ? { y: "0%" } : undefined}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
