"use client";

import { type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Optional delay in seconds */
  delay?: number;
  /** Enable blur-to-clear effect for premium feel */
  blur?: boolean;
};

export function AnimatedText({
  children,
  className,
  as: Component = "div",
  delay = 0,
  blur = false,
}: AnimatedTextProps) {
  const componentTag =
    typeof Component === "string" ? Component : "div";

  const MotionComponent =
    componentTag === "h1" ? motion.h1 :
    componentTag === "h2" ? motion.h2 :
    componentTag === "h3" ? motion.h3 :
    componentTag === "p" ? motion.p :
    componentTag === "span" ? motion.span :
    componentTag === "section" ? motion.section :
    componentTag === "article" ? motion.article :
    motion.div;

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        y: 24,
        filter: blur ? "blur(6px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={["relative", className].filter(Boolean).join(" ")}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionComponent>
  );
}
