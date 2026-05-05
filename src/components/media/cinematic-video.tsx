"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CinematicVideoProps = {
  src: string;
  label: string;
  poster: string;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
  posterClassName?: string;
  playMode?: "hero" | "visible" | "hover";
};

export function CinematicVideo({
  src,
  label,
  poster,
  className,
  priority = false,
  overlayClassName,
  posterClassName,
  playMode = "visible",
}: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isVisible, setIsVisible] = useState(priority);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(priority);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setIsVisible(true);
            setHasEnteredViewport(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: priority ? "35% 0px" : "18% 0px",
        threshold: playMode === "hover" ? 0.1 : 0.45,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [playMode, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) {
      return;
    }

    const shouldPlay =
      playMode === "hero"
        ? isVisible
        : playMode === "hover"
          ? isVisible && (canHover ? isHovered : true)
          : isVisible;

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise) {
        void playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }

    return () => {
      video.pause();
    };
  }, [canHover, isHovered, isVisible, playMode, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Poster / placeholder — visible until video is ready */}
      <div
        className={`absolute inset-0 ${
          posterClassName ?? ""
        } ${isReady ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
      >
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        {/* Cinematic gradient placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.06),transparent_50%),linear-gradient(180deg,rgba(0,0,0,0.7)_0%,rgba(5,5,5,1)_60%,rgba(0,0,0,0.9)_100%)]" />

        {/* Subtle shimmer animation */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.5s ease-in-out infinite",
          }}
        />

        {/* Label */}
        <div className="absolute bottom-6 left-6 max-w-[60%] text-[10px] uppercase tracking-[0.34em] text-white/20">
          {label}
        </div>
      </div>

      {shouldLoad ? (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover [transform:translateZ(0)] transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
          aria-label={label}
          autoPlay={playMode === "hero"}
          muted
          loop
          playsInline
          poster={poster}
          preload={playMode === "hero" ? "auto" : "metadata"}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          src={src}
          onLoadedData={() => {
            console.log("Video loaded:", src);
            setIsReady(true);
          }}
          onCanPlay={() => setIsReady(true)}
          onError={(e) => {
            console.error("Video error:", src, e);
            setIsReady(false);
          }}
        />
      ) : null}

      <div
        className={`absolute inset-0 ${
          overlayClassName ??
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]"
        }`}
      />

      {playMode === "hover" && hasEnteredViewport ? (
        <div className="pointer-events-none absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.34em] text-white/36">
          {canHover ? "Hover To Play" : "Tap To Explore"}
        </div>
      ) : null}
    </div>
  );
}
