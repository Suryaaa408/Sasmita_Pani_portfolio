"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Camera, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { artist } from "@/data/content";
import { Reveal } from "@/components/Reveal";

const socialIcons = {
  Instagram: Camera,
  LinkedIn: BriefcaseBusiness,
};

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      event.currentTarget.reset();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

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
                {artist.socials.map((social) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons] ?? Send;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-maroon/18 bg-beige px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-maroon transition-colors hover:border-maroon hover:bg-cream"
                    >
                      <Icon size={15} strokeWidth={1.7} aria-hidden />
                      {social.name} · {social.handle}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <form className="space-y-7" aria-label="Contact form" onSubmit={handleSubmit}>
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
                disabled={formState === "loading"}
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-maroon px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-maroon transition-colors duration-500 hover:text-cream disabled:cursor-wait disabled:opacity-70"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-maroon transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10">{formState === "loading" ? "Sending" : "Send"}</span>
                {formState === "loading" ? (
                  <LoaderCircle className="relative z-10 animate-spin" size={16} aria-hidden />
                ) : (
                  <Send className="relative z-10" size={16} aria-hidden />
                )}
              </button>

              <AnimatePresence mode="wait">
                {formState === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm font-semibold text-maroon"
                    role="status"
                  >
                    Message sent. Thank you.
                  </motion.p>
                )}
                {formState === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm font-semibold text-maroon"
                    role="alert"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
