"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./icons";

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const blobLeftRef = useRef<HTMLDivElement>(null);
  const blobRightRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        [blobLeftRef.current, blobRightRef.current],
        { opacity: 0 },
        { opacity: 0.5, duration: 1.6 },
        0
      )
        .fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          0.15
        )
        .fromTo(
          bigTextRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 },
          0.35
        )
        .fromTo(
          scriptRef.current,
          { opacity: 0, y: 20, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" },
          0.55
        )
        .fromTo(
          imageWrapRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" },
          0.5
        )
        .fromTo(
          imageRef.current,
          { scale: 1.2 },
          { scale: 1, duration: 1.4, ease: "power2.out" },
          0.5
        )
        .fromTo(
          supportRef.current ? Array.from(supportRef.current.children) : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.85
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          1.1
        );

      if (!prefersReducedMotion) {
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(panelRef.current, {
          scale: 1.015,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(bigTextRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to([blobLeftRef.current], {
          x: -40,
          y: 30,
          rotate: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to([blobRightRef.current], {
          x: 40,
          y: -20,
          rotate: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink pb-16 pt-28 lg:pb-20 lg:pt-32"
    >
      <div
        ref={blobLeftRef}
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl motion-safe:animate-[drift_22s_ease-in-out_infinite]"
        style={{
          background:
            "conic-gradient(from 90deg, #cfd3da, #6b7280, #e5e7eb, #9ca3af, #cfd3da)",
        }}
      />
      <div
        ref={blobRightRef}
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl motion-safe:animate-[drift_26s_ease-in-out_infinite_reverse]"
        style={{
          background:
            "conic-gradient(from 200deg, #e5e7eb, #4b5563, #d1d5db, #6b7280, #e5e7eb)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c4fe0] via-[#1949e6] to-[#0d2f9e] px-6 pb-10 pt-10 sm:px-10 sm:pt-14 lg:px-14"
        >
          <div
            ref={bigTextRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-display text-[18vw] font-black uppercase leading-none tracking-tight text-white/[0.07] sm:text-[13vw] lg:top-0 lg:text-[9vw]"
          >
            Photography
          </div>

          <div className="relative flex min-h-[440px] flex-col justify-between lg:min-h-[520px]">
            <div className="flex items-start justify-between">
              <div ref={scriptRef} className="max-w-md">
                <p className="font-script text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
                  Madhu
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[0.3em] text-white/85">
                  MYSORE PHOTOGRAPHY
                </p>
                <span className="mt-4 block h-px w-16 bg-white/50" />
                <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-white/70">
                  FRAMING STORIES
                  <br />
                  BEYOND TIME
                </p>
              </div>

              <p className="hidden font-script text-2xl leading-tight text-white/90 sm:block sm:text-3xl">
                Capture
                <br />
                Create
                <br />
                Cherish
              </p>
            </div>

            <div className="mt-8 flex flex-1 items-end justify-between gap-6">
              <div ref={supportRef} className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div
                ref={imageWrapRef}
                className="relative h-[280px] w-[46%] max-w-[320px] overflow-hidden rounded-2xl sm:h-[360px] lg:h-[420px]"
              >
                <div ref={imageRef} className="relative h-full w-full">
                  <Image
                    src="https://picsum.photos/seed/madhu-hero/700/1000"
                    alt="Madhu, photographer, adjusting a shot on location"
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 46vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              ref={badgeRef}
              className="mt-6 flex items-center justify-end gap-2 text-xs font-semibold tracking-[0.2em] text-white/70"
            >
              BASED IN MYSORE
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
