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
      transition={{ duration: 0.8, delay: 0.35, ease: EASE_LUXURY }}
      className="lg:pt-1"
    >
      {/* Prominent script label — same typeface as the brand tagline. */}
      <div className="mb-5 text-center lg:text-left">
        <span className="font-script leading-none text-plum text-[clamp(2.2rem,3.6vw,3.2rem)] drop-shadow-[0_2px_16px_rgba(120,80,160,0.20)]">
          {label}
        </span>
        <span
          className="mt-3 block h-[3px] w-24 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
          aria-hidden
        />
      </div>

      {/* Compact glass card holding one rotating fear at a time. */}
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
    </motion.div>
  );
}
