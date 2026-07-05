"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/content";
import { Reveal } from "@/components/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [3, -3]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-3, 3]), { stiffness: 180, damping: 22 });

  return (
    <motion.div
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
      className="relative"
    >
      <Link
        href={`/work/${project.id}`}
        className="group block overflow-hidden border border-maroon/12 bg-cream focus:outline-none focus:ring-2 focus:ring-maroon/35 focus:ring-offset-4 focus:ring-offset-beige"
        aria-label={`View project: ${project.title}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] group-focus-visible:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 border border-transparent bg-maroon/0 transition-all duration-500 group-hover:border-maroon/70 group-hover:bg-maroon/28 group-focus-visible:border-maroon/70 group-focus-visible:bg-maroon/28" />
          <div className="absolute inset-x-5 bottom-5 flex translate-y-3 items-center justify-between gap-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <span className="inline-flex items-center gap-2 bg-cream px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-maroon">
              View project
              <ArrowUpRight size={15} aria-hidden />
            </span>
            <span className="text-sm font-semibold text-cream">0{index + 1}</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 p-5">
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">{project.title}</h3>
            <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-maroon transition-colors group-hover:text-maroon-soft">
              {project.category}
            </p>
          </div>
          <span className="text-xs font-semibold text-muted transition-colors group-hover:text-maroon">0{index + 1}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data: Project[]) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const lastIndex = projectCategories.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowRight"
            ? index === lastIndex
              ? 0
              : index + 1
            : index === 0
              ? lastIndex
              : index - 1;
    const nextCategory = projectCategories[nextIndex];

    setActive(nextCategory);
    tabRefs.current[nextIndex]?.focus();
  };

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
                  ref={(node) => {
                    tabRefs.current[projectCategories.indexOf(category)] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active === category}
                  tabIndex={active === category ? 0 : -1}
                  onClick={() => setActive(category)}
                  onKeyDown={(event) => handleTabKeyDown(event, projectCategories.indexOf(category))}
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
          {loading ? (
            <p className="text-muted">Loading projects...</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
