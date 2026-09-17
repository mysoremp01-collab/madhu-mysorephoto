"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Camera,
  Clapperboard,
  Wand2,
  Sparkles,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { creates } from "@/lib/content";

const createIcons = [Camera, Clapperboard, Wand2, Sparkles, Compass];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const createCardRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const createListRef = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        aboutCardRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        createCardRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        aboutImageRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (createListRef.current) {
        gsap.fromTo(
          Array.from(createListRef.current.children),
          { opacity: 0, x: 16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: createListRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-paper py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 lg:grid-cols-2 lg:px-10">
        <div
          ref={aboutCardRef}
          className="rounded-[1.75rem] bg-paper-dim p-8 sm:p-10"
        >
          <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
            <span className="text-brand">About</span>
            <br />
            Me
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_140px]">
            <div>
              <p className="text-[15px] leading-relaxed text-ink/70">
                Hi, I&apos;m Madhu, a photographer based in Mysore. I capture
                real moments, emotions and stories through my lens. My
                approach is minimal, aesthetic and people-centric.
              </p>

              <div ref={statsRef} className="mt-8 flex gap-10">
                <div>
                  <p className="font-display text-3xl font-extrabold text-brand">
                    5+
                  </p>
                  <p className="text-xs font-medium tracking-wide text-ink/60">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-extrabold text-brand">
                    500+
                  </p>
                  <p className="text-xs font-medium tracking-wide text-ink/60">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={aboutImageRef}
              className="relative h-44 overflow-hidden rounded-2xl sm:h-full"
            >
              <Image
                src="https://picsum.photos/seed/madhu-about/400/520"
                alt="Madhu holding a camera, looking through the viewfinder"
                fill
                sizes="140px"
                className="object-cover"
              />
              <p className="absolute bottom-3 left-3 font-script text-xl text-white drop-shadow">
                Photographs
                <br />
                with purpose
              </p>
            </div>
          </div>
        </div>

        <div
          ref={createCardRef}
          className="relative overflow-hidden rounded-[1.75rem] bg-ink p-8 text-white sm:p-10"
        >
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/madhu-create/900/700"
              alt="Madhu shooting with a professional camera against a dark backdrop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          </div>

          <div className="relative flex items-start justify-between">
            <div>
              <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
                I Create
              </h2>
              <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-white/70">
                VISUAL STORIES
              </p>
            </div>
            <div className="hidden flex-col items-end gap-1 text-right text-[10px] font-semibold tracking-[0.3em] text-white/50 sm:flex">
              <span>IDEAS</span>
              <span>PEOPLE</span>
              <span>PLACES</span>
              <span>STORIES</span>
            </div>
          </div>

          <ul ref={createListRef} className="relative mt-8 flex flex-col gap-3">
            {creates.map((item, index) => {
              const Icon = createIcons[index];
              return (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/80 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {item.toUpperCase()}
                  </span>
                </li>
              );
            })}
          </ul>

          <a
            href="#portfolio"
            aria-label="View portfolio"
            className="absolute right-8 top-8 grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
