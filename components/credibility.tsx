"use client";

import { Reveal } from "@/components/reveal-text";
import { credibility } from "@/content/paul-profile";

/**
 * Verified-facts band immediately after the hero. Every figure here is
 * supported by the source document — see content/paul-profile.md.
 */
export function Credibility() {
  return (
    <section id="facts" aria-label="Credentials at a glance" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {credibility.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.08}
              className="border-cream/15 px-0 py-8 max-lg:border-b sm:px-8 sm:first:pl-0 lg:border-b-0 lg:border-l lg:py-2 lg:first:border-l-0 max-lg:last:border-b-0 max-sm:first:pt-0"
            >
              <dt className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream/60 uppercase">
                {item.label}
              </dt>
              <dd className="mt-3">
                <span className="font-serif text-[clamp(2.4rem,3.4vw,3.4rem)] leading-none font-medium text-cream">
                  {item.figure}
                </span>
                <span className="mt-4 block max-w-[30ch] font-sans text-[0.8125rem] leading-relaxed text-cream/70">
                  {item.detail}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
