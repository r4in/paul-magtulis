"use client";

import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal-text";
import { credentials } from "@/content/paul-profile";

/**
 * Selected credentials, set like the index pages of a publication —
 * typographic register, hairline rules, no badges.
 */
export function CredentialsRegister() {
  return (
    <section aria-label="Selected credentials" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <SectionLabel index="—" label="Register" light />
            <h2 className="mt-8 font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.12] font-medium tracking-[-0.01em] text-cream">
              On record.
            </h2>
            <p className="mt-6 max-w-[38ch] font-sans text-[0.9375rem] leading-relaxed text-cream/70">
              Licenses, education, and appointments — listed as they stand, without
              embellishment.
            </p>
          </div>

          <div className="lg:col-span-8">
            {credentials.map((group, gi) => (
              <Reveal key={group.heading} delay={gi * 0.05}>
                <div className="grid grid-cols-1 border-t border-cream/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8">
                  <h3 className="mb-4 font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream/50 uppercase md:col-span-4 md:mb-0">
                    {group.heading}
                  </h3>
                  <ul className="space-y-5 md:col-span-8">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <p className="font-serif text-[1.2rem] leading-snug font-medium text-cream">
                          {item.title}
                        </p>
                        <p className="mt-1 font-sans text-[0.8125rem] text-cream/60">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
