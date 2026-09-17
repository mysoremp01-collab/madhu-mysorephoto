import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14 8.5h2V5.5h-2c-2 0-3.5 1.6-3.5 3.6V11H8.5v3H10.5v6h3v-6h2.2l.5-3H13.5V9.3c0-.5.4-.8.9-.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.5 17.5 5 20l2.6-1.4a7.5 7.5 0 1 0-1.9-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 9.7c0-.5.4-1 1-1h.6c.3 0 .5.2.6.4l.6 1.4c.1.2 0 .5-.1.6l-.5.5c.4.9 1.1 1.6 2 2l.5-.5c.1-.1.4-.2.6-.1l1.4.6c.2.1.4.3.4.6v.6c0 .6-.5 1-1 1-3 0-6-3-6-6Z"
        fill="currentColor"
      />
    </svg>
  );
}
