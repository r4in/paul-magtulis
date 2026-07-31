"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal-text";
import { expertise } from "@/content/paul-profile";
import { EASE, cn } from "@/lib/utils";

/**
 * Numbered expertise index. Entries expand on click (accordion) — never
 * hover-only — with the first entry open by default so no content is hidden.
 */
export function ExpertiseList() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="expertise" aria-label="Areas of expertise" className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Sticky intro */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionLabel index="02" label="Expertise" />
              <h2 className="mt-8 font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.12] font-medium tracking-[-0.01em] text-ink">
                Six fields.
                <br />
                One considered
                <br />
                standard of care.
              </h2>
              <p className="mt-6 max-w-[40ch] font-sans text-[0.9375rem] leading-relaxed text-graphite">
                Most legal problems don&apos;t arrive neatly labeled. Paul&apos;s practice
                spans the fields where personal and business life meet the law — so a
                matter can be seen whole, not in fragments.
              </p>
              <p className="mt-6 font-sans text-xs leading-relaxed text-mute">
                Select an area to see who it serves and how Paul contributes.
              </p>
            </div>
          </div>

          {/* Numbered entries */}
          <div className="lg:col-span-8">
            <ul className="hairline-t">
              {expertise.map((area, i) => {
                const isOpen = active === i;
                return (
                  <li key={area.index} className="hairline-b">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setActive(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`expertise-panel-${i}`}
                        id={`expertise-trigger-${i}`}
                        className={cn(
                          "group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-300 md:gap-8 md:py-7",
                          isOpen ? "text-ink" : "text-graphite hover:text-ink"
                        )}
                      >
                        <span
                          className={cn(
                            "font-sans text-[0.6875rem] font-semibold tracking-[0.2em] transition-colors duration-300",
                            isOpen ? "text-accent" : "text-mute group-hover:text-accent"
                          )}
                        >
                          {area.index}
                        </span>
                        <span className="flex-1 font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight font-medium tracking-[-0.01em]">
                          {area.title}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "font-sans text-lg transition-transform duration-500",
                            isOpen && "rotate-45"
                          )}
                          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`expertise-panel-${i}`}
                          role="region"
                          aria-labelledby={`expertise-trigger-${i}`}
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-4 pr-2 pb-8 pl-[calc(0.6875rem+1.25rem)] md:grid-cols-12 md:gap-8 md:pl-[calc(0.6875rem+2rem)]">
                            <p className="font-sans text-[0.75rem] leading-relaxed font-semibold tracking-[0.08em] text-accent uppercase md:col-span-4">
                              {area.clients}
                            </p>
                            <p className="max-w-[52ch] font-sans text-[0.9375rem] leading-relaxed text-graphite md:col-span-8">
                              {area.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <Reveal className="mt-10">
              <p className="max-w-[60ch] font-sans text-xs leading-relaxed text-mute">
                Whether a matter belongs in one of these fields — or crosses several — the
                first step is the same: a conversation about your situation.{" "}
                <a href="#contact" className="link-underline font-semibold text-graphite">
                  Start that conversation
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
