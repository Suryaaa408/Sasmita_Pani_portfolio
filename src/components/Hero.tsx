"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { artist } from "@/data/content";

const words = artist.headline.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section id="home" ref={ref} className="min-h-screen bg-beige pt-24">
      <div className="section-shell grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="label-caps"
          >
            {artist.eyebrow}
          </motion.p>

          <h1 className="display-title mt-7 max-w-[58rem] text-ink">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-[0.18em] inline-block overflow-hidden pb-2">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.12 + index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid max-w-2xl gap-7 sm:grid-cols-[1fr_auto] sm:items-start"
          >
            <p className="text-lg leading-8 text-muted sm:text-xl">{artist.intro}</p>
            <p className="border-l border-maroon pl-4 text-sm font-semibold uppercase tracking-[0.18em] text-maroon sm:max-w-[15rem]">
              {artist.status}
            </p>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[30rem] justify-self-center lg:col-span-5 lg:justify-self-end"
        >
          <motion.div
            style={{ y: portraitY }}
            className="relative aspect-[4/5] overflow-hidden border border-maroon/15 bg-sand"
          >
            <Image
              src={artist.portrait}
              alt={artist.portraitAlt}
              fill
              className="object-cover grayscale-[20%] saturate-[0.82]"
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
