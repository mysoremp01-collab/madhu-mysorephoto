"use client";

import { useRef, useState } from "react";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import { gsap, registerGsap, useIsomorphicLayoutEffect } from "@/lib/motion";
import { quickLinks, serviceLinks } from "@/lib/content";
import { InstagramIcon, FacebookIcon, YoutubeIcon, WhatsappIcon } from "./icons";

const socials = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { icon: WhatsappIcon, href: "https://wa.me/911234567890", label: "WhatsApp" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-light to-brand-dark text-white">
                <Camera className="h-4.5 w-4.5" strokeWidth={2.2} />
              </span>
              <span className="leading-none">
                <span className="block font-display text-lg font-extrabold tracking-tight">
                  MADHU
                </span>
                <span className="block text-[10px] font-medium tracking-[0.25em] text-white/60">
                  MYSORE PHOTOGRAPHY
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Capturing timeless moments with creativity, passion and
              precision.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide">Quick Links</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide">Our Services</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide">Contact Us</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                Mysore, Karnataka, India
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-light" />
                +91 12345 67890
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-light" />
                hello@madhuphotography.com
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0 text-brand-light" />
                www.madhuphotography.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold tracking-wide">Newsletter</h3>
              <p className="mt-1 text-sm text-white/60">
                Subscribe to get updates on our latest works &amp; offers.
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                setEmail("");
              }}
              className="flex w-full max-w-sm items-center gap-2 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-light"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          {submitted && (
            <p className="mt-2 text-xs text-brand-light">
              Thanks for subscribing!
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/50 sm:flex-row lg:px-10">
          <p>&copy; 2026 Madhu Mysore Photography. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms &amp; Conditions
            </a>
          </div>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-light"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
