"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/motion";
import type { portfolio } from "@/lib/content";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: typeof portfolio;
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      frameRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (event.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onNavigate]);

  const active = items[index];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index - 1 + items.length) % items.length);
        }}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={frameRef}
        onClick={(event) => event.stopPropagation()}
        className="relative mx-16 aspect-[4/5] w-full max-w-xl overflow-hidden rounded-2xl"
      >
        <Image
          src={active.image}
          alt={active.title}
          fill
          sizes="90vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
            {active.category.toUpperCase()}
          </p>
          <p className="mt-1 font-display text-xl font-bold text-white">
            {active.title}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index + 1) % items.length);
        }}
        aria-label="Next image"
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
