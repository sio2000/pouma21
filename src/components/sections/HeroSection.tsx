"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";
import HeroPhotoPanel from "@/components/sections/hero/HeroPhotoPanel";
import HeroRightProgramsPanel from "@/components/sections/hero/HeroRightProgramsPanel";
import HeroWorkshopButton from "@/components/sections/hero/HeroWorkshopButton";
import HeroEmpathyRotator from "@/components/sections/hero/HeroEmpathyRotator";
import PumaHeroBackdrop from "@/components/puma/PumaHeroBackdrop";
import { EASE_LUXURY } from "@/lib/motion";

export default function HeroSection() {
  const tBrand = useTranslations("brand");
  const tHero = useTranslations("hero");
  const locale = useLocale();

  return (
    <section id="hero" className="relative w-full min-h-[100svh] flex flex-col bg-warm-mesh pt-28 sm:pt-32 lg:pt-32 pb-10 lg:pb-12 overflow-hidden">
      <PumaHeroBackdrop />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-start">
        {/* Top row — brand wordmark, now centred and a touch smaller. */}
        <div className="mb-8 lg:mb-12 flex flex-col items-center gap-5">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="font-display font-semibold tracking-wide text-center text-[clamp(1.85rem,4vw,2.85rem)] text-plum"
          >
            {tBrand("name")}
          </motion.h2>
        </div>

        {/* Two columns per the layout sketch: LEFT the coach (large photo +
            who-I-am + the primary CTA beneath it), RIGHT the emotional beat
            ("Νιώθεις ότι…" → quotes → the reason) followed by a short lead-in
            to the programmes that appear full-width below. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.15fr)] gap-8 lg:gap-x-24 xl:gap-x-32 lg:gap-y-14 items-start">
          {/* LEFT — photo + identity (the CTA now lives beside the descending
              arrow in the right column, per client request) */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <HeroPhotoPanel />
          </div>

          {/* RIGHT — empathy beat + programmes lead-in */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 lg:gap-10">
            {/* One continuous thought: the rotating fear → the reason → the
                lead-in to the programmes, all strung together by the same thin
                vertical connector so they read as a single mental path. */}
            <div className="flex flex-col">
              <HeroEmpathyRotator />

              {/* Connector — identical to the one inside the rotator, so the
                  "Και τώρα;" lead-in reads as a continuation of the path. */}
              <div className="flex justify-center lg:justify-start" aria-hidden>
                <span className="ml-0 lg:ml-8 my-1 block h-7 w-px bg-gradient-to-b from-gold-300 to-lav-300/50" />
              </div>

              {/* The emotional pivot into the programmes. Nothing is spelled
                  out ("the answer", "see below") — the feeling is SHOWN: the
                  key line is spoken large and warm, gold-lit like the programme
                  cards, and a soft descending chevron lets the eye fall
                  naturally onto them. */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE_LUXURY }}
                className="relative text-center lg:text-left"
              >
                {/* Eyebrow — bolder, warmer and larger than "Νιώθεις ότι…" so
                    the "Και τώρα;" pivot feels like the lively turning point. */}
                <div className="mb-3.5 flex items-center gap-3 justify-center lg:justify-start">
                  <span className="h-px w-8 bg-gradient-to-r from-gold-500 to-transparent" aria-hidden />
                  <span className="font-display font-bold tracking-tight text-[clamp(1.6rem,2.6vw,2.15rem)] bg-gradient-to-r from-gold-500 via-plum to-lav-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(197,149,58,0.25)]">
                    {tHero("programsIntroEyebrow")}
                  </span>
                </div>

                <p className="max-w-xl mx-auto lg:mx-0 font-display text-plum text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.3] tracking-tight">
                  {tHero("programsIntroLead")}
                  {tHero("programsIntroRest")}
                </p>

                {/* Descending chevron + the primary CTA right beside it — the
                    thread falls into the programmes and the button invites the
                    free assessment at the exact same beat. */}
                <div className="mt-5 flex items-center gap-4 justify-center lg:justify-start">
                  <motion.svg
                    aria-hidden
                    className="w-10 h-10 shrink-0 text-gold-500 drop-shadow-[0_3px_10px_rgba(197,149,58,0.4)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ y: [0, 7, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M5 8.5l7 7 7-7" />
                    <path d="M5 14l7 7 7-7" opacity="0.55" />
                  </motion.svg>

                  <PremiumButton
                    href={`/${locale}/contact`}
                    variant="primary"
                    size="lg"
                    className="text-base sm:text-lg lg:px-9 lg:py-4"
                  >
                    {tHero("freeAssessment")}
                  </PremiumButton>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Programmes — moved out of the right column into a full-width row
            beneath the hero, restyled to match the gold intro cards. The purple
            featured-workshop pill sits centred directly above them. */}
        <div className="mt-12 lg:mt-16">
          <HeroWorkshopButton />
          <HeroRightProgramsPanel />
        </div>
      </div>
    </section>
  );
}
