"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, CodeXml } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contact, contactEmail, navigation } from "@/lib/site";

gsap.registerPlugin(useGSAP);

// Unprefixed class names below (menu-panel, menu-label, …) are GSAP animation targets, not styles.
const pill = "flex items-center gap-[15px] rounded-[50px] border-0 px-[18px] py-[13px] font-machina text-[11px] tracking-[.08em] cursor-pointer";
const tabletColumn = "min-[601px]:mx-auto min-[601px]:w-full min-[601px]:max-w-[620px]";

function lockScroll() {
  const html = document.documentElement;
  const gap = window.innerWidth - html.clientWidth;
  html.style.overflow = "hidden";
  html.style.paddingRight = gap ? `${gap}px` : "";
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
}

/** Full-screen mobile menu. Desktop uses the inline pill nav, so the toggle is hidden above 900px. */
export function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.inOut" } });
      if (context.conditions?.reduced) {
        tl.fromTo(".menu-overlay-inner, .menu-panel", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" });
      } else {
        // Two halves close in from opposite edges and meet at the seam: two minds, one view.
        tl.fromTo(".menu-panel-left", { yPercent: -100 }, { yPercent: 0, duration: 0.95 })
          .fromTo(".menu-panel-right", { yPercent: 100 }, { yPercent: 0, duration: 0.95 }, "<0.06")
          .fromTo(".menu-bar", { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.4")
          .fromTo(".menu-close i:first-child", { rotate: 0, top: "0%" }, { rotate: 45, top: "50%", duration: 0.5, ease: "power3.out" }, "<")
          .fromTo(".menu-close i:last-child", { rotate: 0, top: "100%" }, { rotate: -45, top: "50%", duration: 0.5, ease: "power3.out" }, "<")
          .fromTo(".menu-label", { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, "<-0.1")
          .fromTo(".menu-index, .menu-arrow", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "<0.2")
          .fromTo(".menu-rule", { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.08, ease: "expo.out" }, "<-0.2")
          .fromTo(".menu-footer > *", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, "<0.15");
      }
      timeline.current = tl;
      return () => { timeline.current = null; };
    });
  }, { scope: dialog });

  // Rotating or resizing past the breakpoint hides the menu, so drop it instantly and release the scroll lock.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (!desktop.matches) return;
      timeline.current?.pause(0);
      dialog.current?.close();
      unlockScroll();
      setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [open]);

  const openMenu = () => {
    const element = dialog.current;
    if (!element || element.open) return;
    lockScroll();
    element.showModal();
    setOpen(true);
    closeButton.current?.focus();
    timeline.current?.timeScale(1).play();
  };

  const closeMenu = (then?: () => void) => {
    const finish = () => {
      dialog.current?.close();
      unlockScroll();
      setOpen(false);
      toggle.current?.focus({ preventScroll: true });
      then?.();
    };
    const tl = timeline.current;
    if (!tl || tl.progress() === 0) return finish();
    tl.eventCallback("onReverseComplete", finish);
    tl.timeScale(1.7).reverse();
  };

  // Close first, then scroll, so the page isn't jumping underneath the exit animation.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    closeMenu(() => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <>
      <button className={`menu-toggle hidden bg-[#ffffff75] text-ink max-[900px]:flex ${pill}`} ref={toggle} onClick={openMenu} aria-expanded={open} aria-controls="site-menu">
        MENU <span className="grid gap-[5px]" aria-hidden="true"><i className="block h-px w-[17px] bg-current" /><i className="block h-px w-[17px] bg-current" /></span>
      </button>
      <dialog
        ref={dialog}
        id="site-menu"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-[#e3eef0] backdrop:bg-transparent min-[901px]:open:hidden"
        aria-label="Site menu"
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
      >
        <div className="menu-panel menu-panel-left absolute inset-y-0 left-0 w-[50.1%] bg-ink" aria-hidden="true" />
        <div className="menu-panel menu-panel-right absolute inset-y-0 right-0 w-[50.1%] border-l border-[#ffffff12] bg-[#181d1e]" aria-hidden="true" />
        <div className="menu-overlay-inner relative grid h-full grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] px-[5%] pb-6 pt-[22px]">
          <div className="menu-bar flex items-center justify-between">
            <button className={`menu-close bg-[#ffffff14] text-inherit ${pill}`} ref={closeButton} onClick={() => closeMenu()}>
              CLOSE <span className="relative h-[6px] w-[17px]" aria-hidden="true"><i className="absolute left-0 top-1/2 h-px w-full bg-current [transform:rotate(45deg)]" /><i className="absolute left-0 top-1/2 h-px w-full bg-current [transform:rotate(-45deg)]" /></span>
            </button>
            <a className="w-[140px]" href="#main" onClick={(event) => goTo(event, "main")} aria-label="Two Minds home">
              <Image className="h-auto w-full brightness-0 invert" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} />
            </a>
          </div>
          <nav className={`flex flex-col self-center ${tabletColumn}`} aria-label="Mobile navigation">
            {navigation.map(([label, id], index) => (
              <a key={id} className="relative flex items-start gap-3 py-[14px]" href={`#${id}`} onClick={(event) => goTo(event, id)}>
                <span className="menu-index min-w-[18px] pt-[6px] text-[11px] text-steel">0{index + 1}</span>
                <span className="block min-w-0 overflow-hidden pb-[.06em]"><span className="menu-label block font-machina text-[clamp(34px,11vw,64px)] font-normal leading-none tracking-[-.02em]">{label}</span></span>
                <ArrowUpRight className="menu-arrow ml-auto h-auto w-[28px] flex-none self-center stroke-1" aria-hidden="true" />
                <span className="menu-rule absolute inset-x-0 bottom-0 h-px origin-left bg-[#ffffff1f]" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className={`menu-footer grid gap-[14px] border-t border-[#ffffff1f] pt-5 text-[14px] leading-[1.3] ${tabletColumn}`}>
            <p className="m-0 text-steel">Secure, Scalable Systems<br />That Power Your Business.</p>
            <a href={contact}>{contactEmail}</a>
            <a className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#e3eef0] text-[13px] font-semibold text-ink" href="#contact" onClick={(event) => goTo(event, "contact")}>
              <CodeXml className="size-[22px]" aria-hidden="true" />START A PROJECT
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
