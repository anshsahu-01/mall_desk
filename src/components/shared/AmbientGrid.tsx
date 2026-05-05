"use client";

export function AmbientGrid({ opacity = "opacity-70" }: { opacity?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${opacity} [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]`}
    />
  );
}
