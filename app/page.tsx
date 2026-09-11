import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, CodeXml } from "lucide-react";
import { ContactForm } from "@/components/home/contact-form";
import { RevealRoot } from "@/components/home/reveal-root";
import { SiteMenu } from "@/components/home/site-menu";
import { contact, contactEmail, navigation } from "@/lib/site";

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

function IndustryCard({ variant, href, children }: { variant: string; href: string; children: ReactNode }) {
  return <a className={`industry-card ${variant} reveal`} href={href}><div className="card-surface"><CardArt variant={variant} />{children}</div></a>;
}

export default function Home() {
  return (
    <RevealRoot>
      <div className="ambient-background" aria-hidden="true"><svg viewBox="0 0 1000 4000" preserveAspectRatio="none">{Array.from({ length: 50 }, (_, i) => <polygon key={i} points={`${(i * 137) % 1000},${i * 83} ${(i * 137 + 290) % 1200},${i * 83 + 310} ${(i * 137 + 510) % 1100},${i * 83 - 100}`} fill={i % 2 ? "#cfdee2" : "#98a8a9"} opacity={0.035 + (i % 3) * .014} />)}</svg></div>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <SiteMenu />
        <a className="header-logo" href="#main" aria-label="Two Minds home"><Image src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} priority /></a>
      </header>
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
            <IndustryCard variant="signal" href={`${contact}?subject=Signal%20check`}><span className="card-tag">SIGNAL CHECK</span><h3>Know What Your<br />System Needs.</h3></IndustryCard>
            <IndustryCard variant="operations" href="#dashboard"><span className="card-tag">FIND YOUR INDUSTRY SYSTEM</span><h3>Manage Your<br />Operations, Customer Data,<br />&amp; Workflows In One System</h3></IndustryCard>
            <IndustryCard variant="growth" href="#dashboard"><GrowthChart /><span className="card-tag">FIND YOUR INDUSTRY SYSTEM</span><h3><strong>70%</strong>Scalable Growth Engines</h3></IndustryCard>
            <IndustryCard variant="experience" href={`${contact}?subject=Start%20your%20experience`}><span className="card-tag">START YOUR EXPERIENCE</span><h3>Design Experiences That<br />Connect, Engage, And Convert</h3></IndustryCard>
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
          <div className="contact-column"><ContactForm /><p className="lets-talk">Lets Talk<br /><a href={contact}>{contactEmail}</a></p></div>
          <div className="footer-column"><h2>COMPANY</h2><a href="#company">About</a><a href={`${contact}?subject=Careers`}>Careers</a><a href={`${contact}?subject=Blogs`}>Blogs</a><a href={contact}>Contact</a></div>
          <div className="footer-column"><h2>INDUSTRIES</h2>{["F&B", "FMCG", "Medical", "Retail", "Construction", "Engineering", "Logistics"].map(label => <a key={label} href={`${contact}?subject=${encodeURIComponent(label + " industry system")}`}>{label}</a>)}<a className="view-all" href="#industries">Veiw All</a></div>
          <div className="footer-column"><h2>SERVICES</h2>{["Web Development", "Cyber Secuirty", "CRM Systems"].map(label => <a key={label} href={`${contact}?subject=${encodeURIComponent(label)}`}>{label}</a>)}</div>
        </div>
        <Image className="footer-logo" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} />
        <p className="copyright">Copy Rights TwoMinds Crafted by YamenCreates</p>
      </footer>
    </RevealRoot>
  );
}
