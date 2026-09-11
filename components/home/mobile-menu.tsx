"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { contact, contactEmail, navigation } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { contextSafe } = useGSAP({ scope: dialog });
  // contextSafe is applied at event time (not render) so refs are only read inside handlers.
  const closeMenu = () => contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(".mobile-menu-inner", { y: -20, autoAlpha: 0, duration: reduced ? 0 : 0.25, overwrite: true, onComplete: () => {
      dialog.current?.close(); setMenuOpen(false); menuButton.current?.focus();
    } });
  })();
  const openMenu = () => contextSafe(() => {
    dialog.current?.showModal(); setMenuOpen(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(".mobile-menu-inner", { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduced ? 0 : 0.5, overwrite: true, ease: "power3.out" });
    gsap.fromTo(".mobile-nav-link", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduced ? 0 : 0.65, stagger: reduced ? 0 : 0.08, overwrite: true, ease: "power3.out" });
  })();
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 701px)");
    const onResize = () => { if (desktop.matches) { dialog.current?.close(); setMenuOpen(false); } };
    desktop.addEventListener("change", onResize);
    return () => { document.body.style.overflow = previous; desktop.removeEventListener("change", onResize); };
  }, [menuOpen]);
  return (
    <>
      <button className="menu-toggle" ref={menuButton} onClick={openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation">MENU <span aria-hidden="true"><i /><i /></span></button>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top"><Image src="/tm-logo.svg" alt="Two Minds" width={150} height={27} /><button onClick={closeMenu} aria-label="Close navigation"><X /></button></div>
          <nav aria-label="Mobile navigation">{navigation.map(([label, id], index) => <a className="mobile-nav-link" key={id} href={`#${id}`} onClick={closeMenu}><small>0{index + 1}</small><span>{label}</span><ArrowUpRight /></a>)}</nav>
          <a className="mobile-project" href="#contact" onClick={closeMenu}>START A PROJECT <ArrowUpRight /></a>
          <a className="mobile-email" href={contact}>{contactEmail}</a>
        </div>
      </dialog>
    </>
  );
}
