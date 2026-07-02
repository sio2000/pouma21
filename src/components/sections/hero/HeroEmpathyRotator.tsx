"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

/** Number of imaginary lines the phrase steps down through, and the hold time. */
const MAX_LINES = 5;
const HOLD_MS = 2600;

/**
 * The "I know how you feel" beat. A bold script label leads (same typeface as
 * the brand tagline "Η φωνή σου, αναδειγμένη"); beneath it ONE inner fear shows
 * at a time. The first appears on the top imaginary line; once it fades out the
 * next appears one line LOWER; then the next lower still — stepping down through
 * five lines, then wrapping back to the top. Only ever one phrase on screen.
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

  // Which imaginary line (0 = top … MAX_LINES-1 = bottom) this phrase sits on.
  const slot = index % MAX_LINES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: EASE_LUXURY }}
    >
      {/* Prominent script label — same typeface as the brand tagline, enlarged
          so it clearly leads the eye (client: "make 'Νιώθεις ότι' bolder"). */}
      <div className="mb-6 text-center lg:text-left">
        <span className="font-script leading-none text-plum text-[clamp(2.3rem,3.8vw,3.4rem)] drop-shadow-[0_2px_16px_rgba(120,80,160,0.20)]">
          {label}
        </span>
        <span
          className="mt-3 block h-[3px] w-24 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
          aria-hidden
        />
      </div>

      {/* Stage of five imaginary lines. One phrase at a time, absolutely placed
          on its line, so each successive phrase sits lower than the last. */}
      <div className="relative min-h-[16rem] sm:min-h-[17rem]" aria-live="polite">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-lav-100/55 via-transparent to-gold-100/45 blur-2xl opacity-80"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={index}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 14, filter: "blur(6px)" }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -14, filter: "blur(6px)" }
            }
            transition={{ duration: 0.55, ease: EASE_LUXURY }}
            style={{ top: `${slot * (100 / MAX_LINES)}%` }}
            className="absolute inset-x-0 font-display italic text-[clamp(1.25rem,1.7vw,1.65rem)] leading-snug text-plum text-center lg:text-left"
          >
            <span
              className="font-display not-italic text-gold-400 text-[1.45em] leading-none mr-1.5 align-[-0.32em]"
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
