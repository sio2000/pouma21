"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function HeroPhotoPanel() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const founderName = locale === "el" ? "Δήμητρα Γιαννουπλάκη" : "Dimitra Giannouplaki";
  const facts = t.raw("aboutFacts") as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: EASE_LUXURY }}
      className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:max-w-none"
    >
      {/* Soft decorative glow behind the frame */}
      <div className="absolute -top-10 -left-8 w-44 h-44 rounded-full bg-lav-400/25 blur-3xl -z-10" aria-hidden />
      <div className="absolute -bottom-6 -right-6 w-52 h-52 rounded-full bg-gold-400/20 blur-3xl -z-10" aria-hidden />

      {/* Framed photo */}
      <div className="relative w-full">
        {/* Gradient hairline frame — a soft lavender→gold border */}
        <div className="relative w-full rounded-[2.2rem] p-[3px] bg-gradient-to-br from-lav-300/80 via-white/50 to-gold-300/80 shadow-strong">
          <div className="relative w-full overflow-hidden rounded-[2rem] ring-1 ring-white/50 aspect-[4/5]">
            <Image
              src="/newherosectionpik.png"
              alt={`${founderName} — The Pouma Academy`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-transparent" />

            {/* Top-left glass badge — two-word identity */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: EASE_LUXURY }}
              className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/35 backdrop-blur-xl px-3.5 py-2 shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm">
                {t("photoBadge")}
              </span>
            </motion.div>

            {/* Bottom name plate on the image */}
            <div className="absolute inset-x-4 bottom-4">
              <span className="block font-display text-white text-lg sm:text-xl leading-tight drop-shadow-[0_2px_10px_rgba(20,11,40,0.6)]">
                {founderName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-200 mt-0.5">
                {t("founderEyebrow")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* "Who I am" — a short block of facts under the photo, with a "more" link
          into the full /about page (client request). */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
        className="mt-6 rounded-[1.6rem] bg-white/70 backdrop-blur-md border border-lav-100 shadow-soft px-5 py-5"
      >
        <div className="flex items-center gap-2.5 mb-3.5">
          <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" aria-hidden />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-lav-700">
            {t("aboutLabel")}
          </span>
        </div>

        <ul className="space-y-2.5">
          {facts.map((fact, i) => (
            <motion.li
              key={fact}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.09, ease: EASE_LUXURY }}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gold-200/70 text-gold-600">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-sm leading-snug text-plum/80">{fact}</span>
            </motion.li>
          ))}
        </ul>

        <Link
          href={`/${locale}/about`}
          className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lav-700 hover:text-gold-600 transition-colors"
        >
          {t("aboutMore")}
          <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
