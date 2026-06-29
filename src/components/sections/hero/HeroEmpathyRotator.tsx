"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

/** How long each phrase stays fully visible before the next one takes over. */
const HOLD_MS = 3000;

/**
 * The emotional "I know how you feel" beat that the client asked for — a single
 * line of the visitor's own inner fears, lit up one at a time. Each phrase
 * enters from just above, settles, then leaves toward the bottom: calm and
 * elegant, never bursting into the eye. Sits in the centre column, between the
 * founder photo and the programs, with generous room to breathe.
 */
export default function HeroEmpathyRotator() {
  const t = useTranslations("hero");
  const phrases = t.raw("empathy") as string[];
  const label = t("empathyLabel");
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || phrases.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduce, phrases.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
      className="my-7"
    >
      {/* Quiet framing label — "Sound familiar?" — with a soft pulsing cue. */}
      <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
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

      {/* Spacious stage. The soft halo + generous min-height give the rotating
          phrases the room the client asked for, without any hard card edge. */}
      <div className="relative" aria-live="polite">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-lav-100/55 via-transparent to-gold-100/45 blur-2xl opacity-80"
        />
        <div className="relative min-h-[7.5rem] sm:min-h-[7rem] lg:min-h-[7.5rem] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -18, filter: "blur(6px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: EASE_LUXURY }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 lg:items-start"
            >
              <p className="relative font-display italic text-[clamp(1.35rem,1.8vw,1.7rem)] leading-snug text-plum text-center lg:text-left">
                <span
                  className="font-display not-italic text-gold-400 text-[1.6em] leading-none mr-1.5 align-[-0.35em]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                {phrases[index]}
              </p>
              <motion.span
                aria-hidden
                initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.18, ease: EASE_LUXURY }}
                className="block h-[2px] w-16 rounded-full origin-center lg:origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
