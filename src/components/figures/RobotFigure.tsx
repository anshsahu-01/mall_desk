"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

export function RobotFigure({ progress }: { progress: MotionValue<number> }) {
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
