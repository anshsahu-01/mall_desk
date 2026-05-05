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
      <div className="flex flex-col items-center gap-8">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family:var(--font-display)] text-2xl tracking-[0.25em] text-white/80"
        >
          MALL <span className="text-[#C9A96E]">DESK</span>
        </motion.div>

        {/* Spinner */}
        <motion.svg
          viewBox="0 0 120 120"
          className="h-12 w-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          aria-hidden="true"
        >
          <motion.circle
            cx="60"
            cy="60"
            r="32"
            fill="none"
            stroke="rgba(201,169,110,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="108 92"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ transformOrigin: "60px 60px" }}
          />
        </motion.svg>

        {/* Progress bar */}
        <div className="w-32 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-px bg-gradient-to-r from-[#C9A96E]/60 to-white/80"
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
