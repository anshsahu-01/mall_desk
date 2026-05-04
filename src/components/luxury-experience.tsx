"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  MotionValue,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CinematicVideo } from "@/components/media/cinematic-video";
import { CinematicPreloader } from "@/components/ui/cinematic-preloader";
import { AmbientStrokes } from "@/components/ui/ambient-strokes";

const MacbookShowroom = dynamic(
  () =>
    import("@/components/three/macbook-showroom").then(
      (module) => module.MacbookShowroom,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,#080808,#030303)]" />
    ),
  },
);

type VideoAsset = {
  src: string;
  label: string;
};

type ImageAsset = {
  src: string;
  alt: string;
};

const heroVideo: VideoAsset = {
  src: "/assets/homevideo.mp4",
  label: "Luxury mall overview",
};

const mallOverviewVideo: VideoAsset = {
  src: "/assets/mallouterview.mp4",
  label: "Mall overview",
};

const atriumVideo: VideoAsset = {
  src: "/assets/atrium.mp4",
  label: "Atrium interior",
};

const escalatorsVideo: VideoAsset = {
  src: "/assets/escalators.mp4",
  label: "Escalator transition",
};

const walkVideo: VideoAsset = {
  src: "/assets/walkinluxurymall.mp4",
  label: "Walk through luxury mall",
};

const electronicsVideo: VideoAsset = {
  src: "/assets/electronicsshop.mp4",
  label: "Electronics showroom",
};

const appleStoreVideo: VideoAsset = {
  src: "/assets/applestore.mp4",
  label: "Flagship electronics retail",
};

const restaurantVideo: VideoAsset = {
  src: "/assets/restaurantvideo.mp4",
  label: "Restaurant destination",
};

const fashionStoreVideo: VideoAsset = {
  src: "/assets/fashionstore.mp4",
  label: "Fashion store",
};

const flagshipStoreVideo: VideoAsset = {
  src: "/assets/flagshipstore.mp4",
  label: "Flagship store",
};

const retailStoresVideo: VideoAsset = {
  src: "/assets/retailstores.mp4",
  label: "Retail stores",
};

const luxuryFoodVideo: VideoAsset = {
  src: "/assets/luxuryfood.mp4",
  label: "Luxury dining",
};

const restaurantPlatingVideo: VideoAsset = {
  src: "/assets/restaurantplating.mp4",
  label: "Restaurant plating",
};

const foodMacroVideo: VideoAsset = {
  src: "/assets/foodmacro.mp4",
  label: "Food macro",
};

const burgerCloseupVideo: VideoAsset = {
  src: "/assets/burgercloseup.mp4",
  label: "Burger closeup",
};

const concertCrowdVideo: VideoAsset = {
  src: "/assets/concertcrowd.mp4",
  label: "Concert crowd",
};

const corridorMedia: Array<VideoAsset | ImageAsset> = [
  fashionStoreVideo,
  flagshipStoreVideo,
  retailStoresVideo,
  appleStoreVideo,
];

const floatingWords = [
  "Destination",
  "Atrium",
  "Luxury",
  "Retail",
  "Culture",
  "Nightlife",
];

const fallingWords = [
  "Fashion",
  "Events",
  "Dining",
  "Movement",
  "Crowds",
  "Cinema",
];

const corridorPanels = [
  {
    index: "01",
    title: "Storefronts stretch like architectural sets",
    body: "Scale, reflection, and moving crowds establish the mall as an immersive public world.",
  },
  {
    index: "02",
    title: "Electronics arrive as a premium media district",
    body: "Digital display, glass, and object theatre turn retail technology into spectacle.",
  },
  {
    index: "03",
    title: "Hospitality carries the destination into the night",
    body: "Dining, lounges, and rooftop atmospheres extend the mall beyond commerce.",
  },
  {
    index: "04",
    title: "Events keep the ecosystem culturally alive",
    body: "Each floor behaves like part of a luxury entertainment platform rather than a simple shopping venue.",
  },
];

function VideoSurface({
  asset,
  className,
  priority = false,
  overlayClassName,
  posterClassName,
  playMode = "visible",
}: {
  asset: VideoAsset;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
  posterClassName?: string;
  playMode?: "hero" | "visible" | "hover";
}) {
  return (
    <CinematicVideo
      src={asset.src}
      label={asset.label}
      className={className}
      priority={priority}
      overlayClassName={overlayClassName}
      posterClassName={posterClassName}
      playMode={playMode}
    />
  );
}

function MediaCard({
  media,
  className,
}: {
  media: VideoAsset | ImageAsset;
  className?: string;
}) {
  const isVideo = "label" in media;

  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      {isVideo ? (
        <VideoSurface asset={media} playMode="hover" />
      ) : (
        <>
          <img
            src={media.src}
            alt={media.alt}
            className="h-full w-full object-cover grayscale [transform:translateZ(0)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.82))]" />
        </>
      )}
    </div>
  );
}

function preloadCriticalVideos(
  sources: string[],
  onProgress: (value: number) => void,
) {
  let completed = 0;
  const total = sources.length;
  const videos: HTMLVideoElement[] = [];
  const cleanups: Array<() => void> = [];

  const markDone = () => {
    completed += 1;
    onProgress(Math.min(100, Math.round((completed / total) * 100)));
  };

  const promises = sources.map(
    (src) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        videos.push(video);
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.src = src;

        const finish = () => {
          markDone();
          resolve();
        };

        const onReady = () => {
          cleanup();
          finish();
        };

        const onError = () => {
          cleanup();
          finish();
        };

        const timeout = window.setTimeout(() => {
          cleanup();
          finish();
        }, 3000);

        const cleanup = () => {
          window.clearTimeout(timeout);
          video.removeEventListener("canplaythrough", onReady);
          video.removeEventListener("loadeddata", onReady);
          video.removeEventListener("error", onError);
        };

        cleanups.push(cleanup);
        video.addEventListener("loadeddata", onReady, { once: true });
        video.addEventListener("error", onError, { once: true });
        video.load();
      }),
  );

  return {
    promise: Promise.all(promises),
    dispose: () => {
      cleanups.forEach((cleanup) => cleanup());
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
    },
  };
}

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

function AmbientGrid({ opacity = "opacity-70" }: { opacity?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${opacity} [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]`}
    />
  );
}

function ImpactMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/32 p-5 backdrop-blur-md">
      <p className="mb-2 font-[family:var(--font-display)] text-4xl leading-none tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">{label}</p>
    </div>
  );
}

function RobotFigure({ progress }: { progress: MotionValue<number> }) {
  const headY = useTransform(progress, [0, 0.28, 1], ["16%", "4%", "-4%"]);
  const headRotate = useTransform(progress, [0, 0.5, 1], [-8, -1, 3]);
  const winkScale = useTransform(progress, [0.34, 0.46, 0.56], [1, 0.06, 1]);
  const eyeGlow = useTransform(progress, [0.22, 0.48, 0.9], [0.35, 1, 0.5]);
  const eyePortalScale = useTransform(progress, [0.42, 0.78], [0.24, 1.28]);
  const eyePortalOpacity = useTransform(progress, [0.36, 0.5, 1], [0, 0.95, 1]);

  return (
    <div className="relative h-[76vh] w-full">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70vh] w-[27rem] -translate-x-1/2 -translate-y-1/2"
        style={{ y: headY, rotate: headRotate }}
      >
        <div className="absolute inset-x-[14%] top-0 h-[30%] rounded-[38%] border border-white/14 bg-[linear-gradient(180deg,#dde0e5,#8b919c_56%,#2e333a)] shadow-[0_35px_80px_rgba(0,0,0,0.4)]" />
        <div className="absolute inset-x-[23%] top-[8%] h-[11%] rounded-[999px] bg-black/88 shadow-[0_0_60px_rgba(255,255,255,0.08)]" />
        <div className="absolute left-1/2 top-[12%] h-20 w-20 -translate-x-1/2 -translate-y-[18%] overflow-hidden rounded-full border border-white/30 bg-black shadow-[0_0_80px_rgba(255,255,255,0.12)]">
          <motion.div
            className="absolute inset-0"
            style={{ scale: eyePortalScale, opacity: eyePortalOpacity }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(160,214,255,0.95),rgba(82,122,255,0.48)_36%,rgba(0,0,0,0)_72%)]" />
          </motion.div>
        </div>
        <motion.div
          className="absolute left-1/2 top-[12%] h-5 w-20 -translate-x-1/2 rounded-full bg-white/95 shadow-[0_0_40px_rgba(255,255,255,0.72)]"
          style={{ scaleY: winkScale, opacity: eyeGlow }}
        />
        <div className="absolute left-[22%] top-[32%] h-[30%] w-[56%] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(0,0,0,0.16))]" />
        <div className="absolute left-[28%] top-[38%] h-[6%] w-[44%] rounded-full bg-black/70" />
        <div className="absolute left-[18%] top-[30%] h-[44%] w-[11%] rounded-full bg-[linear-gradient(180deg,#a7abb3,#383d45)]" />
        <div className="absolute right-[18%] top-[30%] h-[44%] w-[11%] rounded-full bg-[linear-gradient(180deg,#a7abb3,#383d45)]" />
        <div className="absolute left-[26%] bottom-0 h-[36%] w-[18%] rounded-[2rem] bg-[linear-gradient(180deg,#8d939d,#2b2f35)]" />
        <div className="absolute right-[26%] bottom-0 h-[36%] w-[18%] rounded-[2rem] bg-[linear-gradient(180deg,#8d939d,#2b2f35)]" />
      </motion.div>
    </div>
  );
}

function PlateScene({ progress }: { progress: MotionValue<number> }) {
  const plateScale = useTransform(progress, [0, 0.4, 0.8, 1], [0.86, 1.05, 1.8, 2.4]);
  const plateY = useTransform(progress, [0, 1], ["12%", "-2%"]);
  const plateOpacity = useTransform(progress, [0.6, 0.85, 1], [1, 0.4, 0]);
  const diningRevealScale = useTransform(progress, [0.3, 0.8, 1], [0.4, 1.05, 1.12]);
  const diningRevealOpacity = useTransform(progress, [0.3, 0.5, 1], [0, 1, 1]);

  return (
    <div className="relative h-[82vh] w-full">
      <motion.div
        className="absolute inset-0"
        style={{ scale: diningRevealScale, opacity: diningRevealOpacity }}
      >
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <VideoSurface
            asset={restaurantVideo}
            playMode="visible"
            overlayClassName="bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.24))]"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2"
        style={{ scale: plateScale, y: plateY, opacity: plateOpacity }}
      >
        <div className="absolute inset-0 rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_30%,#ffffff,#dddddd_55%,#bcbcbc_78%,#969696)] shadow-[0_50px_110px_rgba(0,0,0,0.45)]" />
        <div className="absolute inset-[13%] rounded-full border border-black/6 bg-[radial-gradient(circle_at_35%_35%,#fafafa,#e8e8e8_72%,#cbcbcb)]" />
        <div className="absolute inset-[31%] overflow-hidden rounded-full border border-black/8">
          <motion.div
            className="absolute inset-0"
            style={{ scale: diningRevealScale, opacity: diningRevealOpacity }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,213,163,0.95),rgba(255,127,80,0.42)_38%,rgba(0,0,0,0)_72%)]" />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute left-[18%] top-1/2 h-[22rem] w-8 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#f3f3f3,#b7b7b7)] shadow-[0_24px_40px_rgba(0,0,0,0.2)]" />
      <div className="absolute left-[17.6%] top-[23%] flex gap-[5px]">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className="h-16 w-[4px] rounded-full bg-white/92" />
        ))}
      </div>
      <div className="absolute right-[18%] top-1/2 h-[22rem] w-3 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#f3f3f3,#bababa)] shadow-[0_24px_40px_rgba(0,0,0,0.2)]" />
      <div className="absolute right-[17.1%] top-[22%] h-24 w-14 rounded-t-full rounded-b-[1.2rem] border border-white/25 bg-[linear-gradient(180deg,#f5f5f5,#d1d1d1)]" />
    </div>
  );
}

function DeferredRender({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "20% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isActive ? children : null}
    </div>
  );
}

export function LuxuryExperience() {
  const [isReady, setIsReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const criticalSources = useMemo(() => [heroVideo.src], []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const preload = preloadCriticalVideos(criticalSources, setPreloadProgress);
    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 700);
    });

    void Promise.all([preload.promise, minDelay]).then(() => {
      setPreloadProgress(100);
      setIsReady(true);
      document.body.style.overflow = "";
      window.setTimeout(() => {
        setShowPreloader(false);
      }, 420);
    });

    return () => {
      preload.dispose();
      document.body.style.overflow = "";
    };
  }, [criticalSources]);

  return (
    <>
      {isReady ? <LuxuryExperienceScene /> : null}
      {showPreloader ? (
        <CinematicPreloader progress={preloadProgress} isDone={isReady} />
      ) : null}
    </>
  );
}

function LuxuryExperienceScene() {
  const pageRef = useRef<HTMLDivElement>(null);
  const corridorRef = useRef<HTMLElement>(null);
  const corridorTrackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const atriumRef = useRef<HTMLElement>(null);
  const robotRef = useRef<HTMLElement>(null);
  const robotPinRef = useRef<HTMLDivElement>(null);
  const diningRef = useRef<HTMLElement>(null);
  const diningPinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

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
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.34, 0.78]);
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

  const robotProgress = useMotionValue(0);
  const robotTextOpacity = useTransform(robotProgress, [0, 0.3, 0.68], [0.3, 1, 0.12]);
  const robotBgScale = useTransform(robotProgress, [0, 1], [1.08, 1]);
  const electronicsPortalScale = useTransform(robotProgress, [0.15, 0.45, 1], [0.12, 1.04, 1.04]);
  const electronicsPortalOpacity = useTransform(robotProgress, [0.1, 0.2, 0.45, 1], [0, 0.95, 1, 1]);
  const electronicsPortalRadius = useTransform(robotProgress, [0.15, 0.45, 1], ["999px", "2rem", "2rem"]);
  const electronicsPortalY = useTransform(robotProgress, [0.15, 0.45, 1], ["-10vh", "0vh", "0vh"]);

  const diningProgress = useMotionValue(0);
  const diningTextOpacity = useTransform(diningProgress, [0, 0.28, 0.68], [0.3, 1, 0.1]);
  const diningBgScale = useTransform(diningProgress, [0, 1], [1.1, 1]);
  const diningWorldScale = useTransform(diningProgress, [0.15, 0.45, 1], [0.14, 1.04, 1.04]);
  const diningWorldOpacity = useTransform(diningProgress, [0.1, 0.2, 0.45, 1], [0, 0.95, 1, 1]);
  const diningWorldRadius = useTransform(diningProgress, [0.15, 0.45, 1], ["999px", "2rem", "2rem"]);
  const diningWorldY = useTransform(diningProgress, [0.15, 0.45, 1], ["12vh", "0vh", "0vh"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      if (corridorRef.current && corridorTrackRef.current) {
        const track = corridorTrackRef.current;
        const panels = gsap.utils.toArray<HTMLElement>("[data-corridor-panel]");
        
        console.log("track width:", track.scrollWidth);
        console.log("viewport width:", window.innerWidth);

        const horizontalTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: track,
            pin: corridorRef.current,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: true,
          },
        });

        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0.42, y: 56, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 85%",
                end: "center center",
                scrub: 1,
              },
            },
          );
        });
      }

      if (robotRef.current && robotPinRef.current) {
        ScrollTrigger.create({
          trigger: robotRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: robotPinRef.current,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            robotProgress.set(self.progress);
          },
        });
      }

      if (diningRef.current && diningPinRef.current) {
        ScrollTrigger.create({
          trigger: diningRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: diningPinRef.current,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            diningProgress.set(self.progress);
          },
        });
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, pageRef);

    return () => {
      ctx.revert();
    };
    // `useMotionValue` returns stable instances; this setup should only run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SmoothScrollProvider>
      <div ref={pageRef} className="bg-black text-white">
        <main className="relative overflow-hidden">
          <section ref={heroRef} className="relative min-h-[170vh] border-b border-white/10">
            <div className="sticky top-0 h-screen overflow-hidden">
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
                  overlayClassName="bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.08),transparent_34%,rgba(0,0,0,0.82))]"
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
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.42em] text-white/55 sm:text-xs">
                  <span>Mall Desk</span>
                  <span>Luxury Mall Ecosystem</span>
                </div>

                <div className="grid items-end gap-14 pb-14 pt-24 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-8">
                    <p className="max-w-md text-[11px] uppercase tracking-[0.38em] text-white/50 sm:text-xs">
                      Architecture. Entertainment. Destination culture. Premium circulation.
                    </p>
                    <h1 className="max-w-6xl font-[family:var(--font-display)] text-[clamp(4.8rem,16vw,13rem)] leading-[0.83] tracking-[-0.06em] text-white">
                      A mall
                      <br />
                      staged like
                      <br />
                      a film.
                    </h1>
                  </div>

                  <div className="space-y-10 lg:justify-self-end">
                    <p className="max-w-md text-sm leading-7 text-white/72 sm:text-base">
                      The hero remains dominant on entry, then shrinks into a
                      floating cinematic window so the rest of the ecosystem can
                      evolve around it without losing momentum.
                    </p>

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

          <section className="relative z-10 border-b border-white/10 px-4 py-16 sm:px-8 lg:px-12 [content-visibility:auto] [contain-intrinsic-size:920px]">
            <AmbientGrid opacity="opacity-40" />
            <div className="mx-auto grid max-w-[1800px] items-center gap-8 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="relative min-h-[62vh] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#050505] shadow-[0_28px_80px_rgba(0,0,0,0.46)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,transparent_80%,rgba(255,255,255,0.08))]" />
                <DeferredRender className="absolute inset-0">
                  <MacbookShowroom progress={scrollYProgress} />
                </DeferredRender>
              </div>

              <div className="relative space-y-10 px-4 py-8 sm:px-8 lg:px-10">
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                    Technology Pavilion
                  </p>
                  <h2 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.04em]">
                    The opening object becomes one district in a larger world.
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-8 text-white/66">
                  The premium product reveal is now just one curated showroom
                  inside a destination driven by architecture, media, crowds, and
                  cultural programming.
                </p>
              </div>
            </div>
          </section>

          <section ref={atriumRef} className="relative min-h-[152vh] border-b border-white/10">
            <div className="sticky top-0 h-screen overflow-hidden">
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
                  overlayClassName="bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.78))]"
                />
              </motion.div>

              <AmbientGrid />
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
                className="relative mx-auto flex h-full w-full max-w-[1800px] flex-col justify-between px-6 py-10 sm:px-10 lg:px-16"
                style={{ y: atriumTextY, opacity: atriumTextOpacity }}
              >
                <div className="text-[10px] uppercase tracking-[0.38em] text-white/42 sm:text-xs">
                  Atrium Sequence
                </div>
                <div className="max-w-5xl space-y-6 pb-14">
                  <h2 className="font-[family:var(--font-display)] text-[clamp(3.4rem,9vw,8.6rem)] leading-[0.88] tracking-[-0.05em]">
                    Giant interior volume.
                    <br />
                    Escalators. Crowds.
                    <br />
                    A public stage.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                    The second transformation alternates to the opposite side so
                    the page feels composed rather than repetitive.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section ref={corridorRef} className="relative h-screen border-b border-white/10">
            <div className="relative flex h-screen items-center overflow-hidden">
              <AmbientGrid />
              <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="absolute left-0 top-6 z-10 w-full px-6 sm:px-10 lg:px-16">
                <div className="mx-auto flex w-full max-w-[1800px] items-end justify-between gap-8">
                  <div className="space-y-4">
                    <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                      Luxury Corridors
                    </p>
                    <h2 className="max-w-5xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.05em]">
                      Media-rich corridors centered inside the viewport before they move.
                    </h2>
                  </div>
                </div>
              </div>

              <div
                ref={corridorTrackRef}
                className="flex h-full w-max min-w-[320vw] items-center gap-6 px-6 sm:px-10 lg:px-16"
              >
                {corridorPanels.map((panel, index) => (
                  <article
                    key={panel.index}
                    data-corridor-panel
                    className="relative flex h-[62vh] w-[88vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] p-8 sm:w-[68vw] lg:w-[58vw] lg:p-12"
                  >
                    <MediaCard media={corridorMedia[index % corridorMedia.length]} />
                    <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/42">
                      <span>{panel.index}</span>
                      <span>Scene Shift</span>
                    </div>
                    <div className="relative space-y-4">
                      <h3 className="max-w-4xl font-[family:var(--font-display)] text-[clamp(2.6rem,5vw,5.6rem)] leading-[0.92] tracking-[-0.05em]">
                        {panel.title}
                      </h3>
                      <p className="max-w-xl text-base leading-7 text-white/62">
                        {panel.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section ref={robotRef} className="relative border-b border-white/10">
            <div
              ref={robotPinRef}
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
                className="absolute left-1/2 top-1/2 z-0 h-[82vh] w-[82vh] max-h-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/12 bg-black/80 shadow-[0_24px_72px_rgba(0,0,0,0.42)]"
                style={{
                  scale: electronicsPortalScale,
                  opacity: electronicsPortalOpacity,
                  borderRadius: electronicsPortalRadius,
                  y: electronicsPortalY,
                }}
              >
                <VideoSurface asset={electronicsVideo} playMode="visible" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.74))]" />
              </motion.div>

              <div className="relative z-10 mx-auto grid h-full w-full max-w-[1800px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
                <div className="space-y-6">
                  <motion.p
                    className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs"
                    style={{ opacity: robotTextOpacity }}
                  >
                    Electronics Transition
                  </motion.p>
                  <motion.h2
                    className="max-w-3xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]"
                    style={{ opacity: robotTextOpacity }}
                  >
                    The robot winks, and the electronics world expands from the eye itself.
                  </motion.h2>
                  <motion.p
                    className="max-w-xl text-base leading-8 text-white/64"
                    style={{ opacity: robotTextOpacity }}
                  >
                    The portal is no longer a decorative beat. Scroll now drives a
                    true spatial transition from robotic host to full retail media chamber.
                  </motion.p>
                </div>

                <RobotFigure progress={robotProgress} />
              </div>
            </div>
          </section>

          <section className="relative border-b border-white/10 px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
            <AmbientGrid opacity="opacity-35" />
            <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
                <VideoSurface asset={appleStoreVideo} playMode="visible" />
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/42">
                    Electronics District
                  </p>
                  <div className="space-y-5">
                    <h3 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">
                      Screens, reflective objects, and luxury tech staged as spectacle.
                    </h3>
                    <p className="max-w-xl text-base leading-8 text-white/66">
                      After the eye portal opens, the district holds together as a
                      complete visual environment instead of a disconnected follow-up block.
                    </p>
                  </div>
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
                    <p className="max-w-md text-lg leading-8 text-white/68">
                      Luxury watches, concept audio, designer accessories, and premium interfaces sit inside one seamless electronics universe.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section ref={diningRef} className="relative border-b border-white/10">
            <div
              ref={diningPinRef}
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
                className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.46)]"
                style={{
                  scale: diningWorldScale,
                  opacity: diningWorldOpacity,
                  borderRadius: diningWorldRadius,
                  y: diningWorldY,
                }}
              >
                <VideoSurface asset={restaurantVideo} playMode="visible" />
              </motion.div>

              <div className="relative z-10 mx-auto grid h-full w-full max-w-[1800px] items-center gap-8 px-6 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-16">
                <PlateScene progress={diningProgress} />
                <div className="space-y-6">
                  <motion.p
                    className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs"
                    style={{ opacity: diningTextOpacity }}
                  >
                    Dining Transition
                  </motion.p>
                  <motion.h2
                    className="max-w-3xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em]"
                    style={{ opacity: diningTextOpacity }}
                  >
                    The plate fills the frame, then opens directly into the restaurant world.
                  </motion.h2>
                  <motion.p
                    className="max-w-xl text-base leading-8 text-white/64"
                    style={{ opacity: diningTextOpacity }}
                  >
                    The zoom is now physically connected: tabletop detail gives way
                    to hospitality atmosphere without falling back to a normal section break.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative border-b border-white/10 px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
            <AmbientGrid opacity="opacity-35" />
            <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
                <VideoSurface asset={restaurantPlatingVideo} playMode="visible" />
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/42">
                    Dining + Nightlife
                  </p>
                  <div className="space-y-5">
                    <h3 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">
                      Restaurants turn the mall into an after-dark destination.
                    </h3>
                    <p className="max-w-xl text-base leading-8 text-white/66">
                      Rooftop dining, bars, and cinematic hospitality visuals keep
                      the destination emotionally warm after the retail sequences.
                    </p>
                  </div>
                </div>
              </article>

              <div className="grid gap-8">
                <article className="relative min-h-[32vh] overflow-hidden rounded-[2.2rem] border border-white/10">
                  <VideoSurface asset={burgerCloseupVideo} playMode="hover" />
                </article>
                <article className="relative min-h-[36vh] overflow-hidden rounded-[2.2rem] border border-white/10">
                  <VideoSurface asset={foodMacroVideo} playMode="hover" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/40">
                      Hospitality Layer
                    </p>
                    <p className="max-w-md text-lg leading-8 text-white/68">
                      The dining chapter now feels like an extension of the zoom transition instead of a separate page segment.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="relative px-6 py-22 sm:px-10 lg:px-16 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:760px]">
            <AmbientGrid opacity="opacity-30" />
            <div className="mx-auto max-w-[1800px] space-y-12">
              <div className="space-y-5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                  Destination Finale
                </p>
                <h2 className="max-w-6xl font-[family:var(--font-display)] text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.05em]">
                  One cinematic luxury mall universe,
                  <br />
                  evolving without dead air.
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
                The journey now holds together as a single moving world: smoother
                hero performance, transformed media windows, centered corridors,
                real portal transitions, and continuous environmental motion between scenes.
              </p>
              <div className="relative min-h-[46vh] overflow-hidden rounded-[2.6rem] border border-white/10">
                <VideoSurface asset={concertCrowdVideo} playMode="visible" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
