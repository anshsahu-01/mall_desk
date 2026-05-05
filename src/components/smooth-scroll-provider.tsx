"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1,
      smoothWheel: true,
      lerp: 0.08,
      touchMultiplier: 1.02,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.defaults({ anticipatePin: 1 });
    
    const resizeHandler = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", resizeHandler);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Delay refresh to allow child components to register their ScrollTriggers
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.removeEventListener("refresh", resizeHandler);
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
