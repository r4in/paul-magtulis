"use client";

import { useState, type FormEvent } from "react";
import { SectionLabel } from "@/components/section-label";
import { Reveal, RevealLines } from "@/components/reveal-text";
import { contact, contactMethods, disclaimer, inquiryNatures } from "@/content/paul-profile";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "unconfigured" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  nature?: string;
  message?: string;
  consent?: string;
}

const inputClass =
  "w-full border border-cream/25 bg-transparent px-4 py-3 font-sans text-[0.9375rem] text-cream placeholder:text-cream/35 focus:border-cream/60 transition-colors duration-300 min-h-[48px]";
const labelClass = "mb-2 block font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase text-cream/60";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: FieldErrors = {};
    if (!data.name?.trim()) next.name = "Please enter your full name.";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!data.nature) next.nature = "Please choose the nature of your inquiry.";
    if (!data.message?.trim() || data.message.trim().length < 20) {
      next.message = "Please describe your matter briefly (at least 20 characters).";
    }
    if (!data.consent) next.consent = "Please confirm you have read the notice above.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unconfigured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="bg-ink text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <SectionLabel index="05" label="Contact" light />

        <div className="mt-12 grid grid-cols-1 gap-y-14 lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
          {/* Invitation */}
          <div className="lg:col-span-5">
            <RevealLines
              as="h2"
              className="font-serif text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.06] font-medium tracking-[-0.015em] text-cream"
              lines={["Let's discuss", "what comes next."]}
            />
            <Reveal delay={0.15} className="mt-7 max-w-[44ch]">
              <p className="font-sans text-[0.9375rem] leading-relaxed text-cream/75">
                Describe your situation in broad strokes — the field it touches, what has
                happened, and what you hope to resolve. Paul reviews each inquiry and
                responds with how he can help, what he would need from you, and the
                practical next step.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10 space-y-4">
              {/*
               * Direct contact rows render only when verified details exist in
               * content/paul-profile.ts — none are present in the source document (TODO).
               */}
              {contact.email && (
                <p className="font-sans text-sm">
                  <span className={labelClass}>Email</span>
                  <a href={`mailto:${contact.email}`} className="link-underline text-cream">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p className="font-sans text-sm">
                  <span className={labelClass}>Telephone</span>
                  <a href={`tel:${contact.phone}`} className="link-underline text-cream">
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.office && (
                <p className="font-sans text-sm">
                  <span className={labelClass}>Office</span>
                  <span className="text-cream/80">{contact.office}</span>
                </p>
              )}
              <p className="hairline-t max-w-[44ch] pt-5 font-sans text-xs leading-relaxed text-cream/50 [border-color:rgba(251,250,246,0.15)]">
                Engagements are available in person and remotely, across the Philippines.
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <p className="mb-7 border border-cream/20 px-5 py-4 font-sans text-[0.8125rem] leading-relaxed text-cream/70">
                {disclaimer}
              </p>

              {status === "sent" ? (
                <div role="status" className="border border-cream/25 px-6 py-10 text-center">
                  <p className="font-serif text-2xl text-cream">Thank you — your inquiry is in.</p>
                  <p className="mx-auto mt-3 max-w-[40ch] font-sans text-sm leading-relaxed text-cream/70">
                    Paul will review it and reply using your preferred contact method.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inq-name" className={labelClass}>
                        Full name *
                      </label>
                      <input
                        id="inq-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "inq-name-error" : undefined}
                        className={cn(inputClass, errors.name && "border-red-300/70")}
                        placeholder="Juana Dela Cruz"
                      />
                      {errors.name && (
                        <p id="inq-name-error" className="mt-2 font-sans text-xs text-red-200">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="inq-email" className={labelClass}>
                        Email address *
                      </label>
                      <input
                        id="inq-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "inq-email-error" : undefined}
                        className={cn(inputClass, errors.email && "border-red-300/70")}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p id="inq-email-error" className="mt-2 font-sans text-xs text-red-200">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="inq-phone" className={labelClass}>
                        Phone <span className="normal-case">(optional)</span>
                      </label>
                      <input
                        id="inq-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputClass}
                        placeholder="+63 ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="inq-method" className={labelClass}>
                        Preferred contact method
                      </label>
                      <select id="inq-method" name="method" className={cn(inputClass, "bg-ink")}>
                        {contactMethods.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="inq-nature" className={labelClass}>
                        Nature of inquiry *
                      </label>
                      <select
                        id="inq-nature"
                        name="nature"
                        required
                        defaultValue=""
                        aria-invalid={!!errors.nature}
                        aria-describedby={errors.nature ? "inq-nature-error" : undefined}
                        className={cn(inputClass, "bg-ink", errors.nature && "border-red-300/70")}
                      >
                        <option value="" disabled>
                          Select the closest match
                        </option>
                        {inquiryNatures.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      {errors.nature && (
                        <p id="inq-nature-error" className="mt-2 font-sans text-xs text-red-200">
                          {errors.nature}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="inq-message" className={labelClass}>
                        Brief message *
                      </label>
                      <textarea
                        id="inq-message"
                        name="message"
                        rows={5}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "inq-message-error" : undefined}
                        className={cn(inputClass, "resize-y", errors.message && "border-red-300/70")}
                        placeholder="The field your matter touches, what has happened so far, and what you hope to resolve. Please avoid confidential details at this stage."
                      />
                      {errors.message && (
                        <p id="inq-message-error" className="mt-2 font-sans text-xs text-red-200">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <input
                      id="inq-consent"
                      name="consent"
                      type="checkbox"
                      value="yes"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "inq-consent-error" : "inq-consent-hint"}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#7a302e]"
                    />
                    <label htmlFor="inq-consent" className="font-sans text-[0.8125rem] leading-relaxed text-cream/70">
                      I understand that submitting this form does not create an
                      attorney-client relationship, and I have not included confidential or
                      highly sensitive information.
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="inq-consent-error" className="mt-2 font-sans text-xs text-red-200">
                      {errors.consent}
                    </p>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex min-h-[48px] items-center gap-2.5 border border-cream bg-cream px-7 py-3 font-sans text-sm font-semibold text-ink transition-colors duration-300 hover:bg-transparent hover:text-cream disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending…" : "Send inquiry"}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                    <p id="inq-consent-hint" className="font-sans text-xs text-cream/45">
                      * Required fields
                    </p>
                  </div>

                  {status === "unconfigured" && (
                    <p role="alert" className="mt-6 border border-amber-200/40 px-5 py-4 font-sans text-[0.8125rem] leading-relaxed text-amber-100">
                      This inquiry form is not yet connected to a delivery service, so your
                      message was not sent. Please try again soon — direct contact details
                      will also be published here once confirmed.
                    </p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="mt-6 border border-red-300/40 px-5 py-4 font-sans text-[0.8125rem] leading-relaxed text-red-200">
                      Something went wrong and your message was not sent. Please try again
                      in a moment.
                    </p>
                  )}
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
