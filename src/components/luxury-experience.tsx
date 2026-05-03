"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { AmbientStrokes } from "@/components/ui/ambient-strokes";
import { MacbookShowroom } from "@/components/three/macbook-showroom";

type VideoAsset = {
  src: string;
  label: string;
};

type ImageAsset = {
  src: string;
  alt: string;
};

const heroVideo: VideoAsset = {
  src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  label: "Destination Overview",
};

const immersiveVideos: VideoAsset[] = [
  {
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    label: "Atrium Passage",
  },
  {
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    label: "Night Program",
  },
  {
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    label: "Digital Facade",
  },
];

const imagery: ImageAsset[] = [
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    alt: "Grand luxury interior with sculptural lines",
  },
  {
    src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    alt: "Premium fashion environment with editorial styling",
  },
  {
    src: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1600&q=80",
    alt: "Crowded urban destination at night",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    alt: "Restaurant-grade premium hospitality interior",
  },
];

const ecosystemSignals = [
  "Seven floors of premium retail, entertainment, dining, and spectacle",
  "Immersive luxury storefronts stitched together by cinematic circulation",
  "Crowds, escalators, event decks, and digital activations moving as one system",
];

const showroomMoments = [
  {
    eyebrow: "Fashion Salon",
    title: "Designer rails under moving architectural light.",
    body: "Editorial fashion becomes part of the mall sequence rather than a separate campaign.",
  },
  {
    eyebrow: "Watch Vault",
    title: "Precision objects staged like collectible sculpture.",
    body: "A luxury timepiece environment extends the premium object language beyond technology.",
  },
  {
    eyebrow: "Dining Theater",
    title: "Restaurants arrive as nightlife architecture.",
    body: "Hospitality, atmosphere, and after-dark energy pull the destination beyond shopping.",
  },
  {
    eyebrow: "Event Deck",
    title: "Screens, crowds, and culture fill the atrium with motion.",
    body: "The mall reads as a living entertainment platform with constant activation.",
  },
];

const corridorPanels = [
  {
    index: "01",
    title: "Luxury storefronts expand into sculptural corridors",
    body: "Grand entries, glossy thresholds, and reflective materials establish scale before products even appear.",
  },
  {
    index: "02",
    title: "Retail technology becomes part of the public spectacle",
    body: "The MacBook reveal shifts into one district within a much larger premium ecosystem.",
  },
  {
    index: "03",
    title: "Dining and entertainment extend the mall into night",
    body: "Crowd movement, soundless energy, and layered media make the destination feel continuously alive.",
  },
  {
    index: "04",
    title: "Fashion, events, and architecture move in one rhythm",
    body: "Pinned motion and wide compositions turn the journey into an immersive cultural circuit.",
  },
];

function VideoSurface({
  asset,
  className,
}: {
  asset: VideoAsset;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <video
        className="h-full w-full object-cover grayscale"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={asset.label}
      >
        <source src={asset.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.8))]" />
    </div>
  );
}

function ImpactMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <p className="mb-2 font-[family:var(--font-display)] text-4xl leading-none tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.34em] text-white/45">{label}</p>
    </div>
  );
}

export function LuxuryExperience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const atriumRef = useRef<HTMLElement>(null);
  const ecosystemRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.18]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.08]);
  const techScale = useTransform(scrollYProgress, [0.05, 0.22], [1, 1.14]);

  const { scrollYProgress: atriumProgress } = useScroll({
    target: atriumRef,
    offset: ["start end", "end start"],
  });
  const atriumMediaScale = useTransform(atriumProgress, [0.2, 0.65], [1.06, 1]);

  const { scrollYProgress: ecosystemProgress } = useScroll({
    target: ecosystemRef,
    offset: ["start end", "end start"],
  });
  const imageStackY = useTransform(ecosystemProgress, [0, 1], ["12%", "-8%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollProgress(value);
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (galleryRef.current && galleryTrackRef.current) {
        const panels = gsap.utils.toArray<HTMLElement>("[data-gallery-panel]");

        gsap.to(galleryTrackRef.current, {
          xPercent: -72,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top top",
            end: "+=2800",
            scrub: 1.1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((panel, index) => {
          gsap.fromTo(
            panel,
            { opacity: 0.4, y: 90 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: `${index * 18 + 6}% center`,
                end: `${index * 18 + 24}% center`,
                scrub: 1,
              },
            },
          );
        });
      }
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <div ref={pageRef} className="bg-black text-white">
        <main className="relative overflow-hidden">
          <section className="relative min-h-screen border-b border-white/10">
            <VideoSurface asset={heroVideo} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18),transparent_32%,rgba(0,0,0,0.88))]" />
            <AmbientStrokes />

            <motion.div
              className="relative mx-auto flex min-h-screen w-full max-w-[1800px] flex-col justify-between px-6 py-8 sm:px-10 lg:px-16"
              style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.42em] text-white/55 sm:text-xs">
                <span>Mall Desk</span>
                <span>Luxury Mall Ecosystem</span>
              </div>

              <div className="grid items-end gap-14 pb-14 pt-24 lg:grid-cols-[1.18fr_0.82fr]">
                <div className="space-y-8">
                  <p className="max-w-md text-[11px] uppercase tracking-[0.38em] text-white/50 sm:text-xs">
                    Retail. Architecture. Entertainment. Destination culture.
                  </p>
                  <h1 className="max-w-6xl font-[family:var(--font-display)] text-[clamp(4.6rem,15vw,12.8rem)] leading-[0.84] tracking-[-0.06em] text-white">
                    A living
                    <br />
                    luxury mall
                    <br />
                    in motion.
                  </h1>
                </div>

                <div className="space-y-10 lg:justify-self-end">
                  <p className="max-w-md text-sm leading-7 text-white/72 sm:text-base">
                    The destination is the protagonist: vast atriums, premium
                    storefronts, nightlife dining, crowd energy, and cinematic
                    activations unfolding through every scroll.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <ImpactMetric value="250+" label="Luxury Brands" />
                    <ImpactMetric value="40" label="Dining Concepts" />
                    <ImpactMetric value="12" label="Event Programs" />
                    <ImpactMetric value="1" label="Connected Ecosystem" />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="relative border-b border-white/10 px-4 py-12 sm:px-8 lg:px-12">
            <motion.div
              className="mx-auto grid max-w-[1800px] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]"
              style={{ scale: techScale }}
            >
              <div className="relative min-h-[64vh] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,transparent_80%,rgba(255,255,255,0.08))]" />
                <MacbookShowroom progress={scrollProgress} />
              </div>

              <div className="relative space-y-10 px-4 py-8 sm:px-8 lg:px-10">
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                    Technology Pavilion
                  </p>
                  <h2 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.04em]">
                    The opening premium object, not the whole story.
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-8 text-white/68">
                  A cinematic MacBook reveal remains as the first luxury product
                  moment, then hands the narrative back to the wider destination:
                  fashion floors, hospitality, event spectacle, and moving public
                  space.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {ecosystemSignals.map((signal) => (
                    <article
                      key={signal}
                      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-[2px] sm:last:col-span-2"
                    >
                      <p className="text-sm leading-7 text-white/58">{signal}</p>
                    </article>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          <section
            ref={atriumRef}
            className="relative min-h-[180vh] border-b border-white/10"
          >
            <div className="sticky top-0 h-screen overflow-hidden">
              <motion.div className="absolute inset-0" style={{ scale: atriumMediaScale }}>
                <VideoSurface asset={immersiveVideos[0]} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.82)),radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.35))]" />
              </motion.div>

              <div className="relative mx-auto flex h-full w-full max-w-[1800px] flex-col justify-between px-6 py-10 sm:px-10 lg:px-16">
                <div className="text-[10px] uppercase tracking-[0.38em] text-white/42 sm:text-xs">
                  Atrium Sequence
                </div>
                <div className="max-w-5xl space-y-6 pb-14">
                  <h2 className="font-[family:var(--font-display)] text-[clamp(3.4rem,9vw,8.8rem)] leading-[0.88] tracking-[-0.05em]">
                    Giant interior volume.
                    <br />
                    Escalators. Crowds.
                    <br />
                    Destination energy.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                    Fullscreen media turns the mall into a public stage, where
                    circulation, retail spectacle, and entertainment architecture
                    become one immersive environment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={ecosystemRef}
            className="relative border-b border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
          >
            <div className="mx-auto grid max-w-[1800px] gap-14 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="space-y-6">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                  Mall Ecosystem
                </p>
                <h2 className="font-[family:var(--font-display)] text-[clamp(3rem,7vw,6.8rem)] leading-[0.9] tracking-[-0.05em]">
                  Storefronts, dining, culture, and spectacle layered together.
                </h2>
                <p className="max-w-md text-base leading-8 text-white/64">
                  The visual system gets richer here: premium imagery overlaps the
                  type, moves independently, and starts to read like a city of
                  curated interiors rather than a single showroom.
                </p>
              </div>

              <motion.div
                className="relative min-h-[110vh]"
                style={{ y: imageStackY }}
              >
                <article className="absolute left-0 top-0 h-[42vh] w-[58%] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={imagery[0].src}
                    alt={imagery[0].alt}
                    className="h-full w-full object-cover grayscale"
                  />
                </article>

                <article className="absolute right-0 top-[12vh] h-[38vh] w-[42%] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={imagery[1].src}
                    alt={imagery[1].alt}
                    className="h-full w-full object-cover grayscale"
                  />
                </article>

                <article className="absolute left-[10%] top-[46vh] h-[46vh] w-[44%] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={imagery[2].src}
                    alt={imagery[2].alt}
                    className="h-full w-full object-cover grayscale"
                  />
                </article>

                <article className="absolute right-[6%] top-[58vh] h-[42vh] w-[52%] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={imagery[3].src}
                    alt={imagery[3].alt}
                    className="h-full w-full object-cover grayscale"
                  />
                </article>

                <div className="absolute bottom-0 left-0 w-[48%] rounded-[2rem] border border-white/10 bg-black/70 p-8 backdrop-blur-md">
                  <p className="mb-5 text-[10px] uppercase tracking-[0.34em] text-white/35">
                    Curated Districts
                  </p>
                  <p className="text-lg leading-8 text-white/64">
                    Every zone carries a distinct emotional program: fashion, food,
                    technology, nightlife, and event culture.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section
            ref={galleryRef}
            className="relative min-h-screen border-b border-white/10 py-14"
          >
            <div className="mx-auto mb-10 flex w-full max-w-[1800px] items-end justify-between gap-10 px-6 sm:px-10 lg:px-16">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                  Premium Worlds
                </p>
                <h2 className="max-w-4xl font-[family:var(--font-display)] text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.05em]">
                  One destination, multiple luxury showroom experiences.
                </h2>
              </div>
              <p className="hidden max-w-sm text-sm leading-7 text-white/58 xl:block">
                The horizontal corridor now reads as a mall-scale sequence of
                fashion, objects, hospitality, and public spectacle.
              </p>
            </div>

            <div
              ref={galleryTrackRef}
              className="flex w-[360vw] gap-6 px-6 sm:px-10 lg:px-16"
            >
              {showroomMoments.map((moment, index) => (
                <article
                  key={moment.eyebrow}
                  data-gallery-panel
                  className="relative flex h-[70vh] w-[94vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] p-8 sm:w-[72vw] lg:w-[62vw] lg:p-12"
                >
                  <div className="absolute inset-0 opacity-70">
                    {index < immersiveVideos.length ? (
                      <VideoSurface asset={immersiveVideos[index]} className="grayscale" />
                    ) : (
                      <>
                        <img
                          src={imagery[index % imagery.length].src}
                          alt={imagery[index % imagery.length].alt}
                          className="h-full w-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.78))]" />
                      </>
                    )}
                  </div>

                  <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-white/44">
                    <span>{`0${index + 1}`}</span>
                    <span>{moment.eyebrow}</span>
                  </div>
                  <div className="relative space-y-6">
                    <h3 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.7rem,5vw,5.6rem)] leading-[0.94] tracking-[-0.04em]">
                      {moment.title}
                    </h3>
                    <p className="max-w-lg text-sm leading-7 text-white/62 sm:text-base">
                      {moment.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="relative border-b border-white/10 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[1.04fr_0.96fr]">
              <article className="relative min-h-[70vh] overflow-hidden rounded-[2.6rem] border border-white/10">
                <VideoSurface asset={immersiveVideos[1]} />
                <div className="relative flex h-full flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">
                    Dining + Nightlife
                  </p>
                  <div className="space-y-5">
                    <h3 className="max-w-3xl font-[family:var(--font-display)] text-[clamp(2.8rem,5.8vw,5.8rem)] leading-[0.92] tracking-[-0.05em]">
                      Restaurants turn the mall into an after-dark destination.
                    </h3>
                    <p className="max-w-xl text-base leading-8 text-white/66">
                      Premium hospitality extends dwell time, mood, and cultural
                      relevance far beyond a conventional shopping trip.
                    </p>
                  </div>
                </div>
              </article>

              <div className="grid gap-8">
                <article className="relative min-h-[33vh] overflow-hidden rounded-[2.2rem] border border-white/10">
                  <VideoSurface asset={immersiveVideos[2]} />
                  <div className="relative flex h-full flex-col justify-end p-8">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/40">
                      Event Layer
                    </p>
                    <p className="max-w-md text-lg leading-8 text-white/70">
                      Large-format screens and rotating programs create a public
                      entertainment pulse.
                    </p>
                  </div>
                </article>

                <article className="rounded-[2.2rem] border border-white/10 bg-white/[0.025] p-8 sm:p-10">
                  <p className="mb-8 text-[10px] uppercase tracking-[0.34em] text-white/35">
                    Program Matrix
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {corridorPanels.map((panel) => (
                      <div key={panel.index} className="space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.34em] text-white/32">
                          {panel.index}
                        </p>
                        <h4 className="text-xl leading-7 text-white">{panel.title}</h4>
                        <p className="text-sm leading-7 text-white/56">{panel.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="relative px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
            <div className="mx-auto max-w-[1800px] space-y-12">
              <div className="space-y-5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-white/45 sm:text-xs">
                  Destination Finale
                </p>
                <h2 className="max-w-6xl font-[family:var(--font-display)] text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-[-0.05em]">
                  Not a launch page.
                  <br />
                  A luxury retail universe.
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
                The final impression is ecosystem-scale: architecture, movement,
                crowds, luxury products, hospitality, and entertainment held
                together by restrained motion and cinematic pacing.
              </p>
            </div>
          </section>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
