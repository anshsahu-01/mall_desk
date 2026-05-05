"use client";

import { type RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { MediaCard } from "@/components/shared/MediaCard";
import { corridorMedia, corridorPanels } from "@/components/data/assets";

type CorridorSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
};

export function CorridorSection({ sectionRef, trackRef }: CorridorSectionProps) {
  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-corridor-panel]");
      const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      gsap.set(track, { x: 0 });

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const copy = panel.querySelector<HTMLElement>("[data-corridor-copy]");

        gsap.fromTo(
          panel,
          { opacity: 0.74, scale: 0.965 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 82%",
              end: "center center",
              scrub: 0.8,
            },
          },
        );

        if (copy) {
          gsap.fromTo(
            copy,
            { opacity: 0.18, y: 36, filter: "blur(12px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 72%",
                end: "center center",
                scrub: 0.65,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [sectionRef, trackRef]);

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#020202]">
      <div className="relative flex h-screen items-center overflow-hidden">
        <AmbientGrid />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* Section header */}
        <div className="absolute left-0 top-12 z-10 w-full px-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1800px] items-center gap-6">
            <div className="h-px w-12 bg-[#C9A96E]/40" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E]/70">
              ARCHITECTURE & MOVEMENT
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex h-full w-max min-w-[320vw] items-center gap-12 px-6 sm:px-10 lg:px-16"
        >
          {corridorPanels.map((item) => (
            <article
              key={`panel-${item.index}`}
              data-corridor-panel
              className="relative flex h-[65vh] w-[90vw] shrink-0 flex-col justify-between overflow-hidden rounded-[3rem] border border-white/5 bg-[#050505] p-10 sm:w-[70vw] lg:w-[60vw] lg:p-16"
            >
              {/* Media layer */}
              <MediaCard 
                media={corridorMedia[parseInt(item.index) - 1] || corridorMedia[0]} 
                className="opacity-60"
              />

              {/* Panel content */}
              <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/30">
                <span className="font-[family:var(--font-display)] text-3xl tracking-tight text-white/10">
                  {item.index}
                </span>
                <span>Scene Shift</span>
              </div>

              <div data-corridor-copy className="relative z-10 space-y-6">
                <AnimatedText
                  as="h2"
                  className="max-w-xl font-[family:var(--font-display)] text-[clamp(1.8rem,3.5vw,3rem)] font-normal leading-[1.2] tracking-wide text-white"
                >
                  {item.title}
                </AnimatedText>
                <AnimatedText
                  className="max-w-md text-base leading-relaxed text-white/40"
                  delay={0.1}
                >
                  {item.body}
                </AnimatedText>
              </div>
              
              {/* Subtle bottom highlight */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
