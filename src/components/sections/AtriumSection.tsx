"use client";

import { type RefObject } from "react";
import { MotionValue, motion } from "framer-motion";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { atriumVideo, walkVideo } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

type AtriumSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  atriumScale: MotionValue<number>;
  atriumX: MotionValue<string>;
  atriumY: MotionValue<string>;
  atriumRadius: MotionValue<string>;
  atriumTextY: MotionValue<string>;
  atriumTextOpacity: MotionValue<number>;
  atriumMiniOpacity: MotionValue<number>;
};

export function AtriumSection({
  sectionRef,
  atriumScale,
  atriumX,
  atriumY,
  atriumRadius,
  atriumTextY,
  atriumTextOpacity,
  atriumMiniOpacity,
}: AtriumSectionProps) {
  return (
    <section ref={sectionRef} className="relative min-h-[152vh]">
      <div className="relative sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.36)] transform-gpu [contain:layout_paint_style] [will-change:transform]"
          style={{
            scale: atriumScale,
            x: atriumX,
            y: atriumY,
            borderRadius: atriumRadius,
          }}
        >
          <VideoSurface
            asset={atriumVideo}
            playMode="visible"
            overlayClassName={BASE_MEDIA_OVERLAY}
          />
        </motion.div>

        <AmbientGrid />

        {/* Ambient typography */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[8%] top-[18%] text-[clamp(4rem,9vw,8rem)] font-[family:var(--font-display)] uppercase tracking-[-0.06em] text-white/12">
            Atrium
          </div>
          <div className="absolute left-[6%] top-[54%] text-[clamp(3rem,7vw,6rem)] font-[family:var(--font-display)] uppercase tracking-[-0.06em] text-white/10">
            Movement
          </div>
        </div>

        <motion.div
          className="absolute left-8 top-8 hidden h-[22vh] w-[22vw] min-w-[260px] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_18px_56px_rgba(0,0,0,0.28)] lg:block"
          style={{ opacity: atriumMiniOpacity }}
        >
          <VideoSurface asset={walkVideo} playMode="hover" />
        </motion.div>

        <motion.div
          className="relative mx-auto flex h-full w-full max-w-[1800px] flex-col justify-end px-6 py-10 sm:px-10 lg:px-16"
          style={{ y: atriumTextY, opacity: atriumTextOpacity }}
        >
          <div className="pb-14 max-w-2xl">
            <AnimatedText
              as="h2"
              className="font-[family:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.3] tracking-wide text-white/95"
              blur
            >
              A world in motion.
            </AnimatedText>
            <AnimatedText
              className="mt-4 text-base leading-relaxed text-white/45"
              delay={0.15}
            >
              Light bends through six stories of glass and steel. Every floor breathes with movement — escalators rise, storefronts shift, and the atrium holds it all together like a living heartbeat.
            </AnimatedText>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
