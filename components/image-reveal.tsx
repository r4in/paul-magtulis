"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { EASE, cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** object-position — the art-direction crop control. */
  position?: string;
  /** Warm editorial grade laid over the photo. */
  tone?: "warm" | "mono" | "none";
  delay?: number;
}

/**
 * Clip-path image reveal with a slow settle-out scale, plus a consistent
 * editorial color grade. The wrapper owns aspect ratio via className.
 *
 * Viewport detection runs on the (never-clipped) wrapper: a fully clipped
 * element reports zero intersection, so observing the clipped layer itself
 * would deadlock the reveal.
 */
export function ImageReveal({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  position = "center",
  tone = "warm",
  delay = 0,
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shown = reduced || inView;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            tone === "mono" && "grayscale contrast-[1.04]",
            tone === "warm" && "saturate-[0.88] contrast-[1.03] brightness-[1.01]",
            imgClassName
          )}
          style={{ objectPosition: position }}
        />
        {tone !== "none" && (
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                tone === "warm"
                  ? "linear-gradient(160deg, rgba(243,240,233,0.16), rgba(122,48,46,0.08) 55%, rgba(17,17,15,0.18))"
                  : "linear-gradient(160deg, rgba(243,240,233,0.2), rgba(17,17,15,0.24))",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
