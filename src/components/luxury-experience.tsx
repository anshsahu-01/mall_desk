"use client";
/* eslint-disable @next/next/no-img-element */

import { type ElementType, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
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

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

function AnimatedText({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const MotionComponent = useMemo(() => motion.create(Component), [Component]);
  return (
    <MotionComponent
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={["relative", className].filter(Boolean).join(" ")}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionComponent>
  );
}

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
            loading="lazy"
            decoding="async"
          />
          <div className={`absolute inset-0 ${BASE_MEDIA_OVERLAY}`} />
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
  const plateScale = useTransform(progress, [0, 0.4, 0.8, 1], [0.8, 1.02, 1.8, 2.4]);
  const plateY = useTransform(progress, [0, 1], ["8%", "-2%"]);
  const plateRotateX = useTransform(progress, [0, 0.4, 1], ["15deg", "8deg", "0deg"]);
  const plateRotateY = useTransform(progress, [0, 1], ["-2deg", "0deg"]);
  const plateOpacity = useTransform(progress, [0.6, 0.85, 1], [1, 0.4, 0]);
  const diningRevealScale = useTransform(progress, [0.3, 0.8, 1], [0.4, 1.05, 1.12]);
  const diningRevealOpacity = useTransform(progress, [0.3, 0.5, 1], [0, 1, 1]);
  const shadowOpacity = useTransform(progress, [0, 0.4, 0.8], [0.2, 0.8, 0]);
  const lightShift = useTransform(progress, [0, 1], ["30%", "60%"]);

  return (
    <div className="relative h-[82vh] w-full perspective-[1000px]">
      <motion.div
        className="absolute inset-0"
        style={{ scale: diningRevealScale, opacity: diningRevealOpacity }}
      >
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <motion.div animate={{ y: ["-0.5%", "0.5%"] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="absolute inset-0">
            <VideoSurface
              asset={restaurantVideo}
              playMode="visible"
              overlayClassName={BASE_MEDIA_OVERLAY}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient Table Shadow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[32rem] w-[34rem] -translate-x-1/2 -translate-y-[40%] rounded-full bg-black/60 blur-[60px]"
        style={{ opacity: shadowOpacity, scale: plateScale }}
      />

      {/* Master 3D Transform Group for Plate and Cutlery */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-0 w-0 transform-style-3d"
        style={{ scale: plateScale, y: plateY, opacity: plateOpacity, rotateX: plateRotateX, rotateY: plateRotateY }}
      >
        {/* Plate */}
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 transform-style-3d">
          {/* Outer Rim */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-white/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-8px_12px_rgba(0,0,0,0.2),0_40px_80px_rgba(0,0,0,0.6)]"
            style={{ background: useTransform(lightShift, v => `radial-gradient(circle at ${v} ${v}, #ffffff, #f0f0f0 40%, #cccccc 75%, #888888)`) }}
          >
            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          </motion.div>
          
          {/* Inner Curve */}
          <div className="absolute inset-[13%] rounded-full border border-black/10 shadow-[inset_0_8px_16px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.5)]">
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{ background: useTransform(lightShift, v => `radial-gradient(circle at ${v} ${v}, #fcfcfc, #e2e2e2 65%, #bbbbbb)`) }}
            />
          </div>

          {/* Center Well */}
          <div className="absolute inset-[31%] overflow-hidden rounded-full border border-black/15 shadow-[inset_0_12px_24px_rgba(0,0,0,0.15)]">
            <motion.div
              className="absolute inset-0"
              style={{ scale: diningRevealScale, opacity: diningRevealOpacity }}
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,213,163,0.95),rgba(255,127,80,0.42)_38%,rgba(0,0,0,0)_72%)]" />
            </motion.div>
          </div>
        </div>

        {/* Fork (Left side) */}
        <div className="absolute right-[16rem] top-1/2 h-[18rem] w-6 -translate-y-1/2 opacity-70">
          <svg viewBox="0 0 40 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="silver-fork" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#d8d8d8" />
                <stop offset="70%" stopColor="#8c8c8c" />
                <stop offset="100%" stopColor="#505050" />
              </linearGradient>
            </defs>
            <path d="M10,10 L10,60 C10,80 20,90 20,120 L20,280 C20,295 16,300 16,300 C16,300 24,300 24,300 C24,300 20,295 20,280 L20,120 C20,90 30,80 30,60 L30,10 C30,5 26,5 26,10 L26,50 C26,55 24,55 24,50 L24,10 C24,5 20,5 20,10 L20,50 C20,55 18,55 18,50 L18,10 C18,5 14,5 14,10 L14,50 C14,55 12,55 12,50 L12,10 C12,5 10,5 10,10 Z" fill="url(#silver-fork)"/>
          </svg>
        </div>

        {/* Knife (Right side, inner) */}
        <div className="absolute left-[16rem] top-1/2 h-[18rem] w-4 -translate-y-1/2 opacity-70">
          <svg viewBox="0 0 30 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="silver-knife" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e0e0e0" />
                <stop offset="80%" stopColor="#999999" />
                <stop offset="100%" stopColor="#444444" />
              </linearGradient>
            </defs>
            <path d="M15,120 L15,280 C15,295 12,300 12,300 C12,300 18,300 18,300 C18,300 15,295 15,280 L15,120 C15,90 25,70 25,20 C25,5 20,0 15,0 C15,0 15,80 15,120 Z" fill="url(#silver-knife)"/>
          </svg>
        </div>

        {/* Spoon (Right side, outer) */}
        <div className="absolute left-[18rem] top-1/2 h-[18rem] w-6 -translate-y-1/2 opacity-70">
          <svg viewBox="0 0 40 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id="silver-spoon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#d0d0d0" />
                <stop offset="75%" stopColor="#7a7a7a" />
                <stop offset="100%" stopColor="#3a3a3a" />
              </linearGradient>
              <linearGradient id="silver-spoon-bowl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a0a0a0" />
                <stop offset="50%" stopColor="#e0e0e0" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path d="M20,120 L20,280 C20,295 16,300 16,300 C16,300 24,300 24,300 C24,300 20,295 20,280 L20,120 C20,90 26,80 26,60 C26,20 34,0 20,0 C6,0 14,20 14,60 C14,80 20,90 20,120 Z" fill="url(#silver-spoon)"/>
            <ellipse cx="20" cy="35" rx="9" ry="25" fill="url(#silver-spoon-bowl)" opacity="0.9" />
          </svg>
        </div>
      </motion.div>
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
  const deviceSectionRef = useRef<HTMLElement>(null);

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

  const { scrollYProgress: deviceSectionProgress } = useScroll({
    target: deviceSectionRef,
    offset: ["start end", "end start"],
  });
  const deviceImageY = useTransform(deviceSectionProgress, [0, 1], ["-4%", "4%"]);

  const robotProgress = useMotionValue(0);
  const robotBgScale = useTransform(robotProgress, [0, 1], [1.08, 1]);
  const electronicsPortalScale = useTransform(robotProgress, [0.15, 0.45, 1], [0.12, 1.04, 1.04]);
  const electronicsPortalOpacity = useTransform(robotProgress, [0.1, 0.2, 0.45, 1], [0, 0.95, 1, 1]);
  const electronicsPortalRadius = useTransform(robotProgress, [0.15, 0.45, 1], ["999px", "2rem", "2rem"]);
  const electronicsPortalY = useTransform(robotProgress, [0.15, 0.45, 1], ["-10vh", "0vh", "0vh"]);

  const diningProgress = useMotionValue(0);
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

        const horizontalTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: track,
            pin: corridorRef.current,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pinSpacing: true,
            scrub: 2,
          anticipatePin: 1,
            invalidateOnRefresh: true,
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
              ease: "power3.inOut",
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
          scrub: 2,
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
          scrub: 2,
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
      <div ref={pageRef} className="relative bg-black text-white">
        <main className="relative overflow-hidden">
          <section ref={heroRef} className="relative min-h-[170vh]">
            <div className="relative sticky top-0 h-screen overflow-hidden">
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
                  overlayClassName={`bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_24%)] ${BASE_MEDIA_OVERLAY}`}
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
                  <div className="space-y-8 lg:col-span-2">
  <AnimatedText as="h1" className="max-w-4xl font-[family:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.3] tracking-wide text-white drop-shadow-md">
    It doesn’t feel like entering a mall.<br/><span className="text-white/74">It feels like stepping into a world that was waiting for you.</span>
  </AnimatedText>
</div>

                  <div className="space-y-10 lg:justify-self-end">

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

          <section ref={deviceSectionRef} className="relative z-10 px-4 py-16 sm:px-8 lg:px-12 [content-visibility:auto] [contain-intrinsic-size:920px]">
            <AmbientGrid opacity="opacity-40" />
            <div className="mx-auto grid max-w-[1800px] items-center gap-8 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="relative min-h-[62vh] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#050505] shadow-[0_28px_80px_rgba(0,0,0,0.46)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,transparent_80%,rgba(255,255,255,0.08))]" />
                <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 xl:p-16">
                  <motion.img
                    src="/assets/macbookimage.jpg"
                    alt="Mall experience display"
                    className="relative h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] [will-change:transform]"
                    initial={{ opacity: 0, scale: 0.95, y: 18 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      y: deviceImageY,
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={`absolute inset-0 ${BASE_MEDIA_OVERLAY}`} />
              </div>

              <div className="relative flex h-full items-center px-4 py-8 sm:px-8 lg:px-10">
                <AnimatedText as="h2" className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.4] tracking-wide text-white drop-shadow-sm">
                  There are no breaks here. No pauses.<br /><span className="mt-2 block text-white/72">Just a space that moves with you.</span>
                </AnimatedText>
              </div>
            </div>
          </section>

          <section ref={atriumRef} className="relative min-h-[152vh]">
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
                <div className="pb-14 flex items-center h-full">
  <AnimatedText as="h2" className="font-[family:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.4] tracking-wide text-white/92">
    A world in motion.
  </AnimatedText>
</div>
              </motion.div>
            </div>
          </section>

          <section ref={corridorRef} className="relative h-screen">
            <div className="relative flex h-screen items-center overflow-hidden">
              <AmbientGrid />
              <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="absolute left-0 top-6 z-10 w-full px-6 sm:px-10 lg:px-16">
                <div className="mx-auto flex w-full max-w-[1800px] items-end justify-between gap-8">
                  <div className="space-y-4"></div>
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
  <AnimatedText as="h2" className="font-[family:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.4] tracking-wide text-white/92">
    Every path unfolds.
  </AnimatedText>
</div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section ref={robotRef} className="relative">
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
  <AnimatedText as="h2" className="font-[family:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.4] tracking-wide text-white/92">
    Perspective changes.
  </AnimatedText>
</div>

                <RobotFigure progress={robotProgress} />
              </div>
            </div>
          </section>

          <section className="relative px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
            <AmbientGrid opacity="opacity-35" />
            <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
                <VideoSurface asset={appleStoreVideo} playMode="visible" />
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
  <AnimatedText as="h3" className="mt-auto max-w-2xl font-[family:var(--font-display)] text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.4] tracking-wide text-white/95">
    Light. Glass. Precision.
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

          <section ref={diningRef} className="relative">
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
                className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.46)] [will-change:transform,opacity]"
                style={{
                  scale: diningWorldScale,
                  opacity: diningWorldOpacity,
                  borderRadius: diningWorldRadius,
                  y: diningWorldY,
                }}
              >
                <VideoSurface asset={restaurantVideo} playMode="visible" overlayClassName={BASE_MEDIA_OVERLAY} />
              </motion.div>

              <div className="relative z-10 mx-auto grid h-full w-full max-w-[1800px] items-center gap-8 px-6 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-16">
                <PlateScene progress={diningProgress} />
                <div className="space-y-6 flex h-full items-center">
                  <AnimatedText as="h2" className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.4] tracking-wide text-white">
  The world slows down.<br/><span className="text-white/74 block mt-2">You’re arriving.</span>
</AnimatedText>
                </div>
              </div>
            </div>
          </section>

          <section className="relative px-6 py-18 sm:px-10 lg:px-16 lg:py-22 [content-visibility:auto] [contain-intrinsic-size:980px]">
            <AmbientGrid opacity="opacity-35" />
            <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <article className="relative min-h-[72vh] overflow-hidden rounded-[2.5rem] border border-white/10">
                <VideoSurface asset={restaurantPlatingVideo} playMode="visible" />
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <div className="flex h-full items-center">
                    <AnimatedText as="h3" className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.4] tracking-wide text-white">
  Light softens. Conversations fade in.<br/><span className="text-white/74 block mt-2">The space shifts to experience.</span>
</AnimatedText>
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
                    
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="relative px-6 py-22 sm:px-10 lg:px-16 lg:py-28 [content-visibility:auto] [contain-intrinsic-size:760px]">
            <AmbientGrid opacity="opacity-30" />
            <div className="mx-auto max-w-[1800px] space-y-12">
              <div className="space-y-5">
                <AnimatedText as="h2" className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-normal leading-[1.4] tracking-wide text-white">
  Everything connects.<br/><span className="text-white/74 block mt-2">A place that never feels empty.</span>
</AnimatedText>
              </div>
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
