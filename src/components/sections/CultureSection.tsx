"use client";

import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { concertCrowdVideo } from "@/components/data/assets";

export function CultureSection() {
  return (
    <section className="relative px-6 py-22 sm:px-10 lg:px-16 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:760px]">
      <AmbientGrid opacity="opacity-30" />
      <div className="mx-auto max-w-[1800px] space-y-12">
        {/* Section label */}
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-[#C9A96E]/40" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E]/50">
            Culture
          </span>
        </div>

        <div className="space-y-5">
          <AnimatedText
            as="h2"
            className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.3] tracking-wide text-white"
            blur
          >
            Everything connects.<br />
            <span className="mt-2 block text-white/74">A place that never feels empty.</span>
          </AnimatedText>
          <AnimatedText
            className="max-w-lg text-base leading-relaxed text-white/45"
            delay={0.15}
          >
            Live music, pop-up galleries, community gatherings — the ecosystem stays culturally alive long after the stores close.
          </AnimatedText>
        </div>

        <div className="relative min-h-[46vh] overflow-hidden rounded-[2.6rem] border border-white/10">
          <VideoSurface asset={concertCrowdVideo} playMode="visible" />
        </div>
      </div>
    </section>
  );
}
