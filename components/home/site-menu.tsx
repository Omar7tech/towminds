"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, CodeXml } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contact, contactEmail, navigation } from "@/lib/site";

gsap.registerPlugin(useGSAP);

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

/** Full-screen mobile menu. Desktop uses the inline pill nav, so the toggle is hidden above 700px. */
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
    const desktop = window.matchMedia("(min-width: 701px)");
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
      <button className="menu-toggle" ref={toggle} onClick={openMenu} aria-expanded={open} aria-controls="site-menu">
        MENU <span aria-hidden="true"><i /><i /></span>
      </button>
      <dialog ref={dialog} id="site-menu" className="menu-overlay" aria-label="Site menu" onCancel={(event) => { event.preventDefault(); closeMenu(); }}>
        <div className="menu-panel menu-panel-left" aria-hidden="true" />
        <div className="menu-panel menu-panel-right" aria-hidden="true" />
        <div className="menu-overlay-inner">
          <div className="menu-bar">
            <button className="menu-close" ref={closeButton} onClick={() => closeMenu()}>CLOSE <span aria-hidden="true"><i /><i /></span></button>
            <a className="menu-logo" href="#main" onClick={(event) => goTo(event, "main")} aria-label="Two Minds home"><Image src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} /></a>
          </div>
          <nav className="menu-nav" aria-label="Mobile navigation">
            {navigation.map(([label, id], index) => (
              <a key={id} className="menu-link" href={`#${id}`} onClick={(event) => goTo(event, id)}>
                <span className="menu-index">0{index + 1}</span>
                <span className="menu-label-mask"><span className="menu-label">{label}</span></span>
                <ArrowUpRight className="menu-arrow" aria-hidden="true" />
                <span className="menu-rule" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="menu-footer">
            <p>Secure, Scalable Systems<br />That Power Your Business.</p>
            <a href={contact}>{contactEmail}</a>
            <a className="menu-cta" href="#contact" onClick={(event) => goTo(event, "contact")}><CodeXml aria-hidden="true" />START A PROJECT</a>
          </div>
        </div>
      </dialog>
    </>
  );
}
