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
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const locale = useLocale();

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
      {/* Wider shell so the left/right whitespace is put to work (client). */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-center">
        {/* Top row — brand wordmark pulled to the left, the primary "Κλείσε
            Θέση" CTA pulled up to the top-right and sized ~1.5× larger. */}
        <div className="mb-8 lg:mb-12 flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="font-display font-semibold tracking-wide text-center lg:text-left text-[clamp(2.2rem,4.8vw,3.4rem)] text-plum"
          >
            {tBrand("name")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_LUXURY }}
            className="w-full sm:w-auto lg:shrink-0"
          >
            <PremiumButton
              href={`/${locale}/contact`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg lg:px-11 lg:py-5"
            >
              {tNav("bookSession")}
            </PremiumButton>
          </motion.div>
        </div>

        {/* Three columns, spread wide: photo hugs the left, the empathy beat
            sits centre, the programs are pushed out to the right — with a
            generous gap so both edges of the canvas are used. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.92fr)_minmax(0,1.05fr)] gap-8 lg:gap-14 items-start">
          {/* LEFT — photo, pulled to the left edge */}
          <div className="order-2 lg:order-1">
            <HeroPhotoPanel tall={!!workshop} />
          </div>

          {/* CENTER — the empathy beat only (label + rotating inner fears). */}
          <div className="order-1 lg:order-2">
            <HeroEmpathyRotator />
          </div>

          {/* RIGHT — programs + workshop, pushed to the right edge. */}
          <div className="order-3">
            <HeroProgramsPanel workshop={workshop} />
          </div>
        </div>
      </div>
    </section>
  );
}
