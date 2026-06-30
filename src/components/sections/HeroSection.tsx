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

          {/* CENTER — the empathy beat only. Per client feedback the centre is
              stripped of all "noise" (motto, badge, headline, CTAs); only the
              rotating inner-fears rotator remains, with its label pulled up to
              the top. Conversion stays via the right column's "Κλείσε Θέση". */}
          <div className="order-1 lg:order-2 flex flex-col justify-start lg:pt-1">
            <HeroEmpathyRotator />
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
