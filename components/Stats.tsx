"use client";

import { useRef } from "react";
import { Camera, Users, Trophy, Heart } from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { stats } from "@/lib/content";

const icons = [Camera, Users, Trophy, Heart];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current ? Array.from(sectionRef.current.children) : [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      stats.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-paper px-6 pb-4 lg:px-10">
      <div
        ref={sectionRef}
        className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 rounded-[1.75rem] bg-paper-dim px-8 py-8 sm:grid-cols-4 lg:px-12"
      >
        {stats.map((stat, index) => {
          const Icon = icons[index];
          return (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="font-display text-2xl font-extrabold leading-none"
                >
                  0{stat.suffix}
                </p>
                <p className="mt-1 text-xs font-medium text-ink/60">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
