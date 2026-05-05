"use client";

import { useEffect, useRef, useState } from "react";

const playbackChannels: {
  visible: HTMLVideoElement | null;
  hover: HTMLVideoElement | null;
} = {
  visible: null,
  hover: null,
};

function claimPlaybackChannel(
  channel: keyof typeof playbackChannels,
  video: HTMLVideoElement,
) {
  const current = playbackChannels[channel];

  if (current && current !== video) {
    current.pause();
  }

  playbackChannels[channel] = video;
}

function releasePlaybackChannel(
  channel: keyof typeof playbackChannels,
  video: HTMLVideoElement,
) {
  if (playbackChannels[channel] === video) {
    playbackChannels[channel] = null;
  }
}

type CinematicVideoProps = {
  src: string;
  label: string;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
  posterClassName?: string;
  playMode?: "hero" | "visible" | "hover";
};

export function CinematicVideo({
  src,
  label,
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
          } else {
            setIsVisible(false);
            if (
              entry.boundingClientRect.top > window.innerHeight * 1.5 ||
              entry.boundingClientRect.bottom < -window.innerHeight * 1.5
            ) {
              setShouldLoad(false);
              setIsReady(false);
            }
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
    if (!video) {
      return;
    }

    if (!shouldLoad) {
      video.pause();
      releasePlaybackChannel("visible", video);
      releasePlaybackChannel("hover", video);
      video.removeAttribute("src");
      video.load();
      return;
    }

    const shouldPlay =
      playMode === "hero"
        ? isVisible
        : playMode === "hover"
          ? canHover && isVisible && isHovered
          : isVisible;

    if (shouldPlay) {
      if (playMode === "visible") {
        claimPlaybackChannel("visible", video);
      }

      if (playMode === "hover") {
        claimPlaybackChannel("hover", video);
      }

      const playPromise = video.play();
      if (playPromise) {
        void playPromise.catch(() => {});
      }
    } else {
      video.pause();
      releasePlaybackChannel("visible", video);
      releasePlaybackChannel("hover", video);
    }

    return () => {
      video.pause();
      releasePlaybackChannel("visible", video);
      releasePlaybackChannel("hover", video);
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
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_30%),linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))] ${
          posterClassName ?? ""
        } ${isReady ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%,rgba(0,0,0,0.4))]" />
        <div className="absolute bottom-6 left-6 max-w-[60%] text-[10px] uppercase tracking-[0.34em] text-white/30">
          {label}
        </div>
      </div>

      {shouldLoad ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover [transform:translateZ(0)]"
          aria-label={label}
          autoPlay={playMode === "hero"}
          muted
          loop
          playsInline
          preload={playMode === "hero" ? "auto" : "metadata"}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          src={src}
          onCanPlay={() => setIsReady(true)}
        />
      ) : null}

      <div
        className={`absolute inset-0 ${
          overlayClassName ??
          "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]"
        }`}
      />

      {playMode === "hover" ? (
        <div className="pointer-events-none absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.34em] text-white/36">
          Hover To Play
        </div>
      ) : null}
    </div>
  );
}
