"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      if (textRef.current) {
        gsap.fromTo(
          Array.from(textRef.current.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      }

      if (!prefersReducedMotion) {
        gsap.to(imageRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(badgeRef.current, {
          y: -10,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="relative">
          <div
            ref={imageWrapRef}
            className="relative h-[420px] overflow-hidden rounded-[2rem] sm:h-[480px]"
          >
            <div ref={imageRef} className="relative h-[115%] w-full -top-[7%]">
              <Image
                src="https://picsum.photos/seed/madhu-story/800/1000"
                alt="Madhu framing a shot with his camera raised"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            ref={badgeRef}
            className="absolute -left-4 top-10 flex flex-col items-center gap-3 sm:-left-8"
          >
            <span className="grid h-24 w-24 place-items-center rounded-full bg-white text-center font-script text-lg leading-tight text-ink shadow-xl sm:h-28 sm:w-28">
              Experience
              <br />
              Matters
            </span>
            <span className="grid h-20 w-20 place-items-center rounded-full bg-brand text-center font-display text-sm font-bold leading-tight text-white shadow-xl sm:h-24 sm:w-24">
              10+
              <br />
              YEARS
            </span>
          </div>
        </div>

        <div ref={textRef}>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand">
            OUR STORY
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Stories.{" "}
            <span className="text-brand">
              Beautifully
              <br />
              Captured
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/70">
            At Madhu Mysore Photography, we believe every moment has a story.
            We freeze <span className="font-semibold text-ink">those moments</span>{" "}
            with creativity, passion and precision. From candid smiles to
            grand celebrations, we&apos;re here to make your memories
            timeless.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
            >
              Book a Shoot
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <p className="mt-10 font-script text-2xl leading-tight text-ink/40">
            Not just Photographs
            <br />
            But Memories
          </p>
        </div>
      </div>
    </section>
  );
}
