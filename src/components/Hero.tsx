import Image from "next/image";
import { artist } from "@/data/content";

export default function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-10 lg:mb-14">
          <h1 className="heading-xl">{artist.name}</h1>
          <p className="mt-1 text-sm font-normal uppercase tracking-[0.25em] text-muted">
            {artist.role}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-3">
            <div>
              <p className="label-caps">Professional Level</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em]">
                {artist.level}
              </p>
            </div>

            <div>
              <p className="label-caps">Category</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] leading-relaxed">
                {artist.categories.join(" • ")}
              </p>
            </div>

            <div>
              <p className="label-caps">Website</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em]">
                {artist.website}
              </p>
            </div>

            <div>
              <p className="label-caps">Social Media</p>
              <div className="mt-3 flex gap-2">
                {artist.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-[9px] font-semibold uppercase tracking-wider transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                    aria-label={item.name}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-sm justify-self-center lg:col-span-4 lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
              alt={`Portrait of ${artist.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>

          <div className="lg:col-span-5">
            <p className="text-[13px] leading-[1.85] text-muted whitespace-pre-line">
              {artist.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
