"use client";
/* eslint-disable @next/next/no-img-element */

import type { VideoAsset, ImageAsset } from "@/components/data/assets";
import { VideoSurface } from "./VideoSurface";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

export function MediaCard({
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
