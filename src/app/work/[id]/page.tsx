import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/content";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  return {
    title: project ? `${project.title} — Sasmita Mishra` : "Project — Sasmita Mishra",
    description: project?.writeup,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-cream pt-24">
        <section className="section-shell">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-maroon transition-colors hover:text-maroon-soft"
          >
            <ArrowLeft size={15} aria-hidden />
            Back to work
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="label-caps">{project.category}</p>
              <h1 className="section-title mt-5">{project.title}</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-muted">{project.writeup}</p>

              <div className="mt-10">
                <h2 className="label-caps">Tools used</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {project.toolsUsed.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-maroon/14 bg-beige px-4 py-2 text-sm font-semibold text-maroon"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden border border-maroon/12 bg-sand">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {project.detailImages.map((image, index) => (
              <figure
                key={image}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-maroon/12 bg-sand">
                  <Image
                    src={image}
                    alt={`${project.title} process image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
