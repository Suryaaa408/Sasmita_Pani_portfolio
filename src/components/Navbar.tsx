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
  const activeIndex = Math.max(
    0,
    navLinks.findIndex((link) => link.id === active),
  );

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
            : "bg-beige/72 backdrop-blur-sm"
        }`}
      >
        {/*
          Layout note: the nav height and side padding were increased so the
          landing section starts with a calmer, more editorial frame.
        */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <Link
            href="#home"
            className="font-display text-2xl font-semibold text-maroon"
            onClick={() => setOpen(false)}
          >
            {artist.name}
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="group relative py-2 text-xs font-semibold uppercase tracking-[0.24em] text-maroon/72 transition-colors hover:text-maroon"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-maroon"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className={active === link.id ? "text-maroon" : ""}>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-maroon/58 transition-colors hover:text-maroon"
            >
              Admin
            </Link>
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
              {[...navLinks, { label: "Admin", href: "/admin", id: "admin" }].map((link) => (
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
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
        aria-label="Section progress"
      >
        <div className="absolute bottom-2 top-2 w-px bg-maroon/16" aria-hidden />
        <motion.div
          className="absolute top-2 w-px origin-top bg-maroon"
          initial={false}
          animate={{ height: `${(activeIndex / Math.max(navLinks.length - 1, 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-label={`Go to ${link.label}`}
            aria-current={active === link.id ? "true" : undefined}
            className="group relative flex h-6 w-6 items-center justify-center"
          >
            <span className="relative z-10 h-2 w-2 rounded-full border border-maroon/35 bg-beige transition-colors group-hover:bg-maroon" />
            <span className="pointer-events-none absolute right-8 translate-x-2 whitespace-nowrap bg-cream px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-maroon opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {link.label}
            </span>
            {active === link.id && (
              <motion.span
                layoutId="section-dot"
                className="absolute h-6 w-6 rounded-full border border-maroon"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}
