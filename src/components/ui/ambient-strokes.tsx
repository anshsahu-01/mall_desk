"use client";

import { motion } from "framer-motion";

const strokes = [
  "M12 212C178 68 318 54 512 86",
  "M640 128C860 64 1044 88 1220 182",
  "M60 472C224 396 410 362 592 410",
];

export function AmbientStrokes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      <svg
        viewBox="0 0 1280 720"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {strokes.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: index === 1 ? 0.28 : 0.18 }}
            transition={{
              duration: 2.8,
              delay: index * 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
}
