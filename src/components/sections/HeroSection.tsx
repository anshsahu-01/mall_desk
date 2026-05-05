"use client";

import { type RefObject } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { ImpactMetric } from "@/components/shared/ImpactMetric";
import { AmbientStrokes } from "@/components/ui/ambient-strokes";
import { heroVideo, mallOverviewVideo, floatingWords, fallingWords } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_24%)] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

/* ── Floating type band ── */
function FloatingTypeBand() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[14vh] overflow-hidden">
      <motion.div
        className="flex w-max whitespace-nowrap pl-[8vw] font-[family:var(--font-display)] text-[clamp(4rem,11vw,10rem)] uppercase leading-none tracking-[-0.07em] text-white/16 blur-[0.4px]"
        animate={{ x: ["6%", "-38%"] }}
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {[...floatingWords, ...floatingWords, ...floatingWords].map((word, index) => (
          <span key={`${word}-${index}`} className="pr-16">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Falling word ── */
function FallingWord({
  index,
  progress,
  word,
}: {
  index: number;
  progress: MotionValue<number>;
  word: string;
}) {
  const y = useTransform(progress, [0, 1], [`-${24 + index * 6}%`, `${index * 9}%`]);
  const opacity = useTransform(progress, [0.06, 0.25, 0.72], [0, 0.16, 0.06]);

  return (
    <motion.span
      className="absolute hidden font-[family:var(--font-display)] text-[clamp(2.2rem,4vw,4.8rem)] tracking-[-0.05em] text-white/14 lg:block"
      style={{
        y,
        opacity,
        left: `${8 + index * 14}%`,
        top: `${6 + (index % 2) * 18}%`,
      }}
    >
      {word}
    </motion.span>
  );
}

function FallingTypography({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {fallingWords.map((word, index) => (
        <FallingWord key={word} index={index} progress={progress} word={word} />
      ))}
    </div>
  );
}

/* ── Hero Section ── */
type HeroSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  heroProgress: MotionValue<number>;
  heroVideoScale: MotionValue<number>;
  heroVideoX: MotionValue<string>;
  heroVideoY: MotionValue<string>;
  heroVideoRadius: MotionValue<string>;
  heroInfoY: MotionValue<string>;
  heroInfoOpacity: MotionValue<number>;
  heroMiniOpacity: MotionValue<number>;
};

export function HeroSection({
  sectionRef,
  heroProgress,
  heroVideoScale,
  heroVideoX,
  heroVideoY,
  heroVideoRadius,
  heroInfoY,
  heroInfoOpacity,
  heroMiniOpacity,
}: HeroSectionProps) {
  return (
    <section ref={sectionRef} className="relative min-h-[170vh]">
      <div className="relative sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 origin-center overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.36)] transform-gpu [contain:layout_paint_style] [will-change:transform]"
          style={{
            scale: heroVideoScale,
            x: heroVideoX,
            y: heroVideoY,
            borderRadius: heroVideoRadius,
          }}
        >
          <VideoSurface
            asset={heroVideo}
            priority
            playMode="hero"
            overlayClassName={BASE_MEDIA_OVERLAY}
          />
        </motion.div>

        <AmbientGrid />
        <AmbientStrokes />
        <FloatingTypeBand />
        <FallingTypography progress={heroProgress} />

        <motion.div
          className="absolute right-8 top-8 hidden h-[22vh] w-[22vw] min-w-[260px] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_18px_56px_rgba(0,0,0,0.28)] lg:block"
          style={{ opacity: heroMiniOpacity }}
        >
          <VideoSurface asset={mallOverviewVideo} playMode="hover" />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex h-full w-full max-w-[1800px] flex-col justify-between px-6 py-8 sm:px-10 lg:px-16"
          style={{ y: heroInfoY, opacity: heroInfoOpacity }}
        >
          
          <div className="grid items-end gap-14 pb-14 pt-24 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8 lg:col-span-2">
              <AnimatedText
                as="h1"
                className="max-w-4xl font-[family:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.3] tracking-wide text-white drop-shadow-md"
                blur
              >
                It doesn&rsquo;t feel like entering a mall.<br />
                <span className="text-white/74">
                  It feels like stepping into a world that was waiting for you.
                </span>
              </AnimatedText>
            </div>

            <div className="space-y-10 lg:justify-self-end">
              <div className="grid grid-cols-2 gap-4">
                <ImpactMetric value="250+" label="Luxury Brands" />
                <ImpactMetric value="40" label="Dining Concepts" />
                <ImpactMetric value="12" label="Event Programs" />
                <ImpactMetric value="1" label="Living Ecosystem" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
