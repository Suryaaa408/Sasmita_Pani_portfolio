"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/content";
import { Reveal } from "@/components/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [3, -3]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-3, 3]), { stiffness: 180, damping: 22 });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 16 }}
      transition={{ duration: 0.48, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative overflow-hidden border border-maroon/12 bg-cream"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 border border-transparent bg-maroon/0 transition-all duration-500 group-hover:border-maroon/70 group-hover:bg-maroon/18" />
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">{project.title}</h3>
          <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-maroon">
            {project.category}
          </p>
        </div>
        <span className="text-xs font-semibold text-muted">0{index + 1}</span>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active],
  );

  return (
    <section id="work" className="bg-beige">
      <div className="section-shell">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <p className="label-caps">02 — Selected Work</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="section-title mt-5">Portfolio</h2>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="self-end">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active === category}
                  onClick={() => setActive(category)}
                  className={`relative overflow-hidden border px-4 py-3 text-left text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active === category
                      ? "border-maroon text-cream"
                      : "border-maroon/18 text-maroon hover:border-maroon/55"
                  }`}
                >
                  {active === category && (
                    <motion.span
                      layoutId="work-tab"
                      className="absolute inset-0 bg-maroon"
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
