"use client";

import { motion } from "framer-motion";
import { artist, education, skills, tools } from "@/data/content";
import { Reveal } from "@/components/Reveal";

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
                <ul className="mt-5 grid gap-3">
                  {skills.map((skill) => (
                    <li key={skill} className="border-b border-maroon/12 pb-3 text-lg text-ink">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.28}>
                <h3 className="label-caps">Tools</h3>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-maroon/14 bg-beige px-4 py-3 text-sm font-semibold text-maroon"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.34}>
              <h3 className="label-caps">Education</h3>
              <div className="relative mt-7 space-y-8 pl-8">
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[0.32rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-maroon/30"
                />
                {education.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <span className="absolute -left-8 top-1 h-3 w-3 rounded-full border border-maroon bg-cream" />
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
