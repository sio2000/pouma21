"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getWorkshopContent } from "@/lib/workshops/content";
import { formatWorkshopDate } from "@/lib/workshops/status";
import { EASE_LUXURY } from "@/lib/motion";
import type { WorkshopView } from "@/lib/workshops/types";

const PATH_KEYS = ["path1", "path2", "path3", "path4"] as const;

const PATH_ACCENT: Record<(typeof PATH_KEYS)[number], string> = {
  path1: "bg-lav-500",
  path2: "bg-lav-600",
  path3: "bg-gold-400",
  path4: "bg-lav-700",
};

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function HeroProgramsPanel({ workshop }: { workshop: WorkshopView | null }) {
  const t = useTranslations("hero");
  const tp = useTranslations("programs");
  const tc = useTranslations("cta");
  const locale = useLocale();
  const content = getWorkshopContent(locale);

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_LUXURY }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden />
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-lav-700">
          {t("programsLabel")}
        </span>
      </motion.div>

      <ul className="space-y-3">
        {PATH_KEYS.map((key, i) => (
          <motion.li
            key={key}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE_LUXURY }}
          >
            <Link
              href={`/${locale}/programs`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border-2 border-lav-100 px-5 py-4 shadow-soft transition-all duration-300 hover:border-gold-400 hover:bg-gold-50/60 hover:shadow-gold-glow hover:-translate-y-1"
            >
              {/* Gold sweep that wipes across on hover — matches the intro-cards effect */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-300/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden
              />
              {/* Top accent bar grows in on hover */}
              <span
                className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-gold-300 transition-transform duration-400 ease-out group-hover:scale-x-100"
                aria-hidden
              />

              <span
                className={`relative flex-shrink-0 h-2.5 w-2.5 rounded-full ${PATH_ACCENT[key]} transition-transform duration-300 group-hover:scale-125`}
                aria-hidden
              />
              <span className="relative flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-lav-600/80 mb-0.5 transition-colors duration-300 group-hover:text-gold-600">
                  {tp(`${key}.number`)} · {tp(`${key}.tag`)}
                </span>
                <span className="block font-sans font-bold text-base sm:text-lg text-plum leading-snug truncate">
                  {tp(`${key}.title`)}
                </span>
              </span>
              <span className="relative flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-lav-50 text-lav-500 transition-all duration-300 group-hover:bg-gold-400 group-hover:text-white group-hover:scale-110">
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: EASE_LUXURY }}
        className="mt-4"
      >
        <Link
          href={`/${locale}/programs`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-lav-700 hover:text-lav-800 transition-colors"
        >
          {tc("secondary")}
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      <AnimatePresence>
        {workshop && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
            className="relative mt-6"
          >
            {/* Soft breathing glow halo — the "attention" cue, kept light */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-1.5 rounded-[1.6rem] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 blur-xl pointer-events-none"
            />

            <Link
              href={`/${locale}/workshop/${workshop.slug}`}
              className="group relative flex items-center gap-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-gold-300/70 px-5 py-4 shadow-medium hover:shadow-strong transition-shadow duration-300"
            >
              <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-gold-glow">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60 animate-ping" />
                <span className="relative text-white text-sm" aria-hidden>
                  ✦
                </span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-500 mb-0.5">
                  {content.popup.eyebrow}
                </span>
                <span className="block text-sm sm:text-base font-semibold text-plum leading-snug truncate">
                  {workshop.title}
                </span>
                <span className="block text-xs text-plum/55 mt-0.5">
                  {formatWorkshopDate(workshop, locale)}
                </span>
              </span>
              <ArrowIcon className="w-4 h-4 text-plum/50 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
