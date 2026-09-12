"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contactEmail } from "@/lib/site";

gsap.registerPlugin(useGSAP);

/**
 * Branded "coming soon" dialog. Instead of wiring every link, this listens for clicks on any
 * mailto: link and opens the panel in its place; in-page anchors keep scrolling as normal.
 * Other components can open it with: window.dispatchEvent(new Event("coming-soon")).
 */
export function ComingSoon() {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const tl = gsap.timeline({ paused: true });
      if (context.conditions?.reduced) {
        tl.fromTo(panel.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: "none" });
      } else {
        tl.fromTo(panel.current, { autoAlpha: 0, y: 20, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "expo.out" })
          .fromTo(".soon-line", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" }, "<0.08");
      }
      timeline.current = tl;
      return () => { timeline.current = null; };
    });
  }, { scope: dialog });

  useEffect(() => {
    const open = () => {
      const element = dialog.current;
      if (!element || element.open) return;
      element.showModal();
      closeButton.current?.focus();
      timeline.current?.timeScale(1).play();
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link?.getAttribute("href")?.startsWith("mailto:")) return;
      event.preventDefault();
      opener.current = link as HTMLElement;
      open();
    };
    const onEvent = () => { opener.current = document.activeElement as HTMLElement; open(); };
    document.addEventListener("click", onClick);
    window.addEventListener("coming-soon", onEvent);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("coming-soon", onEvent); };
  }, []);

  const close = () => {
    const finish = () => {
      dialog.current?.close();
      opener.current?.focus?.({ preventScroll: true });
    };
    const tl = timeline.current;
    if (!tl || tl.progress() === 0) return finish();
    tl.eventCallback("onReverseComplete", finish);
    tl.timeScale(1.6).reverse();
  };

  return (
    <dialog
      ref={dialog}
      className="fixed inset-0 m-auto w-[min(92vw,440px)] overflow-visible border-0 bg-transparent p-0 text-[#e3eef0] backdrop:bg-[#131314cc] backdrop:backdrop-blur-[3px]"
      aria-labelledby="soon-title"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div ref={panel} className="relative overflow-hidden rounded-[24px] border border-[#ffffff14] bg-[#131314] px-7 pb-7 pt-6">
        {/* same two-tone split as the menu: one mind, then the other */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffffff40] to-transparent" aria-hidden="true" />
        <button
          ref={closeButton}
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-[#ffffff1f] text-[#e3eef0] motion-safe:transition-colors hover:bg-[#ffffff14]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <p className="soon-line m-0 font-machina text-[10px] tracking-[.28em] text-steel">TWO MINDS</p>
        <h2 id="soon-title" className="soon-line m-0 mt-4 font-machina text-[30px] font-normal leading-[1.05] tracking-[-.01em]">COMING<br />SOON.</h2>
        <p className="soon-line m-0 mt-4 max-w-[34ch] text-[14px] leading-[1.5] text-steel">
          We&apos;re still building this part. Check back soon.
        </p>
        <p className="soon-line m-0 mt-5 text-[13px] text-[#e3eef0]/70">{contactEmail}</p>
      </div>
    </dialog>
  );
}
