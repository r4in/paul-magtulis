import { contact, site } from "@/content/paul-profile";

export function Footer() {
  return (
    <footer className="border-t border-cream/15 bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <p className="font-serif text-[2rem] leading-none font-medium tracking-tight text-cream italic">
              PM
            </p>
            <p className="mt-4 font-sans text-sm font-semibold text-cream">
              Atty. {site.name}
            </p>
            <p className="mt-1 font-sans text-[0.8125rem] text-cream/60">
              {site.title} · {site.scope}
            </p>
            <p className="mt-1 font-sans text-[0.8125rem] text-cream/60">{site.admitted}</p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream/50 uppercase">
              Reach out
            </h2>
            <ul className="mt-4 space-y-2 font-sans text-[0.8125rem] text-cream/75">
              {/* Direct contact rows appear when verified details are added in content/paul-profile.ts (TODO). */}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone}`} className="link-underline">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.office && <li>{contact.office}</li>}
              {contact.linkedin && (
                <li>
                  <a href={contact.linkedin} className="link-underline" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <a href="#contact" className="link-underline">
                  Inquiry form
                </a>
              </li>
              <li className="text-cream/50">Available in person &amp; remotely, Philippines</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream/50 uppercase">
              Notices
            </h2>
            <ul className="mt-4 space-y-2 font-sans text-[0.8125rem] text-cream/75">
              <li>
                {/* TODO: replace with a real privacy policy page before launch. */}
                <a href="#" aria-disabled="true" className="link-underline">
                  Privacy notice
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6">
          <p className="max-w-[90ch] font-sans text-xs leading-relaxed text-cream/45">
            This website is for general information only and does not constitute legal
            advice. Reading it, or contacting Atty. Magtulis through it, does not create an
            attorney-client relationship. Legal outcomes depend on the specific facts and
            law of each matter.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-sans text-xs text-cream/45">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="font-serif text-xs text-cream/45 italic">
              Designed with clarity and purpose.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
