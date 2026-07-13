"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

const HOLD_MS = 2600;

/**
 * The "I know how you feel" beat. A bold script label leads (same typeface as
 * the brand tagline); beneath it ONE inner fear shows at a time inside a
 * compact glass card, cross-fading with a soft blur. Kept tight so the hero
 * reads confident and full rather than empty.
 */
export default function HeroEmpathyRotator() {
  const t = useTranslations("hero");
  const phrases = t.raw("empathy") as string[];
  const eyebrow = t("empathyEyebrow");
  const label = t("empathyLabel");
  const answer = t("empathyAnswer");
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
      transition={{ duration: 0.8, delay: 0.35, ease: EASE_LUXURY }}
      className="lg:pt-1"
    >
      {/* Small eyebrow that frames the rotating fears as a shared, familiar feeling. */}
      <div className="mb-3.5 flex items-center gap-2.5 justify-center lg:justify-start">
        <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-lav-700">
          {eyebrow}
        </span>
      </div>

      {/* Compact glass card holding one rotating fear at a time — the "problem". */}
      <div
        className="relative overflow-hidden rounded-[1.75rem] bg-white/60 backdrop-blur-md border border-lav-100 shadow-soft px-6 py-6 min-h-[8.5rem] flex items-center"
        aria-live="polite"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-2 -inset-y-2 -z-10 rounded-[2rem] bg-gradient-to-br from-lav-100/60 via-transparent to-gold-100/50 blur-2xl"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
            className="font-display italic text-[clamp(1.35rem,1.9vw,1.85rem)] leading-snug text-plum text-center lg:text-left"
          >
            <span
              className="font-display not-italic text-gold-400 text-[1.4em] leading-none mr-1.5 align-[-0.3em]"
              aria-hidden
            >
              &ldquo;
            </span>
            {phrases[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Connector — a thin vertical line that visually flows the eye from the
          "problem" card straight down into the explanation, so the answer reads
          as a continuation rather than a separate block. */}
      <div className="flex justify-center lg:justify-start" aria-hidden>
        <span className="ml-0 lg:ml-8 block h-6 w-px bg-gradient-to-b from-gold-300 to-lav-300/50" />
      </div>

      {/* The reason + the fix — one smooth thought that says: we know why this
          happens, and here is how we solve it. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE_LUXURY }}
        className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-lav-50/90 via-white/80 to-gold-50/80 border border-lav-100 shadow-soft px-6 py-5 sm:px-7 sm:py-6"
      >
        {/* Warm accent bar on the leading edge. */}
        <span
          className="absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b from-gold-400 to-lav-400"
          aria-hidden
        />
        <p className="pl-3 text-center lg:text-left">
          <span className="font-script leading-none text-plum text-[clamp(1.7rem,2.6vw,2.35rem)] drop-shadow-[0_2px_14px_rgba(120,80,160,0.18)]">
            {label}
          </span>
          <span className="mt-2.5 block text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-plum/80">
            {answer}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
