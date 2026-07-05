"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { artist } from "@/data/content";

const headlineLines = [
  { text: "Shaping quiet worlds,", accent: "" },
  { text: "one polygon ", accent: "at a time." },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 46]);

  return (
    <section id="home" ref={ref} className="relative isolate min-h-screen overflow-hidden bg-beige">
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 top-24 h-[26rem] w-[26rem] rounded-full bg-maroon/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[-12rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-cream/70 blur-3xl"
        aria-hidden
      />

      {/*
        Layout note: the hero padding was tightened from a loose section-shell rhythm
        so the text and portrait sit as one composed first viewport.
      */}
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-14 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:pb-18 lg:pt-24">
        <div className="relative z-10 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="label-caps"
          >
            {artist.eyebrow}
          </motion.p>

          {/*
            Layout note: the headline is capped to force two editorial lines instead
            of allowing the large type to collapse into one-word rows.
          */}
          <h1 className="display-title mt-5 max-w-[48rem]" aria-label={artist.headline}>
            {headlineLines.map((line, index) => (
              <span key={line.text} className="block overflow-hidden pb-2">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.62,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden
                >
                  {line.text}
                  {line.accent && <span className="text-maroon">{line.accent}</span>}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 grid max-w-3xl gap-6 sm:grid-cols-[minmax(0,1fr)_17rem] sm:items-start"
          >
            <p className="max-w-[38rem] text-lg leading-8 text-muted sm:text-xl">{artist.intro}</p>
            <p className="flex items-start gap-3 border-l-2 border-maroon pl-4 text-sm font-semibold uppercase tracking-[0.18em] text-maroon">
              <motion.span
                className="relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-maroon"
                aria-hidden
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-maroon"
                  animate={{ opacity: [0.45, 0], scale: [1, 2.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.span>
              {artist.status}
            </p>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[32rem] justify-self-center lg:col-span-5 lg:justify-self-end"
        >
          <div className="absolute -bottom-6 -right-6 h-52 w-52 bg-maroon/85" aria-hidden />
          <div className="absolute -left-5 top-8 h-32 w-24 border border-maroon/35" aria-hidden />
          <motion.div
            style={{ y: portraitY }}
            className="relative aspect-[4/5] overflow-hidden border border-maroon/25 bg-sand shadow-[0_28px_70px_rgba(92,26,27,0.22)]"
          >
            <Image
              src={artist.portrait}
              alt={artist.portraitAlt}
              fill
              className="object-cover grayscale-[12%] saturate-[0.9]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </motion.div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
            <span>2025</span>
            <span>{artist.portraitCaption}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
