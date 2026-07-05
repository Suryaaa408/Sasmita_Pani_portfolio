"use client";

import { Blender, Box, Brush, Gamepad2, Layers, PenTool, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { artist, education, skills, tools } from "@/data/content";
import { Reveal } from "@/components/Reveal";

const toolIcons: Record<string, LucideIcon> = {
  Blender,
  ZBrush: Brush,
  "Substance Painter": Layers,
  Maya: Box,
  "Unreal Engine": Gamepad2,
  "Marvelous Designer": PenTool,
};

export default function About() {
  return (
    <section id="about" className="bg-cream">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label-caps">01 — About</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="section-title mt-5 max-w-2xl">Built for stillness, texture, and story.</h2>
            </Reveal>
          </div>

          <div className="space-y-12">
            <Reveal delay={0.18}>
              <p className="max-w-3xl text-xl leading-9 text-muted">{artist.bio}</p>
            </Reveal>

            <div className="grid gap-10 md:grid-cols-2">
              <Reveal delay={0.22}>
                <h3 className="label-caps">Skills</h3>
                <ul className="mt-5 flex flex-wrap gap-3" aria-label="Skills">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-maroon/14 bg-cream px-4 py-2 text-sm font-semibold text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.28}>
                <h3 className="label-caps">Tools</h3>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Tools">
                  {tools.map((tool) => {
                    const Icon = toolIcons[tool] ?? Box;

                    return (
                      <li
                        key={tool}
                        className="flex min-h-14 items-center gap-3 border border-maroon/14 bg-beige px-4 py-3 text-sm font-semibold text-maroon"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-maroon/15 bg-cream">
                          <Icon size={16} strokeWidth={1.7} aria-hidden />
                        </span>
                        {tool}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.34}>
              <h3 className="label-caps">Education</h3>
              <div className="relative mt-7 space-y-0 pl-9" aria-label="Education timeline">
                <span className="absolute left-[0.36rem] top-2 h-[calc(100%-1rem)] w-px bg-maroon/12" />
                {education.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-12% 0px" }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pb-8 focus:outline-none focus:ring-1 focus:ring-maroon/30 focus:ring-offset-4 focus:ring-offset-cream"
                    tabIndex={0}
                  >
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-12% 0px" }}
                      transition={{ duration: 0.55, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -left-[1.85rem] top-4 h-full w-px origin-top bg-maroon/38"
                      aria-hidden
                    />
                    <motion.span
                      initial={{ scale: 0.45, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-12% 0px" }}
                      transition={{ duration: 0.45, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -left-9 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-maroon bg-cream"
                      aria-hidden
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-maroon" />
                    </motion.span>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon">{item.years}</p>
                    <h4 className="mt-2 text-xl font-semibold text-ink">{item.title}</h4>
                    <p className="mt-1 text-muted">{item.institution}</p>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
