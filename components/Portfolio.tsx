"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { portfolio } from "@/lib/content";
import Lightbox from "./Lightbox";

const spans = ["row-span-2", "", "", "", "row-span-2"];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dot, setDot] = useState(0);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-brand">
              OUR PORTFOLIO
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              Some of Our Favourite Frames
            </h2>
          </div>
          <a
            href="#portfolio"
            className="group hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand sm:inline-flex"
          >
            View All Works
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-5"
        >
          {portfolio.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                setDot(index % 4);
              }}
              className={`group relative overflow-hidden rounded-2xl text-left ${spans[index] ?? ""}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((value) => (
            <span
              key={value}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                value === dot ? "w-6 bg-brand" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={portfolio}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={(next) => {
            setActiveIndex(next);
            setDot(next % 4);
          }}
        />
      )}
    </section>
  );
}
