"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * The header is fixed on mobile, so the wordmark would otherwise sit on top of the content
 * scrolling under it. It fades out once you leave the top of the page and comes back when you
 * return; the MENU pill stays, since it carries its own surface and always reads.
 * Desktop is untouched: the fade is scoped to max-[900px].
 */
export function HeaderLogo() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let queued = false;
    const update = () => {
      queued = false;
      el.dataset.scrolled = window.scrollY > 60 ? "true" : "false";
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={ref}
      className="w-[calc(17.1*var(--u))] max-[900px]:w-[140px] max-[900px]:data-[scrolled=true]:pointer-events-none max-[900px]:data-[scrolled=true]:opacity-0 motion-safe:transition-opacity motion-safe:duration-[350ms] motion-safe:ease-[cubic-bezier(.19,1,.22,1)]"
      href="#main"
      aria-label="Two Minds home"
    >
      <Image className="h-auto w-full brightness-0" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} priority />
    </a>
  );
}
