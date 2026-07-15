"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";
import HeroPhotoPanel from "@/components/sections/hero/HeroPhotoPanel";
import HeroProgramsPanel from "@/components/sections/hero/HeroProgramsPanel";
import HeroRightProgramsPanel from "@/components/sections/hero/HeroRightProgramsPanel";
import HeroEmpathyRotator from "@/components/sections/hero/HeroEmpathyRotator";
import { HeroWorkshopCard } from "@/components/sections/hero/HeroProgramsPanel";
import PumaHeroBackdrop from "@/components/puma/PumaHeroBackdrop";
import { apiFetch, parseJsonResponse } from "@/lib/api-client";
import { EASE_LUXURY } from "@/lib/motion";
import type { WorkshopView } from "@/lib/workshops/types";

export default function HeroSection() {
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();

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
    <section id="hero" className="relative w-full min-h-[100svh] flex flex-col bg-warm-mesh pt-28 sm:pt-32 lg:pt-32 pb-10 lg:pb-12 overflow-hidden">
      <PumaHeroBackdrop />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-start">
        {/* Top row — brand wordmark, aligned left as in the layout sketch. */}
        <div className="mb-8 lg:mb-12 flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-start lg:gap-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="font-display font-semibold tracking-wide text-center lg:text-left text-[clamp(2.2rem,4.8vw,3.4rem)] text-plum"
          >
            {tBrand("name")}
          </motion.h2>
        </div>

        {/* Three columns: LEFT the coach (photo + who-I-am + the primary CTA
            beneath it, per the layout sketch), MIDDLE the emotional beat,
            RIGHT the course programme — filling the canvas so the hero reads
            confident and full rather than sparse. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
          {/* LEFT — photo + identity + book-a-session CTA */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <HeroPhotoPanel />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE_LUXURY }}
              className="w-full"
            >
              <PremiumButton
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="w-full text-base sm:text-lg lg:text-xl lg:px-12 lg:py-6"
              >
                {tNav("bookSession")}
              </PremiumButton>
            </motion.div>
          </div>

          {/* MIDDLE — empathy beat + featured-workshop highlight */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 lg:gap-10">
            <HeroEmpathyRotator />
            <HeroWorkshopCard workshop={workshop} />
          </div>

          {/* RIGHT — course programme vertical */}
          <div className="order-3 lg:order-3">
            <HeroRightProgramsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
