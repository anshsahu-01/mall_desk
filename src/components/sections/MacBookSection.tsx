"use client";

import { type RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { AmbientGrid } from "@/components/shared/AmbientGrid";
import { macbookImage } from "@/components/data/assets";

/* ── MacBook Section — Premium Hero Showcase ── */
type MacBookSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function MacBookSection({ sectionRef }: MacBookSectionProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.88, 1, 1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32 lg:py-48"
    >
      <AmbientGrid opacity="opacity-30" />
      
      <motion.div 
        className="mx-auto max-w-[1400px] text-center"
        style={{ opacity: contentOpacity }}
      >
        {/* Branding label */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#C9A96E]">
            MALL DESK EXPERIENCE
          </span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />
        </div>

        <AnimatedText
          as="h2"
          className="mx-auto max-w-4xl font-[family:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.1] tracking-tight text-white mb-12"
          blur
        >
          The interface of <span className="text-white/60 italic">luxury.</span>
        </AnimatedText>

        {/* Premium Device Display */}
        <div className="relative mx-auto mb-20 max-w-[1000px]">
          {/* Subtle Glow */}
          <div className="absolute inset-0 -m-20 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.12),transparent_70%)] blur-[100px]" />
          
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.03, 1],
              rotate: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ y: imageY, scale: imageScale }}
          >
            <img
              src={macbookImage.src}
              alt={macbookImage.alt}
              className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { 
              title: "Digital Fluidity", 
              desc: "Every interaction is calibrated for weight, momentum, and cinematic grace." 
            },
            { 
              title: "Ambient Design", 
              desc: "A digital layer that breathes with the physical rhythm of the space." 
            },
            { 
              title: "Curation First", 
              desc: "Information is never overwhelming; it's presented with architectural focus." 
            }
          ].map((feature, i) => (
            <AnimatedText key={feature.title} delay={0.2 + i * 0.1}>
              <div className="space-y-3">
                <h3 className="text-sm font-medium tracking-widest uppercase text-[#C9A96E]/80">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {feature.desc}
                </p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
