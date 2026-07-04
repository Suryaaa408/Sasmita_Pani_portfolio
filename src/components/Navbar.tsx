import Link from "next/link";
import { artist, navLinks } from "@/data/content";

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="border-b border-border bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-[0.15em] text-ink"
          >
            Avision
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="#contact"
              className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60 sm:flex"
            >
              <UserIcon />
              Join Us
            </Link>
            <Link
              href="#contact"
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-60"
            >
              <PhoneIcon />
              Contact
            </Link>
          </div>
        </div>

        <nav className="pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted">
            <li>
              <Link href="#hero" className="transition-opacity hover:text-ink">
                Talents
              </Link>
            </li>
            <li aria-hidden="true">&gt;</li>
            <li className="text-ink">{artist.name}</li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
