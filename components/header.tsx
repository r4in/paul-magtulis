"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { nav, site } from "@/content/paul-profile";
import { EASE, cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] rounded-sm bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled || open
            ? "bg-paper/85 shadow-[0_1px_0_var(--hairline)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        {/* Reading progress */}
        <motion.span
          aria-hidden
          className="absolute top-0 left-0 h-[2px] w-full origin-left bg-accent"
          style={{ scaleX: reduced ? scrollYProgress : progress }}
        />

        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <a
            href="#main"
            className="group flex items-baseline gap-2.5"
            aria-label={`${site.displayName} — back to top`}
          >
            <span className="font-serif text-[1.35rem] leading-none font-medium tracking-tight text-ink italic">
              PM
            </span>
            <span className="hidden font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-graphite uppercase sm:inline">
              Paul Magtulis
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="link-underline font-sans text-[0.8125rem] font-medium tracking-[0.02em] text-graphite hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="group ml-2 inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-sans text-[0.8125rem] font-semibold text-cream transition-colors duration-300 hover:bg-transparent hover:text-ink"
            >
              Discuss your legal matter
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden
              className={cn(
                "h-px w-6 bg-ink transition-transform duration-300",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              aria-hidden
              className={cn(
                "h-px w-6 bg-ink transition-transform duration-300",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pt-28 pb-10 lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="hairline-b flex items-baseline gap-4 py-4 [border-color:rgba(251,250,246,0.14)]"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: EASE }}
                >
                  <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.2em] text-cream/50">
                    {item.index}
                  </span>
                  <span className="font-serif text-3xl text-cream">{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border border-cream/40 px-5 py-4 font-sans text-sm font-semibold text-cream"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            >
              Discuss your legal matter
              <span aria-hidden>→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
