"use client";

import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal-text";
import { ImageReveal } from "@/components/image-reveal";

/**
 * Biography — the person behind the practice. Photography is cropped
 * editorially; background wall documents are kept incidental, not legible.
 */
export function ProfileSection() {
  return (
    <section aria-label="Biography" className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <SectionLabel index="—" label="Biography" />

        <div className="mt-10 grid grid-cols-1 gap-y-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
          {/* Environmental photograph */}
          <div className="lg:col-span-5">
            <ImageReveal
              src="/images/paul/20260522_171432.jpg"
              alt="Atty. Paul Magtulis at work in an office"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
              position="86% 40%"
              tone="warm"
            />
            <p className="mt-3 font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-mute uppercase">
              Fig. 02 — The office, after hours
            </p>

            {/* Humanizing candid */}
            <div className="mt-10 hidden max-w-[280px] lg:block">
              <ImageReveal
                src="/images/paul/20260522_172214.jpg"
                alt="Paul Magtulis laughing between meetings"
                sizes="280px"
                className="aspect-square w-full"
                position="46% 15%"
                imgClassName="scale-[1.75] origin-[46%_15%]"
                tone="mono"
                delay={0.1}
              />
              <p className="mt-3 font-sans text-[0.625rem] font-semibold tracking-[0.18em] text-mute uppercase">
                Fig. 03 — Not always in session
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="font-serif text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.14] font-medium tracking-[-0.01em] text-ink">
                He learned the practice of law before he held the title.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5 font-sans text-[0.9375rem] leading-relaxed text-graphite">
              <Reveal delay={0.05}>
                <p>
                  Paul Anthony Magtulis began in law the unglamorous way: as a litigation
                  paralegal in Metro Cebu, drafting motions, organizing trial exhibits, and
                  gathering witness statements while studying for his Juris Doctor at the
                  University of San Carlos.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Law school sharpened the same instincts. He sat as Associate Justice of
                  the university&apos;s Student Supreme Court, chaired the Blue Ribbon
                  Committee for the student electoral commission, and led Societas Spectra
                  Legis as its president — years of being trusted with process, fairness,
                  and other people&apos;s disputes.
                </p>
              </Reveal>
              <Reveal delay={0.11}>
                <p>
                  He passed the September 2023 Bar and was admitted as an attorney by the
                  Supreme Court of the Philippines that December. His practice today spans
                  litigation, property, family, corporate, intellectual property, and
                  criminal matters — carried out in person and remotely across the
                  Philippines.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  Two threads run through the résumé: teaching and translation. He has
                  taught the Revised Penal Code to criminology students, and he spent a
                  year as the liaison who translated between Filipino clients and their
                  attorneys. Both are the same skill — making the law understandable to the
                  person who has to live with it. It is the skill his clients notice first.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.16} className="mt-10">
              <blockquote className="border-l-2 border-accent pl-6">
                <p className="font-serif text-[clamp(1.2rem,1.8vw,1.5rem)] leading-normal font-medium text-ink italic">
                  Professionalism and legal integrity are not the fine print of the
                  practice. They are the practice.
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
