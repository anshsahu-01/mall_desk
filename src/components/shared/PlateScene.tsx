"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import { VideoSurface } from "@/components/shared/VideoSurface";
import { restaurantVideo } from "@/components/data/assets";

const BASE_MEDIA_OVERLAY =
  "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.2))]";

export function PlateScene({ progress }: { progress: MotionValue<number> }) {
  const plateScale = useTransform(progress, [0, 0.12, 0.35, 0.68, 0.9, 1], [0.82, 0.94, 1, 1.22, 1.85, 2.1]);
  const plateY = useTransform(progress, [0, 0.4, 0.7, 1], ["18%", "8%", "-2%", "-12%"]);
  const plateRotateX = useTransform(progress, [0, 0.4, 1], ["12deg", "7deg", "0deg"]);
  const plateRotateY = useTransform(progress, [0, 1], ["-1.5deg", "0deg"]);
  const plateOpacity = useTransform(progress, [0, 0.12, 0.75, 0.92, 1], [0, 1, 1, 0.75, 0]);
  const diningRevealScale = useTransform(progress, [0, 0.32, 0.68, 1], [0.76, 0.84, 1.02, 1.06]);
  const diningRevealOpacity = useTransform(progress, [0, 0.28, 0.55, 1], [0, 0.18, 0.95, 1]);
  const shadowOpacity = useTransform(progress, [0, 0.15, 0.34, 0.82, 1], [0, 0.28, 0.9, 0.14, 0]);
  const lightShift = useTransform(progress, [0, 1], ["34%", "58%"]);

  return (
    <div className="relative h-[82vh] w-full perspective-[1000px]">
      <motion.div
        className="absolute inset-0"
        style={{ scale: diningRevealScale, opacity: diningRevealOpacity }}
      >
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_60px_120px_rgba(0,0,0,0.45)]">
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
        className="absolute left-1/2 top-1/2 h-[32rem] w-[34rem] -translate-x-1/2 -translate-y-[38%] rounded-full bg-black/70 blur-[72px]"
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
