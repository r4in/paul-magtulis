"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const STATEMENT =
  "Good counsel begins before the law — with understanding the people, the facts, and what is truly at stake. The strategy comes after, and it is built to fit.";

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/**
 * Full-width editorial statement. Words surface from faint to full ink as the
 * reader scrolls through the section — a controlled, low-key text reveal.
 */
export function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section aria-label="Philosophy" className="bg-paper">
      <div ref={ref} className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10">
          <p className="mb-8 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-mute uppercase lg:col-span-2 lg:mb-0">
            A note on
            <br className="hidden lg:block" /> the work
          </p>
          <blockquote className="lg:col-span-9">
            <p className="font-serif text-[clamp(1.7rem,3.6vw,3.1rem)] leading-[1.22] font-medium tracking-[-0.01em] text-ink">
              {reduced
                ? STATEMENT
                : words.map((word, i) => (
                    <Word
                      key={i}
                      word={word}
                      progress={scrollYProgress}
                      start={i / words.length}
                      end={(i + 1) / words.length}
                    />
                  ))}
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-12 bg-accent" />
              <p className="font-sans text-[0.75rem] font-semibold tracking-[0.18em] text-mute uppercase">
                The premise of the practice
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
