"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal-text";
import { timeline } from "@/content/paul-profile";
import { cn } from "@/lib/utils";

const years = Array.from(new Set(timeline.map((t) => t.year)));

/**
 * Career narrative: a fine vertical timeline with a scroll progress line and,
 * on desktop, a sticky year index that tracks the entry in view.
 */
export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [activeYear, setActiveYear] = useState(years[0]);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.55"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Scrollspy for the sticky year index.
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-year]");
    if (!items?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveYear(entry.target.getAttribute("data-year") ?? years[0]);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" aria-label="Experience" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <SectionLabel index="03" label="Experience" />

        <div className="mt-10 grid grid-cols-1 gap-y-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
          {/* Sticky index */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.12] font-medium tracking-[-0.01em] text-ink">
                A practice built
                <br />
                the long way.
              </h2>
              <p className="mt-6 max-w-[40ch] font-sans text-[0.9375rem] leading-relaxed text-graphite">
                Years inside working law offices came before the title. Paul drafted,
                researched, and prepared cases as a litigation paralegal while completing
                his Juris Doctor — then passed the Bar and opened his own practice.
              </p>

              <ol className="mt-10 hidden gap-1 lg:flex lg:flex-col" aria-hidden>
                {years.map((year) => (
                  <li
                    key={year}
                    className={cn(
                      "flex items-center gap-3 font-sans text-[0.8125rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
                      activeYear === year ? "text-accent" : "text-mute/60"
                    )}
                  >
                    <span
                      className={cn(
                        "h-px transition-all duration-500",
                        activeYear === year ? "w-8 bg-accent" : "w-4 bg-ink/20"
                      )}
                    />
                    {year}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative lg:col-span-8">
            <ol ref={listRef} className="relative">
              {/* Base rail + progress line */}
              <span aria-hidden className="absolute top-2 bottom-2 left-[3px] w-px bg-ink/15" />
              <motion.span
                aria-hidden
                className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-accent"
                style={{ scaleY: reduced ? 1 : line }}
              />

              {timeline.map((entry, i) => (
                <li key={i} data-year={entry.year} className="relative pb-12 pl-10 last:pb-0 md:pl-14">
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-2 left-0 h-[7px] w-[7px] rounded-full",
                      entry.year === "Now" ? "bg-accent" : "bg-ink/50"
                    )}
                  />
                  <Reveal delay={0.05}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className="font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-accent uppercase">
                        {entry.period}
                      </p>
                      <p className="font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-mute uppercase">
                        {entry.tag}
                      </p>
                    </div>
                    <h3 className="mt-2.5 font-serif text-[clamp(1.35rem,2.1vw,1.8rem)] leading-snug font-medium text-ink">
                      {entry.role}
                    </h3>
                    <p className="mt-1 font-sans text-[0.8125rem] font-semibold text-graphite">
                      {entry.org}
                      {entry.location && <span className="font-medium text-mute"> · {entry.location}</span>}
                    </p>
                    <p className="mt-3 max-w-[58ch] font-sans text-[0.9375rem] leading-relaxed text-graphite">
                      {entry.summary}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
