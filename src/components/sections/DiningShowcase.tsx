"use client";

import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { restaurantPlatingVideo, burgerCloseupVideo, foodMacroVideo } from "@/components/data/assets";

export function DiningShowcase() {
  return (
    <section className="relative px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
      <AmbientGrid opacity="opacity-35" />

      {/* Section label */}
      <div className="mx-auto mb-10 flex max-w-[1800px] items-center gap-4">
        <div className="h-px w-8 bg-[#C9A96E]/40" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E]/50">
          Dining
        </span>
      </div>

      <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
          <VideoSurface asset={restaurantPlatingVideo} playMode="visible" />
          <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div className="flex h-full items-center">
              <div>
                <AnimatedText
                  as="h3"
                  className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.3] tracking-wide text-white"
                  blur
                >
                  Light softens. Conversations fade in.<br />
                  <span className="mt-2 block text-white/74">The space shifts to experience.</span>
                </AnimatedText>
                <AnimatedText
                  className="mt-4 max-w-md text-sm leading-relaxed text-white/40"
                  delay={0.12}
                >
                  From the first course to the final glass, every moment is choreographed — not rushed, never accidental.
                </AnimatedText>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-8">
          <article className="relative min-h-[32vh] overflow-hidden rounded-[2.2rem] border border-white/10">
            <VideoSurface asset={burgerCloseupVideo} playMode="hover" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">
                Street &amp; Soul
              </p>
            </div>
          </article>
          <article className="relative min-h-[36vh] overflow-hidden rounded-[2.2rem] border border-white/10">
            <VideoSurface asset={foodMacroVideo} playMode="hover" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/40">
                Hospitality Layer
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
