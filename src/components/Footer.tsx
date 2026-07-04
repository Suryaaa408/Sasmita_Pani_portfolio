import { artist } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em]">Avision</p>
            <p className="mt-2 text-[11px] text-muted">
              Creative platform for artists and illustrators.
            </p>
          </div>

          <div className="text-right">
            <p className="label-caps">Get in Touch</p>
            <a
              href="mailto:hello@sasmitamishra.com"
              className="mt-2 block text-[12px] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
            >
              hello@sasmitamishra.com
            </a>
          </div>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.15em] text-muted">
          © {new Date().getFullYear()} {artist.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
