"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function RevealRoot({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".reveal", root.current);
      gsap.set(items, { y: 35, autoAlpha: 0 });
      ScrollTrigger.batch(items, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out", stagger: 0.1, overwrite: true }),
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="homepage">{children}</div>;
}
