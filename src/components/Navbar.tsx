"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { artist, navLinks } from "@/data/content";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const current = navLinks.findLast((link) => {
        const section = document.getElementById(link.id);
        return section ? section.offsetTop - 160 <= window.scrollY : false;
      });
      if (current) setActive(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-maroon/10 bg-cream/86 shadow-sm backdrop-blur-xl"
            : "bg-beige/50 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            href="#home"
            className="font-display text-xl font-semibold text-maroon"
            onClick={() => setOpen(false)}
          >
            {artist.name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="group relative py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-maroon"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 bottom-0 h-px bg-maroon"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className={active === link.id ? "text-maroon" : ""}>{link.label}</span>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-maroon/20 text-maroon md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-maroon/10 bg-cream px-5 py-5 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-maroon"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </header>

      <nav
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-label="Section progress"
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-label={`Go to ${link.label}`}
            aria-current={active === link.id ? "true" : undefined}
            className="group relative flex h-5 w-5 items-center justify-center"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-maroon/30 transition-colors group-hover:bg-maroon" />
            {active === link.id && (
              <motion.span
                layoutId="section-dot"
                className="absolute h-5 w-5 rounded-full border border-maroon"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}
