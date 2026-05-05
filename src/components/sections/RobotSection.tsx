"use client";

import { type RefObject, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { RobotFigure } from "@/components/figures/RobotFigure";
import { electronicsVideo } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

type RobotSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
};

export function RobotSection({ sectionRef, pinRef }: RobotSectionProps) {
  const robotProgress = useMotionValue(0);

  const robotBgScale = useTransform(robotProgress, [0, 1], [1.08, 1]);
  const electronicsPortalScale = useTransform(robotProgress, [0.15, 0.45, 1], [0.12, 1.04, 1.04]);
  const electronicsPortalOpacity = useTransform(robotProgress, [0.1, 0.2, 0.45, 1], [0, 0.95, 1, 1]);
  const electronicsPortalRadius = useTransform(robotProgress, [0.15, 0.45, 1], ["999px", "2rem", "2rem"]);
  const electronicsPortalY = useTransform(robotProgress, [0.15, 0.45, 1], ["-10vh", "0vh", "0vh"]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.2}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          robotProgress.set(self.progress);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, pinRef, robotProgress]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,#070707,#020202)]"
      >
        <AmbientGrid />
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{ scale: robotBgScale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(180,214,255,0.12),transparent_18%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.07),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.72))]" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 z-0 h-[82vh] w-[82vh] max-h-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/12 bg-black/80 shadow-[0_24px_72px_rgba(0,0,0,0.42)] [will-change:transform,opacity]"
          style={{
            scale: electronicsPortalScale,
            opacity: electronicsPortalOpacity,
            borderRadius: electronicsPortalRadius,
            y: electronicsPortalY,
          }}
        >
          <VideoSurface asset={electronicsVideo} playMode="visible" overlayClassName={BASE_MEDIA_OVERLAY} />
        </motion.div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1800px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
          <div className="space-y-6">
            <AnimatedText
              as="h2"
              className="font-[family:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.3] tracking-wide text-white/95"
              blur
            >
              Perspective changes.
            </AnimatedText>
            <AnimatedText
              className="max-w-md text-base leading-relaxed text-white/40"
              delay={0.15}
            >
              Where technology meets curation. Every display is a theatre. Every object, a story told through light and glass.
            </AnimatedText>
          </div>

          <RobotFigure progress={robotProgress} />
        </div>
      </div>
    </section>
  );
}
