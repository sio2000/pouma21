"use client";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import PumaSilhouette from "./PumaSilhouette";

/**
 * PumaHeroBackdrop — the ambient "hidden power" layer that lives behind the
 * hero content. It is deliberately quiet: a large ghost puma prowling on the
 * right, a slow breathing aura of energy, drifting embers rising like latent
 * potential, and a faint set of gold claw-marks. Everything reacts subtly to
 * scroll and pointer, so the page feels alive without ever competing with the
 * copy. Fully decorative — hidden from assistive tech and disabled for users
 * who prefer reduced motion.
 */
export default function PumaHeroBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Scroll parallax — the puma sinks slightly as you leave the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const pumaY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const pumaOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Breathing energy aura behind the cat — the "power core". */}
      <motion.div
        className="absolute right-[10%] top-[48%] h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-gold-400) 34%, transparent) 0%, color-mix(in srgb, var(--color-lav-500) 18%, transparent) 45%, transparent 72%)",
        }}
        animate={
          reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The prowling puma — large, ghosted, gold-lit. */}
      <motion.div
        style={{ y: reduce ? 0 : pumaY, opacity: reduce ? 0.24 : pumaOpacity }}
        className="absolute right-[1%] top-[48%] w-[min(680px,58vw)] -translate-y-1/2"
      >
        <div className="relative">
          <div className="opacity-[0.2] md:opacity-[0.24]">
            <PumaSilhouette gradientId="hero-puma" />
          </div>
          {/* Glowing eye — the spark of awareness in the shadow. */}
          {!reduce && (
            <motion.span
              className="absolute left-[89%] top-[50.5%] h-[7px] w-[7px] rounded-full bg-gold-200"
              style={{ boxShadow: "0 0 16px 5px color-mix(in srgb, var(--color-gold-300) 85%, transparent)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>

      {/* Faint gold claw-marks torn across the upper-right. */}
      <ClawStreaks />

      {/* Rising embers — latent energy drifting upward. */}
      {!reduce && <Embers />}
    </div>
  );
}

function ClawStreaks() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute right-[8%] top-[10%] h-40 w-40 opacity-[0.14] md:h-56 md:w-56"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M ${30 + i * 26} 8 C ${52 + i * 26} 60, ${58 + i * 26} 120, ${44 + i * 26} 188`}
          fill="none"
          stroke="var(--color-gold-400)"
          strokeWidth={5 - i * 0.6}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
}

function Embers() {
  // Deterministic-ish positions so hydration is stable.
  const [seeds] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      left: (i * 67) % 100,
      size: 2 + ((i * 37) % 4),
      delay: (i % 7) * 0.9,
      duration: 9 + ((i * 13) % 8),
      drift: ((i % 5) - 2) * 18,
    })),
  );

  return (
    <div className="absolute inset-0">
      {seeds.map((s, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-gold-300/70"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{
            y: [0, -560],
            x: [0, s.drift],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
