"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

/** How many lines stack before the cascade clears, and the beat between lines. */
const MAX_LINES = 5;
const STEP_MS = 1500;

/**
 * The "I know how you feel" beat the client asked for. The label sits up top;
 * beneath it the visitor's own inner fears surface one after another, each new
 * line settling a step lower than the last until five are stacked — then the
 * stack clears and the cascade begins again with the next set of phrases,
 * looping endlessly. Calm and elegant, never bursting into the eye.
 */
export default function HeroEmpathyRotator() {
  const t = useTranslations("hero");
  const phrases = t.raw("empathy") as string[];
  const label = t("empathyLabel");
  const reduce = useReducedMotion();

  // `start` is the index of the first phrase in the current cascade; `count`
  // is how many lines are currently revealed (1 → MAX_LINES, then resets).
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (reduce || phrases.length === 0) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c < MAX_LINES) return c + 1;
        // Stack is full — advance to the next batch and start over.
        setStart((s) => (s + MAX_LINES) % phrases.length);
        return 1;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, [reduce, phrases.length]);

  // With reduced motion we simply show the first full set, static.
  const lineCount = reduce ? Math.min(MAX_LINES, phrases.length) : count;
  const visible = Array.from({ length: lineCount }, (_, i) => {
    const idx = (start + i) % phrases.length;
    return { idx, text: phrases[idx] };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: EASE_LUXURY }}
    >
      {/* Label — pulled to the top, with a soft pulsing cue. */}
      <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-70 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-lav-700">
          {label}
        </span>
        <span
          className="h-px flex-1 max-w-[5rem] bg-gradient-to-r from-gold-400/60 to-transparent"
          aria-hidden
        />
      </div>

      {/* Cascade stage. A soft halo + reserved height keep the layout steady as
          the lines fill in one after another, descending down the column. */}
      <div className="relative" aria-live="polite">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-lav-100/55 via-transparent to-gold-100/45 blur-2xl opacity-80"
        />
        <ul className="flex flex-col gap-2.5 sm:gap-3 min-h-[15rem]">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(({ idx, text }) => (
              <motion.li
                key={`${start}-${idx}`}
                layout
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -16, filter: "blur(6px)" }
                }
                animate={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: 22, filter: "blur(6px)" }
                }
                transition={{ duration: 0.6, ease: EASE_LUXURY }}
                className="font-display italic text-[clamp(1.05rem,1.45vw,1.4rem)] leading-snug text-plum text-center lg:text-left"
              >
                <span
                  className="font-display not-italic text-gold-400 text-[1.4em] leading-none mr-1 align-[-0.3em]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                {text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
}
