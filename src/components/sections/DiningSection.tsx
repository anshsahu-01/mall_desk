"use client";

import { type RefObject, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { PlateScene } from "@/components/shared/PlateScene";
import { restaurantVideo } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

type DiningSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
};

export function DiningSection({ sectionRef, pinRef }: DiningSectionProps) {
  const diningProgress = useMotionValue(0);

  const diningBgScale = useTransform(diningProgress, [0, 1], [1.06, 1]);
  const diningWorldScale = useTransform(diningProgress, [0, 0.35, 0.75, 1], [0.9, 0.98, 1.03, 1.03]);
  const diningWorldOpacity = useTransform(diningProgress, [0, 0.16, 0.42, 1], [0, 0.2, 1, 1]);
  const diningWorldRadius = useTransform(diningProgress, [0, 0.45, 1], ["2.8rem", "2rem", "2rem"]);
  const diningWorldY = useTransform(diningProgress, [0, 0.4, 1], ["10vh", "0vh", "0vh"]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.8}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          diningProgress.set(self.progress);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, pinRef, diningProgress]);

  return (
    <section ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_30%),linear-gradient(180deg,#0a0a0a,#040404)]"
      >
        <AmbientGrid />
        <motion.div
          className="absolute inset-0 opacity-34"
          style={{ scale: diningBgScale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,188,136,0.14),transparent_24%),radial-gradient(circle_at_52%_58%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.78))]" />
        </motion.div>

        <motion.div
          className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.46)] [will-change:transform,opacity]"
          style={{
            scale: diningWorldScale,
            opacity: useTransform(diningProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]),
            borderRadius: diningWorldRadius,
            y: diningWorldY,
          }}
        >
          <VideoSurface asset={restaurantVideo} playMode="visible" overlayClassName={BASE_MEDIA_OVERLAY} />
        </motion.div>

        <div className="relative z-10 mx-auto grid h-full w-full max-w-[1800px] items-center gap-8 px-6 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-16">
          <PlateScene progress={diningProgress} />
          <div className="flex h-full items-center">
            <div className="space-y-6">
              <AnimatedText
                as="h2"
                className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.3] tracking-wide text-white"
                blur
              >
                The world slows down.<br />
                <span className="mt-2 block text-white/74">You&rsquo;re arriving.</span>
              </AnimatedText>
              <AnimatedText
                className="max-w-md text-base leading-relaxed text-white/40"
                delay={0.15}
              >
                Fine dining meets architectural intimacy. Every plate is placed with intention, every seat faces something worth seeing.
              </AnimatedText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
