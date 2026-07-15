"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getWorkshopContent } from "@/lib/workshops/content";
import { EASE_LUXURY } from "@/lib/motion";

type Service = { title: string };

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

/** One distinct icon per service, in order, so each card has its own identity. */
const SERVICE_ICONS = [
  // Presentations — screen with a rising bar
  <g key="i0">
    <rect x="3" y="4" width="18" height="12" rx="1.6" />
    <path d="M12 16v4M8 20h8M8.5 12l2.2-2.6 1.8 1.6 2.8-3.4" />
  </g>,
  // Interviews / meetings — chat bubbles
  <g key="i1">
    <path d="M4 5.5h11a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z" />
    <path d="M20 9h.01M20 9a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2v2l-2.2-1.6" opacity="0.55" />
  </g>,
  // Structured thinking — layered idea
  <g key="i2">
    <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3Z" />
    <path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" opacity="0.6" />
  </g>,
  // Leadership — megaphone
  <g key="i3">
    <path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1Z" />
    <path d="M17.5 8.5a4 4 0 0 1 0 7" opacity="0.6" />
  </g>,
  // Confidence & presence — spark / star
  <g key="i4">
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
    <path d="M19 15l.6 1.6L21 17.2l-1.4.6L19 19.4l-.6-1.6L17 17.2l1.4-.6L19 15Z" opacity="0.6" />
  </g>,
  // Critical analysis — magnifier
  <g key="i5">
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4-4M9 11h4M11 9v4" opacity="0.85" />
  </g>,
];

/** Rotating accent palette so the grid reads colourful yet cohesive. */
const ACCENTS = [
  {
    bar: "from-lav-400 via-lav-500 to-lav-600",
    tint: "from-white via-white to-lav-50",
    chip: "from-lav-500 to-lav-700",
    num: "text-lav-500/30",
    hoverBorder: "hover:border-lav-400",
  },
  {
    bar: "from-gold-300 via-gold-400 to-kroke-400",
    tint: "from-white via-white to-gold-200/40",
    chip: "from-gold-300 to-gold-500",
    num: "text-gold-500/35",
    hoverBorder: "hover:border-gold-400",
  },
  {
    bar: "from-lav-600 via-plum to-lav-700",
    tint: "from-white via-white to-lav-100/70",
    chip: "from-plum to-lav-700",
    num: "text-plum/25",
    hoverBorder: "hover:border-lav-500",
  },
];

/**
 * Vertical course programme panel for the hero right section.
 * Displays the programmes in a 2-column grid with clean card design.
 */
export default function HeroRightProgramsPanel() {
  const t = useTranslations("hero");
  const tc = useTranslations("cta");
  const tComm = useTranslations("communication");
  const locale = useLocale();

  const services = tComm.raw("skills") as Service[];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_LUXURY }}
        className="flex items-center gap-3 mb-5 justify-start"
      >
        <span className="h-px w-8 bg-gradient-to-r from-lav-400 to-transparent" aria-hidden />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-lav-700">
          {t("servicesLabel")}
        </span>
      </motion.div>

      {/* 2-column grid with clean white cards with colors & effects — matching the reference image */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {services.map((service, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: EASE_LUXURY }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Link
                href={`/${locale}/programs`}
                className={`group relative flex flex-col h-full min-h-[11rem] overflow-hidden rounded-[1.5rem] border border-white/50 bg-gradient-to-br ${accent.tint} px-5 py-5 shadow-[0_12px_42px_rgba(58,23,128,0.1)] hover:shadow-[0_20px_58px_rgba(58,23,128,0.16)] transition-all duration-300`}
              >
                {/* Colour bar across the top */}
                <span
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.bar}`}
                  aria-hidden
                />

                {/* Gold wash on hover */}
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-200/70 via-gold-300/40 to-gold-400/50 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  aria-hidden
                />

                {/* Shine sweep on hover */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />

                {/* Small decorative icon/number in top right */}
                <div className="relative flex items-start justify-between mb-4 z-10">
                  <span className={`${accent.num} text-sm font-semibold`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="text-gold-300/70 transition-transform duration-300 group-hover:rotate-45 group-hover:text-gold-400"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Service title */}
                <span className="relative block font-sans font-bold text-base sm:text-lg leading-snug text-plum group-hover:text-plum/90 transition-colors z-10">
                  {service.title}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE_LUXURY }}
        className="mt-4 flex justify-start"
      >
        <Link
          href={`/${locale}/programs`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-lav-700 hover:text-lav-800 transition-colors"
        >
          Δες τα Προγράμματα
          <ArrowIcon className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  );
}
