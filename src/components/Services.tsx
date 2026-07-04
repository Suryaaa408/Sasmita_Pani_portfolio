"use client";

import { useState } from "react";
import Image from "next/image";
import { services } from "@/data/content";

export default function Services() {
  const [openId, setOpenId] = useState<string>("editorial");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="services" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="heading-lg">Services</h2>
          <p className="text-[13px] leading-relaxed text-muted lg:pt-2">
            From editorial commissions to full book illustration projects, each
            service is tailored to bring your creative vision to life with
            precision and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1460661419646-bd7e0498eb8f?w=800&h=800&fit=crop"
              alt="Artist applying paint with a palette knife"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="divide-y divide-border border-t border-border">
            {services.map((service) => {
              const isOpen = openId === service.id;

              return (
                <div key={service.id}>
                  <button
                    type="button"
                    onClick={() => toggle(service.id)}
                    className="flex w-full items-center justify-between py-5 text-left transition-opacity hover:opacity-70"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[11px] font-medium text-muted">
                        {service.number}
                      </span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.12em]">
                        {service.title}
                      </span>
                    </span>
                    <span className="ml-4 shrink-0 text-lg font-light text-muted">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && service.subItems && (
                    <div className="pb-6 pl-10">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                        {service.subItems.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
