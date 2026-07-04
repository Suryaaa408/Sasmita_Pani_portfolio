"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioImages } from "@/data/content";

export default function PortfolioGrid() {
  const [showAll, setShowAll] = useState(false);
  const visibleImages = showAll ? portfolioImages : portfolioImages.slice(0, 12);

  return (
    <section id="portfolio" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-10">
          <p className="label-caps">Portfolio</p>
          <h2 className="heading-xl mt-2">Portfolio of Creativity</h2>
        </div>

        <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {visibleImages.map((image) => (
            <div key={image.id} className="group relative aspect-[5/7] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>

        {!showAll && portfolioImages.length > 12 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-60"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
