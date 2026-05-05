"use client";

import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { MediaCard } from "@/components/shared/MediaCard";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { appleStoreVideo, electronicsVideo, corridorMedia } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

export function RetailShowcase() {
  return (
    <section className="relative px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
      <AmbientGrid opacity="opacity-35" />

      {/* Section label */}
      <div className="mx-auto mb-10 flex max-w-[1800px] items-center gap-4">
        <div className="h-px w-8 bg-[#C9A96E]/40" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96E]/50">
          Retail
        </span>
      </div>

      <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
          <VideoSurface asset={appleStoreVideo} playMode="visible" />
          <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
            <AnimatedText
              as="h3"
              className="mt-auto max-w-2xl font-[family:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.3] tracking-wide text-white/95"
              blur
            >
              Light. Glass. Precision.
            </AnimatedText>
            <AnimatedText
              className="mt-3 max-w-md text-sm leading-relaxed text-white/40"
              delay={0.12}
            >
              Flagship stores become architectural experiences — where every product sits inside a world built just for it.
            </AnimatedText>
          </div>
        </article>

        <div className="grid gap-8">
          <article className="relative min-h-[30vh] overflow-hidden rounded-[2.2rem] border border-white/10">
            <VideoSurface asset={electronicsVideo} playMode="hover" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">
                Display Layer
              </p>
            </div>
          </article>
          <article className="relative min-h-[38vh] overflow-hidden rounded-[2.2rem] border border-white/10">
            <MediaCard media={corridorMedia[1]} />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/40">
                Product Worlds
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
