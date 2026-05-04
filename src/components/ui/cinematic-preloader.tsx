"use client";

import { motion } from "framer-motion";

export function CinematicPreloader({
  progress,
  isDone,
}: {
  progress: number;
  isDone: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black text-white"
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isDone ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.svg
          viewBox="0 0 120 120"
          className="h-16 w-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          aria-hidden="true"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="32"
            fill="none"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="108 92"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transformOrigin: "60px 60px" }}
          />
        </motion.svg>

        <div className="w-32 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-px bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: Math.max(progress, 12) / 100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0% 50%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
