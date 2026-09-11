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
      // Blocks holding a backdrop-filter panel must not fade in: while opacity animates, Chrome
      // paints the blurred backdrop before its content and drops the rounded clip, so you get an
      // empty square blur box that then pops. Those blocks only move (.reveal-move).
      const reveal = (selector: string, vars: gsap.TweenVars) => {
        const items = gsap.utils.toArray<HTMLElement>(selector, root.current);
        if (!items.length) return;
        gsap.set(items, { y: 35, ...("autoAlpha" in vars ? { autoAlpha: 0 } : {}) });
        ScrollTrigger.batch(items, {
          start: "top 94%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, overwrite: true, ...vars }),
        });
      };
      reveal(".reveal", { autoAlpha: 1 });
      reveal(".reveal-move", {});
    });
    return () => media.revert();
  }, { scope: root });
  // The frame: content caps at the 1920 artboard (120rem = 100u) and centres on wider screens.
  return <div ref={root} className="relative isolate mx-auto w-full max-w-[120rem] bg-[#a2b4b6]">{children}</div>;
}
