"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { services } from "@/lib/content";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      gsap.fromTo(
        Array.from(trackRef.current.children),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" ref={sectionRef} className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand">
              OUR SERVICES
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              We Capture It All
            </h2>
          </div>
          <p className="hidden text-right text-xs font-semibold tracking-[0.2em] text-ink/50 sm:block">
            TURNING MOMENTS
            <br />
            INTO MEMORIES
          </p>
        </div>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative h-[380px] w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1.5"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-brand-dark/90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <p className="max-w-[140px] text-sm font-semibold uppercase leading-tight text-white">
                    {service.title}
                  </p>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous services"
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg ring-1 ring-black/5 transition-colors hover:bg-brand hover:text-white md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next services"
            className="absolute right-0 top-1/2 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg ring-1 ring-black/5 transition-colors hover:bg-brand hover:text-white md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
