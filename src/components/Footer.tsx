import { artist } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-maroon/12 bg-beige">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2025 {artist.name}</p>
        <p>Made with care.</p>
      </div>
    </footer>
  );
}
