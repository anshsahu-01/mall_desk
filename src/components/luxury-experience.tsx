"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CinematicPreloader } from "@/components/ui/cinematic-preloader";

import { HeroSection } from "@/components/sections/HeroSection";
import { MacBookSection } from "@/components/sections/MacBookSection";
import { AtriumSection } from "@/components/sections/AtriumSection";
import { CorridorSection } from "@/components/sections/CorridorSection";
import { RobotSection } from "@/components/sections/RobotSection";
import { RetailShowcase } from "@/components/sections/RetailShowcase";
import { DiningSection } from "@/components/sections/DiningSection";
import { DiningShowcase } from "@/components/sections/DiningShowcase";
import { CultureSection } from "@/components/sections/CultureSection";
import { Footer } from "@/components/sections/Footer";

export function LuxuryExperience() {
  const [isReady, setIsReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const progressSteps = [18, 42, 68, 88, 100];
    const stepTimers = progressSteps.map((value, index) =>
      window.setTimeout(() => setPreloadProgress(value), 120 + index * 180),
    );

    const readyTimer = window.setTimeout(() => {
      setPreloadProgress(100);
      setIsReady(true);
      document.body.style.overflow = "";
    }, 1200);

    const dismissTimer = window.setTimeout(() => {
      setShowPreloader(false);
    }, 1680);

    return () => {
      stepTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(readyTimer);
      window.clearTimeout(dismissTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <LuxuryExperienceScene />
      {showPreloader ? (
        <CinematicPreloader progress={preloadProgress} isDone={isReady} />
      ) : null}
    </>
  );
}

function LuxuryExperienceScene() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLElement>(null);
  const atriumRef = useRef<HTMLElement>(null);
  const corridorRef = useRef<HTMLElement>(null);
  const corridorTrackRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLElement>(null);
  const robotPinRef = useRef<HTMLDivElement>(null);
  const diningRef = useRef<HTMLElement>(null);
  const diningPinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const heroVideoScale = useTransform(heroProgress, [0, 0.72, 1], [1, 0.86, 0.28]);
  const heroVideoX = useTransform(heroProgress, [0, 1], ["0vw", "32vw"]);
  const heroVideoY = useTransform(heroProgress, [0, 1], ["0vh", "-23vh"]);
  const heroVideoRadius = useTransform(heroProgress, [0, 0.8, 1], ["0rem", "2.4rem", "1.8rem"]);
  const heroInfoY = useTransform(heroProgress, [0, 1], ["0%", "26%"]);
  const heroInfoOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.18]);
  const heroMiniOpacity = useTransform(heroProgress, [0.72, 1], [0, 1]);

  const { scrollYProgress: atriumProgress } = useScroll({
    target: atriumRef,
    offset: ["start start", "end end"],
  });
  const atriumScale = useTransform(atriumProgress, [0, 0.58, 1], [1.04, 0.98, 0.28]);
  const atriumX = useTransform(atriumProgress, [0, 1], ["0vw", "-32vw"]);
  const atriumY = useTransform(atriumProgress, [0, 1], ["0vh", "-22vh"]);
  const atriumRadius = useTransform(atriumProgress, [0, 0.82, 1], ["0rem", "2.4rem", "1.8rem"]);
  const atriumTextY = useTransform(atriumProgress, [0, 1], ["0%", "18%"]);
  const atriumTextOpacity = useTransform(atriumProgress, [0, 0.72], [1, 0.14]);
  const atriumMiniOpacity = useTransform(atriumProgress, [0.76, 1], [0, 1]);

  return (
    <SmoothScrollProvider>
      <div ref={pageRef} className="relative bg-black text-white">
        {/* Global Branding Header */}
        <header className="fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-6 py-8 sm:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-[#C9A96E]" />
            <span className="font-[family:var(--font-display)] text-lg uppercase tracking-[0.4em] text-white">
              MALL <span className="text-[#C9A96E]">DESK</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 lg:flex">
            {["Experience", "Dining", "Events", "Connect"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] uppercase tracking-[0.4em] text-white/40 transition-colors hover:text-[#C9A96E]"
              >
                {link}
              </a>
            ))}
          </div>
        </header>

        <main className="relative overflow-hidden">
          <HeroSection
            sectionRef={heroRef}
            heroProgress={heroProgress}
            heroVideoScale={heroVideoScale}
            heroVideoX={heroVideoX}
            heroVideoY={heroVideoY}
            heroVideoRadius={heroVideoRadius}
            heroInfoY={heroInfoY}
            heroInfoOpacity={heroInfoOpacity}
            heroMiniOpacity={heroMiniOpacity}
          />

          <MacBookSection sectionRef={deviceRef} />

          <AtriumSection
            sectionRef={atriumRef}
            atriumScale={atriumScale}
            atriumX={atriumX}
            atriumY={atriumY}
            atriumRadius={atriumRadius}
            atriumTextY={atriumTextY}
            atriumTextOpacity={atriumTextOpacity}
            atriumMiniOpacity={atriumMiniOpacity}
          />

          <CorridorSection sectionRef={corridorRef} trackRef={corridorTrackRef} />

          <RobotSection sectionRef={robotRef} pinRef={robotPinRef} />

          <RetailShowcase />

          <DiningSection sectionRef={diningRef} pinRef={diningPinRef} />

          <DiningShowcase />

          <CultureSection />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
