"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, CodeXml, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const navigation = [["COMPANY", "company"], ["INDUSTRIES", "industries"], ["SERVICES", "services"]];
const contact = "mailto:info@wearetwominds.com";
function ProjectButton() {
  return <a className="project-button" href="#contact"><CodeXml aria-hidden="true" /><span>START A PROJECT</span></a>;
}

function CardArt({ variant }: { variant: string }) {
  return <svg className={`card-art ${variant}`} viewBox="0 0 600 390" fill="none" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={variant === "signal" ? 230 : 400} cy={variant === "signal" ? 75 : 290} rx={75 + i * 24} ry={170 + i * 7} transform={`rotate(${i * 17 - 50} ${variant === "signal" ? 230 : 400} ${variant === "signal" ? 75 : 290})`} />)}
  </svg>;
}

function GrowthChart() {
  const heights = [30, 49, 67, 48, 80, 69, 39, 23, 15, 42, 53, 34, 43, 63, 20, 39, 81, 50, 32, 40, 68, 23, 22, 34, 42, 76, 28, 50, 37, 30, 75];
  return <svg className="growth-chart" viewBox="0 0 240 110" aria-hidden="true"><rect x="1" y="1" width="238" height="108" rx="20" fill="none" stroke="currentColor" strokeOpacity=".4" />{heights.map((h, i) => <rect key={i} x={9 + i * 7.2} y={100 - h} width="4.6" height={h} rx="1" fill="currentColor" />)}</svg>;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } })
        .from(".site-header", { y: -20, autoAlpha: 0 })
        .from(".hero-copy, .hero-title span", { y: 35, autoAlpha: 0, stagger: 0.12 }, 0.2)
        .from(".hero .project-button", { y: 18, autoAlpha: 0 }, 0.6);
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, { y: 35, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
    }, root);
    return () => media.revert();
  }, { scope: root });
  const { contextSafe } = useGSAP({ scope: root });
  const closeMenu = contextSafe(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(".mobile-menu-inner", { y: -20, autoAlpha: 0, duration: reduced ? 0 : 0.25, overwrite: true, onComplete: () => {
      dialog.current?.close(); setMenuOpen(false); menuButton.current?.focus();
    } });
  });
  const openMenu = contextSafe(() => {
    dialog.current?.showModal(); setMenuOpen(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(".mobile-menu-inner", { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduced ? 0 : 0.5, overwrite: true, ease: "power3.out" });
    gsap.fromTo(".mobile-nav-link", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: reduced ? 0 : 0.65, stagger: reduced ? 0 : 0.08, overwrite: true, ease: "power3.out" });
  });
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
    <div ref={root} className="homepage">
      <div className="ambient-background" aria-hidden="true"><svg viewBox="0 0 1000 4000" preserveAspectRatio="none">{Array.from({ length: 50 }, (_, i) => <polygon key={i} points={`${(i * 137) % 1000},${i * 83} ${(i * 137 + 290) % 1200},${i * 83 + 310} ${(i * 137 + 510) % 1100},${i * 83 - 100}`} fill={i % 2 ? "#cfdee2" : "#98a8a9"} opacity={0.035 + (i % 3) * .014} />)}</svg></div>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <button className="menu-toggle" ref={menuButton} onClick={openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation">MENU <span aria-hidden="true"><i /><i /></span></button>
        <a className="header-logo" href="#main" aria-label="Two Minds home"><Image src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} priority /></a>
      </header>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" onCancel={(event) => { event.preventDefault(); closeMenu(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top"><Image src="/tm-logo.svg" alt="Two Minds" width={150} height={27} /><button onClick={closeMenu} aria-label="Close navigation"><X /></button></div>
          <nav aria-label="Mobile navigation">{navigation.map(([label, id], index) => <a className="mobile-nav-link" key={id} href={`#${id}`} onClick={closeMenu}><small>0{index + 1}</small><span>{label}</span><ArrowUpRight /></a>)}</nav>
          <a className="mobile-project" href="#contact" onClick={closeMenu}>START A PROJECT <ArrowUpRight /></a>
          <a className="mobile-email" href={contact}>info@wearetwominds.com</a>
        </div>
      </dialog>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo" aria-hidden="true"><Image src="/design/hero-photo.webp" alt="" fill priority sizes="100vw" /></div>
          <p className="hero-copy">Secure, Scalable Systems<br />That Power Your Business.</p>
          <h1 className="hero-title" id="hero-title"><span>DESIGN &amp; ENGINEER</span><span>YOUR BUSINESS.</span></h1>
          <ProjectButton />
        </section>
        <section className="industries" id="industries" aria-labelledby="industry-title">
          <h2 className="industry-title reveal" id="industry-title">SYSTEMS BUILT FOR HOW YOUR<br /> INDUSTRY ACTUALLY WORKS.</h2>
          <div className="industry-grid">
            <a className="industry-card signal reveal" href={`${contact}?subject=Signal%20check`}><CardArt variant="signal" /><span className="card-tag">SIGNAL CHECK</span><h3>Know What Your<br />System Needs.</h3></a>
            <a className="industry-card operations reveal" href="#dashboard"><CardArt variant="operations" /><span className="card-tag">FIND YOUR INDUSTRY SYSTEM</span><h3>Manage Your<br />Operations, Customer Data,<br />&amp; Workflows In One System</h3></a>
            <a className="industry-card growth reveal" href="#dashboard"><CardArt variant="growth" /><GrowthChart /><span className="card-tag">FIND YOUR INDUSTRY SYSTEM</span><h3><strong>70%</strong>Scalable Growth Engines</h3></a>
            <a className="industry-card experience reveal" href={`${contact}?subject=Start%20your%20experience`}><CardArt variant="experience" /><span className="card-tag">START YOUR EXPERIENCE</span><h3>Design Experiences That<br />Connect, Engage, And Convert</h3></a>
          </div>
        </section>
        <section className="company" id="company" aria-label="About Two Minds">
          <div className="manifesto reveal"><p>WE ARE TWO MINDS BUT DRIVEN<br className="desktop-break" /> BY ONE VISION ONE GOAL TO MAKE<br className="desktop-break" /> YOUR BUSINESS RUN BETTER.</p><p>WE THINK BUSINESS FIRST.<br className="desktop-break" /> SYSTEMS NEXT. EXPERIENCE LAST.</p></div>
          <div className="services-visual reveal" id="services">
            <div className="laptop-photo"><Image src="/design/laptop-photo.webp" alt="Hands at a laptop" fill sizes="(max-width: 700px) 90vw, 82vw" /><Image className="laptop-logo" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} /></div>
            <div className="service-links">{["Build Your Business System", "Build Your Brand Experience", "Secure Your Operations"].map(label => <a key={label} href={`${contact}?subject=${encodeURIComponent(label)}`}><ArrowUpRight aria-hidden="true" />{label}</a>)}</div>
          </div>
        </section>
        <section className="dashboard-section" id="dashboard" aria-labelledby="dashboard-title">
          <div className="dashboard-panel reveal"><h2 id="dashboard-title">Control Your<br />Business in One View</h2><p>A centralized dashboard that transforms your data into clear<br className="desktop-break" /> insights, real-time decisions, and scalable growth.</p><Image src="/design/dashboard.webp" alt="Task management dashboard with project progress, workflows, schedules, and completed tasks" width={1262} height={760} sizes="(max-width: 700px) 85vw, 66vw" /></div>
          <div className="dashboard-cta reveal"><ProjectButton /></div>
        </section>
      </main>
      <footer id="contact" className="footer">
        <div className="footer-grid">
          <div className="contact-column"><form onSubmit={(event) => { event.preventDefault(); window.location.href = `${contact}?subject=Let%27s%20talk&body=${encodeURIComponent(`Please reach out to me at ${email}.`)}`; }}><label htmlFor="contact-email">Leave your email our team will<br />reach out with the next step.</label><div className="email-field"><input id="contact-email" type="email" placeholder="you@email.com" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" /><button aria-label="Start an email to Two Minds" type="submit"><ArrowRight /></button></div></form><p className="lets-talk">Lets Talk<br /><a href={contact}>info@wearetwominds.com</a></p></div>
          <div className="footer-column"><h2>COMPANY</h2><a href="#company">About</a><a href={`${contact}?subject=Careers`}>Careers</a><a href={`${contact}?subject=Blogs`}>Blogs</a><a href={contact}>Contact</a></div>
          <div className="footer-column"><h2>INDUSTRIES</h2>{["F&B", "FMCG", "Medical", "Retail", "Construction", "Engineering", "Logistics"].map(label => <a key={label} href={`${contact}?subject=${encodeURIComponent(label + " industry system")}`}>{label}</a>)}<a className="view-all" href="#industries">Veiw All</a></div>
          <div className="footer-column"><h2>SERVICES</h2>{["Web Development", "Cyber Secuirty", "CRM Systems"].map(label => <a key={label} href={`${contact}?subject=${encodeURIComponent(label)}`}>{label}</a>)}</div>
        </div>
        <Image className="footer-logo" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} />
        <p className="copyright">Copy Rights TwoMinds Crafted by YamenCreates</p>
      </footer>
    </div>
  );
}
