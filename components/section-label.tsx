"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
  light?: boolean;
}

/**
 * Editorial section marker: "02 — Expertise" with a hairline that draws
 * itself across the container as the section enters the viewport.
 */
export function SectionLabel({ index, label, className, light = false }: SectionLabelProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <motion.span
        aria-hidden
        className={cn("absolute top-0 left-0 h-px w-full origin-left", light ? "bg-cream/30" : "bg-ink/20")}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <p
        className={cn(
          "flex items-baseline gap-3 pt-4 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] uppercase",
          light ? "text-cream/70" : "text-mute"
        )}
      >
        <span className={light ? "text-cream" : "text-accent"}>{index}</span>
        <span aria-hidden className="tracking-normal">—</span>
        <span>{label}</span>
      </p>
    </div>
  );
}
