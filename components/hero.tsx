"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/paul-profile";

const HEADLINE = ["Clear counsel for", "the matters that", "shape a life."];

/**
 * Opening section. Entrance animation is pure CSS (see globals.css) so the
 * hero paints without waiting for hydration; only the scroll parallax on the
 * photograph is JS-driven.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "10%"]);

  return (
    <section
      ref={ref}
      id="profile"
      aria-label="Profile"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Vertical side label — desktop only */}
      <p
        aria-hidden
        className="writing-vertical absolute top-1/2 right-6 z-10 hidden -translate-y-1/2 font-sans text-[0.625rem] font-semibold tracking-[0.3em] text-mute uppercase xl:block"
      >
        Legal counsel · Philippines
      </p>

      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-y-8 px-5 pt-28 md:px-10 lg:grid-cols-12 lg:gap-x-10 lg:pt-32">
        {/* Copy column */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pr-4 xl:col-span-6">
          <p
            className="anim-rise font-sans text-[0.6875rem] font-semibold tracking-[0.24em] text-accent uppercase"
            style={{ "--d": "0.05s" } as React.CSSProperties}
          >
            Attorney at Law · Philippine Bar · Est. 2023
          </p>

          <h1 className="mt-6 font-serif text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[1.04] font-medium tracking-[-0.015em] text-ink">
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="anim-line block will-change-transform"
                  style={{ "--d": `${0.15 + i * 0.09}s` } as React.CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="anim-rise mt-7 max-w-[46ch] font-sans text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed text-graphite"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            Atty. Paul Magtulis advises individuals, families, and businesses across
            litigation, property, family, corporate, intellectual property, and criminal
            law — counsel built on preparation, careful drafting, and plain explanation.
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ "--d": "0.7s" } as React.CSSProperties}
          >
            <a
              href="#contact"
              className="group inline-flex min-h-[48px] items-center gap-2.5 border border-ink bg-ink px-6 py-3 font-sans text-sm font-semibold text-cream transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              Discuss your legal matter
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#experience"
              className="link-underline inline-flex min-h-[48px] items-center font-sans text-sm font-semibold text-graphite hover:text-ink"
            >
              Explore his experience
            </a>
          </div>

          <p
            className="anim-rise hairline-t mt-12 hidden max-w-[46ch] pt-4 font-sans text-xs leading-relaxed text-mute lg:block"
            style={{ "--d": "0.85s" } as React.CSSProperties}
          >
            {site.admitted} — Supreme Court of the Philippines · Juris Doctor, University
            of San Carlos, Cebu
          </p>
        </div>

        {/* Photo column */}
        <div className="relative lg:col-span-5 xl:col-span-6">
          <div
            className="anim-clip relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:h-[86%] lg:w-auto lg:min-w-[380px] xl:min-w-[460px]"
            style={{ "--d": "0.35s" } as React.CSSProperties}
          >
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY }}>
              <Image
                src="/images/paul/hero.jpg"
                alt="Atty. Paul Magtulis"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="scale-[1.08] object-cover"
                style={{ objectPosition: "50% 18%" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(243,240,233,0.08), rgba(122,48,46,0.05) 55%, rgba(17,17,15,0.18))",
                }}
              />
            </motion.div>
            {/* Registration-mark caption */}
            <p className="absolute bottom-0 left-0 bg-paper/90 px-3 py-2 font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-graphite uppercase">
              Fig. 01 — Portrait
            </p>
          </div>
        </div>
      </div>

      {/* Bottom rule + scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10">
        <div className="hairline-t flex items-center justify-between py-4">
          <p className="font-sans text-[0.625rem] font-semibold tracking-[0.22em] text-mute uppercase">
            01 — Profile
          </p>
          <motion.a
            href="#facts"
            className="flex items-center gap-2 font-sans text-[0.625rem] font-semibold tracking-[0.22em] text-mute uppercase"
            aria-label="Scroll to credentials"
          >
            Scroll
            <motion.span
              aria-hidden
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
