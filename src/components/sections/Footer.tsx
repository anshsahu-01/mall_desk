"use client";

import { AnimatedText } from "@/components/shared/AnimatedText";

const footerLinks = [
  {
    heading: "Experience",
    items: ["The Atrium", "Retail District", "Tech Quarter", "Art Spaces"],
  },
  {
    heading: "Dining",
    items: ["Fine Dining", "Casual Eats", "Rooftop Bars", "Food Hall"],
  },
  {
    heading: "Events",
    items: ["Live Music", "Pop-Ups", "Exhibitions", "Private Hire"],
  },
  {
    heading: "Connect",
    items: ["About", "Careers", "Press", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505] overflow-hidden">
      {/* Premium Decorative elements */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.05),transparent_70%)] blur-[80px]" />

      <div className="mx-auto max-w-[1800px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          {/* Brand & Mission */}
          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-8">
              <AnimatedText>
                <h2 className="font-[family:var(--font-display)] text-[clamp(2.8rem,6vw,5rem)] font-normal leading-none tracking-tight text-white">
                  MALL <span className="text-[#C9A96E]">DESK</span>
                </h2>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="max-w-md text-base leading-relaxed text-white/40">
                  A cinematic retail ecosystem where architecture, culture, and commerce converge. We don&apos;t just build spaces; we craft destinations that breathe.
                </p>
              </AnimatedText>
            </div>

            <div className="flex gap-8">
              {["Instagram", "LinkedIn", "X", "Vimeo"].map((social, i) => (
                <AnimatedText key={social} delay={0.2 + i * 0.05}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/30 transition-colors hover:text-[#C9A96E]"
                  >
                    <span className="h-px w-0 bg-[#C9A96E] transition-all group-hover:w-4" />
                    {social}
                  </a>
                </AnimatedText>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-12 sm:gap-16 lg:gap-8">
            {footerLinks.map((col, colIndex) => (
              <div key={col.heading} className="space-y-8">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">
                  {col.heading}
                </h3>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white/25 transition-colors duration-300 hover:text-white/80"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 sm:flex-row sm:pt-12">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/15">
              &copy; {new Date().getFullYear()} Mall Desk Platform.
            </p>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">
              Architecture &bull; Curation &bull; Experience
            </p>
          </div>
          
          <div className="flex gap-10">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((text) => (
              <a 
                key={text}
                href="#" 
                className="text-[10px] uppercase tracking-[0.3em] text-white/15 transition-colors hover:text-white/40"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
