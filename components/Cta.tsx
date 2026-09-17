"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, ArrowUpRight } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";

export default function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }

      if (!prefersReducedMotion) {
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.15,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-6 py-6 lg:px-10">
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-ink"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand/40 opacity-40 blur-3xl"
        />

        <div
          ref={contentRef}
          className="relative grid items-center gap-8 px-8 py-12 sm:px-12 lg:grid-cols-[1fr_1fr_auto] lg:py-16"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
              <Camera className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Ready to Capture Your
                <br />
                Special Moments?
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Let&apos;s create memories you&apos;ll cherish forever.
              </p>
            </div>
          </div>

          <div className="lg:border-x lg:border-white/10 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Book a Shoot Today!
            </p>
            <p className="mt-1 text-xs text-white/50">
              Quick booking &middot; Friendly support &middot; Best results
            </p>
            <a
              href="#contact"
              className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
            >
              Book a Shoot
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="relative hidden h-40 w-40 shrink-0 overflow-hidden rounded-2xl lg:block">
            <Image
              src="https://picsum.photos/seed/madhu-cta/300/300"
              alt="Silhouette of a photographer at work"
              fill
              sizes="160px"
              className="object-cover brightness-[0.35] contrast-125"
            />
            <p className="absolute right-3 top-3 text-right font-script text-lg leading-tight text-white/80">
              Good Photos
              <br />
              Better Stories
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
