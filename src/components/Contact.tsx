"use client";

import { Send } from "lucide-react";
import { artist } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-cream">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label-caps">03 — Contact</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h2 className="section-title mt-5 max-w-4xl">Let&apos;s create something quiet and beautiful.</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
                Share a mood, a sketch, or a half-formed world. I&apos;ll help shape it into something tactile,
                cinematic, and ready to move.
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-10 space-y-4">
              <a className="block text-xl font-semibold text-maroon hover:text-maroon-soft" href={`mailto:${artist.email}`}>
                {artist.email}
              </a>
              <div className="flex flex-wrap gap-4">
                {artist.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-maroon/35 pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-maroon transition-colors hover:border-maroon"
                  >
                    {social.name} · {social.handle}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <form className="space-y-7" aria-label="Contact form">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.id} className="group">
                  <label htmlFor={field.id} className="label-caps">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="mt-3 w-full border-0 border-b border-maroon/20 bg-transparent px-0 py-4 text-lg text-ink outline-none transition-colors focus:border-maroon"
                    required
                  />
                </div>
              ))}

              <div className="group">
                <label htmlFor="message" className="label-caps">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-3 w-full resize-none border-0 border-b border-maroon/20 bg-transparent px-0 py-4 text-lg text-ink outline-none transition-colors focus:border-maroon"
                  required
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-maroon px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition-colors duration-500 hover:text-cream"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-maroon transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10">Send</span>
                <Send className="relative z-10" size={16} aria-hidden />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
