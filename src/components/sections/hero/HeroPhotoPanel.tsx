"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";

export default function HeroPhotoPanel({ tall = false }: { tall?: boolean }) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const founderName = locale === "el" ? "Δήμητρα Γιαννουπλάκη" : "Dimitra Giannouplaki";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: EASE_LUXURY }}
      className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:max-w-none pb-24 lg:pb-0"
    >
      {/* Soft decorative glow behind the frame */}
      <div className="absolute -top-10 -left-8 w-44 h-44 rounded-full bg-lav-400/25 blur-3xl -z-10" aria-hidden />
      <div className="absolute -bottom-6 -right-6 w-52 h-52 rounded-full bg-gold-400/20 blur-3xl -z-10" aria-hidden />

      {/* frameWrap holds the image frame + its floating card together, so the
          card's offset is anchored to the photo itself. `tall` switches back
          to the taller frame when an active workshop makes the programs
          column longer, keeping the photo visually proportionate to it. */}
      <div className="relative w-full">
        <div
          className={`relative w-full rounded-[2rem] overflow-hidden shadow-strong ring-1 ring-lav-200/50 ${
            tall ? "aspect-[128/229]" : "aspect-[4/5]"
          }`}
        >
          <Image
            src="/newherosectionpik.png"
            alt={`${founderName} — The Pouma Academy`}
            fill
            priority
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-transparent" />

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
        </div>

        {/* Floating Apple-style card. Anchored at top-full (the photo's own
            bottom edge) and pulled up, so it overlaps the lower part of the
            image while staying glassy against it. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE_LUXURY }}
          className="absolute top-full -translate-y-8 -right-4 sm:-right-7 w-[80%] sm:w-56 rounded-[1.5rem] bg-white/35 backdrop-blur-2xl border border-white/60 shadow-strong px-5 py-4"
        >
          <p className="text-sm text-plum/85 leading-relaxed">{t("founderIntro2")}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
