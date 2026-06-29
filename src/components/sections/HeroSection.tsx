"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";
import HeroPhotoPanel from "@/components/sections/hero/HeroPhotoPanel";
import HeroProgramsPanel from "@/components/sections/hero/HeroProgramsPanel";
import HeroEmpathyRotator from "@/components/sections/hero/HeroEmpathyRotator";
import { apiFetch, parseJsonResponse } from "@/lib/api-client";
import { EASE_LUXURY } from "@/lib/motion";
import type { WorkshopView } from "@/lib/workshops/types";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();

  const lines = [t("headline1"), t("headline2"), t("headline3")];

  // The client asked for the opening word ("Speak" / "Μίλησε") to read with more
  // intensity. Split it off so it can carry the vivid gold gradient + glow while
  // the rest of the motto keeps its delicate script flow.
  const motto = t("motto");
  const mottoFirst = motto.split(" ")[0];
  const mottoRest = motto.slice(mottoFirst.length);

  // Lifted up from HeroProgramsPanel: the photo column needs to know whether
  // an active workshop is showing, so it can grow back to its taller frame
  // and stay visually balanced against the now-longer programs column.
  const [workshop, setWorkshop] = useState<WorkshopView | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch("/api/workshops?scope=featured");
        const data = await parseJsonResponse<{ workshop: WorkshopView | null }>(res);
        if (!cancelled) setWorkshop(data.workshop);
      } catch {
        // Non-critical enhancement — panels simply omit the workshop badge.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-[100svh] flex flex-col bg-warm-mesh pt-28 sm:pt-32 lg:pt-32 pb-6 lg:pb-6">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Top-center brand wordmark */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
          className="font-display font-semibold tracking-wide text-center text-[clamp(2.1rem,4.6vw,3.2rem)] text-plum mb-6 lg:mb-8"
        >
          {tBrand("name")}
        </motion.h2>

        {/* Three columns on desktop: photo · headline · programs + workshop. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-8 lg:gap-10 items-stretch">
          {/* LEFT — photo */}
          <div className="order-2 lg:order-1 lg:flex lg:items-center">
            <HeroPhotoPanel tall={!!workshop} />
          </div>

          {/* CENTER — headline */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_LUXURY }}
              className="font-script text-lg sm:text-xl text-gold-500 mb-1.5"
            >
              <span className="text-gold text-[1.5em] leading-none align-[-0.06em] drop-shadow-[0_2px_12px_rgba(245,179,53,0.45)]">
                {mottoFirst}
              </span>
              {mottoRest}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_LUXURY }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/70 border border-lav-200/60 backdrop-blur-md mb-3 mx-auto lg:mx-0 shadow-soft"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-400" />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-lav-700">
                {t("tagline")}
              </span>
            </motion.div>

            <div className="mb-6 space-y-0.5">
              {lines.map((line, i) => (
                <div key={i} className="overflow-hidden py-0.5">
                  <motion.h1
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.0,
                      delay: 0.2 + i * 0.08,
                      ease: EASE_LUXURY,
                    }}
                    className={`text-display-xl block text-[clamp(1.3rem,2.1vw,1.85rem)] leading-[1.1] ${
                      i === 1 ? "text-gradient" : "text-plum"
                    }`}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* The "I know how you feel" beat — rotating inner fears, between
                the photo and the programs, as the client requested. */}
            <HeroEmpathyRotator />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE_LUXURY }}
              className="flex flex-col gap-3 items-center lg:items-stretch"
            >
              <PremiumButton href={`/${locale}/contact`} variant="primary" size="md">
                {t("cta1")}
                <motion.svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </motion.svg>
              </PremiumButton>
              <PremiumButton href="#puma" variant="secondary" size="md">
                {t("whyName")}
              </PremiumButton>
            </motion.div>
          </div>

          {/* RIGHT — booking CTA + programs + workshop */}
          <div className="order-3 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_LUXURY }}
              className="mb-5"
            >
              <PremiumButton href={`/${locale}/contact`} variant="primary" size="md" className="w-full">
                {tNav("bookSession")}
              </PremiumButton>
            </motion.div>

            <HeroProgramsPanel workshop={workshop} />
          </div>
        </div>
      </div>
    </section>
  );
}
