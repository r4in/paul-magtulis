"use client";

import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal-text";
import { approach } from "@/content/paul-profile";

/**
 * How Paul works with clients — five numbered principles derived from the
 * source profile, set as an editorial sequence.
 */
export function ApproachSection() {
  return (
    <section id="approach" aria-label="Approach" className="bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <SectionLabel index="04" label="Approach" />

        <div className="mt-10 grid grid-cols-1 gap-y-10 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.12] font-medium tracking-[-0.01em] text-ink">
                What working
                <br />
                with Paul
                <br />
                feels like.
              </h2>
              <p className="mt-6 max-w-[40ch] font-sans text-[0.9375rem] leading-relaxed text-graphite">
                The same sequence, whatever the matter: understand first, advise honestly,
                document precisely, and see it through. You will always know where your
                matter stands and what happens next.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8">
            {approach.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.04}>
                <li className="hairline-t grid grid-cols-[auto_1fr] gap-x-5 py-7 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-x-8 md:py-8">
                  <p
                    aria-hidden
                    className="font-serif text-[1.9rem] leading-none font-medium text-accent/85 italic md:col-span-2"
                  >
                    {step.index}
                  </p>
                  <div className="md:col-span-10">
                    <h3 className="font-serif text-[clamp(1.3rem,2vw,1.7rem)] leading-snug font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[56ch] font-sans text-[0.9375rem] leading-relaxed text-graphite">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
