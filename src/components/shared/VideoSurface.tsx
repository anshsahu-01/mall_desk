"use client";

import type { VideoAsset } from "@/components/data/assets";
import { CinematicVideo } from "@/components/media/cinematic-video";

type VideoSurfaceProps = {
  asset: VideoAsset;
  className?: string;
  priority?: boolean;
  overlayClassName?: string;
  posterClassName?: string;
  playMode?: "hero" | "visible" | "hover";
};

export function VideoSurface({
  asset,
  className,
  priority = false,
  overlayClassName,
  posterClassName,
  playMode = "visible",
}: VideoSurfaceProps) {
  return (
    <CinematicVideo
      src={asset.src}
      label={asset.label}
      poster={asset.poster}
      className={className}
      priority={priority}
      overlayClassName={overlayClassName}
      posterClassName={posterClassName}
      playMode={playMode}
    />
  );
}
