import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, CodeXml } from "lucide-react";
// Static imports so Next can generate the blur placeholders shown while the photos load.
import heroPhoto from "@/public/design/hero-photo.webp";
import laptopPhoto from "@/public/design/laptop-photo.webp";
import dashboardShot from "@/public/design/dashboard.webp";
import { ContactForm } from "@/components/home/contact-form";
import { FooterLogo } from "@/components/home/footer-logo";
import { HeaderLogo } from "@/components/home/header-logo";
import { RevealRoot } from "@/components/home/reveal-root";
import { SiteMenu } from "@/components/home/site-menu";
import { contact, contactEmail, navigation } from "@/lib/site";

// Sizes below 900px are fixed pixels; above, they scale with --u (1% of the 1920 artboard).
const button =
  "inline-flex items-center justify-center gap-[calc(.55*var(--u))] whitespace-nowrap rounded-full bg-[#ffffff60] px-[calc(2.3*var(--u))] font-semibold backdrop-blur-[15px] motion-safe:transition-[background-color,transform] motion-safe:duration-[250ms] hover:bg-[#ffffff90] hover:-translate-y-[3px] max-[900px]:gap-2 max-[900px]:px-[23px] max-[900px]:backdrop-blur-[12px]";
const buttonIcon = "w-[calc(3.7*var(--u))] h-[calc(3.7*var(--u))] stroke-2 max-[900px]:size-[27px]";
// Kept free of bottom/font-size so per-card values below can't collide with these at equal specificity.
const cardTitle =
  "absolute m-0 font-medium leading-[1.12] tracking-[calc(-.035*var(--u))] max-[900px]:bottom-[25px] max-[900px]:left-[22px] max-[900px]:leading-[1.15] max-[900px]:tracking-[-.4px]";
const cardTitleSize = "bottom-[9.3%] text-[calc(2.13*var(--u))] max-[900px]:text-[20px]";
// Insets are grid-relative (2.46cqw = 38px on the 1920 artboard) so every card gets the same
// gutter regardless of its column span, and it can't drift when --u is capped by a short screen.
const cardTag =
  "absolute right-[2.46cqw] top-[8%] whitespace-nowrap rounded-[40px] bg-[#ffffff35] px-[calc(1.15*var(--u))] text-[calc(1.3125*var(--u))] font-semibold leading-[calc(2.7*var(--u))] max-[900px]:right-4 max-[900px]:top-[18px] max-[900px]:px-3 max-[900px]:text-[10px] max-[900px]:leading-[25px]";
// Hover: the link glides a few px to the right and eases back. Nothing else changes.
const footerLink =
  "inline-block ease-[cubic-bezier(.19,1,.22,1)] motion-safe:transition-transform motion-safe:duration-[400ms] hover:translate-x-[6px]";
const tabletColumn = "min-[601px]:max-[900px]:mx-auto min-[601px]:max-[900px]:max-w-[620px]";

function ProjectButton({ className = "" }: { className?: string }) {
  return (
    <a
      className={`${button} h-[calc(5.75*var(--u))] text-[calc(1.75*var(--u))] max-[900px]:h-[52px] max-[900px]:text-[13px] ${className}`}
      href="#contact"
    >
      <CodeXml className={buttonIcon} aria-hidden="true" />
      <span>START A PROJECT</span>
    </a>
  );
}

function CardArt({ variant }: { variant: string }) {
  const signal = variant === "signal";
  return (
    <svg
      className={`absolute inset-0 h-full w-full stroke-2 motion-safe:transition-transform motion-safe:duration-[800ms] group-hover:scale-[1.07] group-hover:rotate-[4deg] ${signal ? "stroke-white opacity-[.18]" : "stroke-steel opacity-[.15]"}`}
      viewBox="0 0 600 390"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={signal ? 230 : 400} cy={signal ? 75 : 290} rx={75 + i * 24} ry={170 + i * 7} transform={`rotate(${i * 17 - 50} ${signal ? 230 : 400} ${signal ? 75 : 290})`} />)}
    </svg>
  );
}

function GrowthChart() {
  const heights = [30, 49, 67, 48, 80, 69, 39, 23, 15, 42, 53, 34, 43, 63, 20, 39, 81, 50, 32, 40, 68, 23, 22, 34, 42, 76, 28, 50, 37, 30, 75];
  return (
    <svg className="absolute bottom-[10%] right-[2.46cqw] h-[45%] w-[41%] text-white max-[900px]:bottom-[26px] max-[900px]:right-[18px] max-[900px]:w-[42%]" viewBox="0 0 240 110" aria-hidden="true">
      <rect x="1" y="1" width="238" height="108" rx="20" fill="none" stroke="currentColor" strokeOpacity=".4" />
      {heights.map((h, i) => <rect key={i} x={9 + i * 7.2} y={100 - h} width="4.6" height={h} rx="1" fill="currentColor" />)}
    </svg>
  );
}

// Height comes from the card's own width (the artboard's 633x389 / 898x389 tiles) rather than from
// --u, so the cards keep their proportions even when --u is capped by a short viewport.
function IndustryCard({ variant, span, href, children }: { variant: string; span: string; href: string; children: ReactNode }) {
  const aspect = span === "col-span-7" ? "aspect-[898/389]" : "aspect-[633/389]";
  return (
    <a
      className={`reveal group relative block rounded-[calc(2.8*var(--u))] ${span} ${aspect} max-[900px]:aspect-auto before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:shadow-[0_10px_35px_#13131415] before:content-[''] motion-safe:transition-transform motion-safe:duration-300 motion-safe:before:transition-opacity motion-safe:before:duration-300 hover:-translate-y-[5px] hover:before:opacity-100 max-[900px]:col-auto max-[900px]:h-[240px] max-[900px]:rounded-[26px] min-[601px]:max-[900px]:h-[280px]`}
      href={href}
    >
      <div className={`absolute inset-0 overflow-hidden rounded-[inherit] ${variant === "signal" ? "border border-[#ffffff80] bg-signal" : "bg-mist"}`}>
        <CardArt variant={variant} />
        {children}
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <RevealRoot>
      <div className="absolute inset-y-0 left-1/2 -z-20 w-screen -translate-x-1/2 bg-ambient" aria-hidden="true" />
      <a href="#main" className="fixed left-5 top-2.5 z-20 -translate-y-[150%] bg-ink p-3 focus:translate-y-0">Skip to content</a>
      <header className="absolute left-[5.4%] right-[4.5%] top-[calc(3.75*var(--u))] z-[3] max-[900px]:fixed flex items-center justify-between text-ink [--rise:-20px] motion-safe:animate-intro-rise max-[900px]:left-[5%] max-[900px]:right-[5%] max-[900px]:top-[22px]">
        <nav className="flex h-[calc(5.09*var(--u))] w-[calc(36.7*var(--u))] items-center justify-evenly rounded-full bg-[#ffffff60] font-machina text-[calc(1.43*var(--u))] font-light backdrop-blur-[15px] max-[900px]:hidden" aria-label="Main navigation">
          {navigation.map(([label, id]) => <a className="px-[calc(.8*var(--u))] py-[calc(1*var(--u))] motion-safe:transition-opacity hover:opacity-50" key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <SiteMenu />
        <HeaderLogo />
      </header>
      <main id="main">
        <section className="relative h-[calc(70*var(--u))] max-[900px]:h-[760px] max-[900px]:max-h-[1000px]" aria-labelledby="hero-title">
          <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(#000_0%,#000_63%,transparent_100%)] max-[900px]:h-[620px] max-[900px]:[mask-image:linear-gradient(#000_0%,#000_60%,transparent_100%)]" aria-hidden="true">
            <Image className="object-cover object-[50%_0] max-[900px]:object-[58%_top]" src={heroPhoto} alt="" fill priority sizes="100vw" placeholder="blur" />
          </div>
          <p className="absolute left-[5.68%] top-[calc(27.1*var(--u))] m-0 text-[calc(2.035*var(--u))] leading-[1.2] text-ink motion-safe:animate-intro-rise motion-safe:[animation-delay:.2s] max-[900px]:left-[6%] max-[900px]:top-[348px] max-[900px]:text-[17px] max-[900px]:leading-[1.35] max-[900px]:text-white max-[900px]:[text-shadow:0_1px_14px_#00000073]">Secure, Scalable Systems<br />That Power Your Business.</p>
          <h1 className="absolute left-[5.2%] top-[calc(39.4*var(--u))] m-0 font-machina text-[calc(6.35*var(--u))] font-normal leading-[1.025] tracking-[calc(-.18*var(--u))] max-[900px]:left-[6%] max-[900px]:right-[4%] max-[900px]:top-[440px] max-[900px]:text-[clamp(28px,6.35vw,44px)] max-[900px]:leading-[1.15] max-[900px]:tracking-[-1px]" id="hero-title">
            <span className="block motion-safe:animate-intro-slide motion-safe:[animation-delay:.32s]">DESIGN &amp; ENGINEER</span>
            <span className="block motion-safe:animate-intro-slide motion-safe:[animation-delay:.44s]">YOUR BUSINESS.</span>
          </h1>
          <ProjectButton className="absolute left-[39.3%] top-[calc(57.55*var(--u))] [--rise:18px] motion-safe:animate-intro-lift motion-safe:[animation-delay:.6s] max-[900px]:left-1/2 max-[900px]:top-[590px] max-[900px]:-translate-x-1/2" />
        </section>
        <section className="pt-[calc(1.4*var(--u))] max-[900px]:pt-0" id="industries" aria-labelledby="industry-title">
          <h2 className={`reveal m-0 mb-[calc(4.95*var(--u))] text-center font-machina text-[calc(3.984*var(--u))] font-normal leading-[1.035] tracking-[calc(-.105*var(--u))] max-[900px]:mb-8 max-[900px]:px-[6%] max-[900px]:text-[clamp(23px,5.6vw,37px)] max-[900px]:leading-[1.08] max-[900px]:tracking-[-.7px] max-[900px]:[&_br]:hidden ${tabletColumn}`} id="industry-title">SYSTEMS BUILT FOR HOW YOUR<br /> INDUSTRY ACTUALLY WORKS.</h2>
          <div className={`@container mx-auto grid w-[81.25%] grid-cols-12 gap-x-[calc(1.5*var(--u))] gap-y-[calc(1.6*var(--u))] max-[900px]:w-[90%] max-[900px]:grid-cols-1 max-[900px]:gap-4 ${tabletColumn}`}>
            <IndustryCard variant="signal" span="col-span-5" href={`${contact}?subject=Signal%20check`}>
              <span className={cardTag}>SIGNAL CHECK</span>
              <h3 className={`${cardTitle} ${cardTitleSize} left-[6.6%]`}>Know What Your<br />System Needs.</h3>
            </IndustryCard>
            <IndustryCard variant="operations" span="col-span-7" href="#dashboard">
              <span className={cardTag}>FIND YOUR INDUSTRY SYSTEM</span>
              <h3 className={`${cardTitle} ${cardTitleSize} left-[4.7%]`}>Manage Your<br />Operations, Customer Data,<br />&amp; Workflows In One System</h3>
            </IndustryCard>
            <IndustryCard variant="growth" span="col-span-7" href="#dashboard">
              <GrowthChart />
              <span className={cardTag}>FIND YOUR INDUSTRY SYSTEM</span>
              {/* max-width stops the line short of the chart: it wraps instead of running under it. */}
              <h3 className={`${cardTitle} bottom-[8%] left-[2.6%] max-w-[calc(56.4%-1*var(--u))] text-[calc(2.13*var(--u))] max-[900px]:text-[17px]`}><strong className="block text-[calc(5.6*var(--u))] font-semibold leading-[.95] max-[900px]:text-[52px]">70%</strong>Scalable Growth Engines</h3>
            </IndustryCard>
            <IndustryCard variant="experience" span="col-span-5" href={`${contact}?subject=Start%20your%20experience`}>
              <span className={cardTag}>START YOUR EXPERIENCE</span>
              <h3 className={`${cardTitle} ${cardTitleSize} left-[4.7%]`}>Design Experiences That<br />Connect, Engage, And Convert</h3>
            </IndustryCard>
          </div>
        </section>
        <section className="pt-[calc(13.85*var(--u))] max-[900px]:pt-[85px]" id="company" aria-label="About Two Minds">
          <div className={`reveal ml-[10.95%] font-machina text-[calc(3.973*var(--u))] font-light leading-[1.035] tracking-[calc(-.06*var(--u))] max-[900px]:mx-[7%] max-[900px]:text-[clamp(23px,5.7vw,37px)] max-[900px]:leading-[1.17] max-[900px]:tracking-[-.55px] ${tabletColumn}`}>
            <p className="m-0 mb-[calc(3.98*var(--u))] max-[900px]:mb-7">WE ARE TWO MINDS BUT DRIVEN<br className="max-[900px]:hidden" /> BY ONE VISION ONE GOAL TO MAKE<br className="max-[900px]:hidden" /> YOUR BUSINESS RUN BETTER.</p>
            <p className="m-0 mb-[calc(3.98*var(--u))] max-[900px]:mb-7">WE THINK BUSINESS FIRST.<br className="max-[900px]:hidden" /> SYSTEMS NEXT. EXPERIENCE LAST.</p>
          </div>
          {/* @container: the links panel sizes itself from this block's width (cqw), not the viewport. */}
          <div className={`reveal-move @container relative mx-auto mt-[calc(11.85*var(--u))] w-[81.15%] max-[900px]:mt-[55px] max-[900px]:w-[90%] ${tabletColumn}`} id="services">
            <div className="relative aspect-[1558/931] w-full overflow-hidden rounded-[calc(2.8*var(--u))] border border-[#ffffff50] bg-[#070909] max-[900px]:aspect-[1.22] max-[900px]:rounded-[25px]">
              <Image className="object-cover object-[50%_7%] max-[900px]:object-center" src={laptopPhoto} alt="Hands at a laptop" fill sizes="(max-width: 900px) 90vw, 82vw" placeholder="blur" />
              <Image className="absolute left-[13.5%] top-[32%] h-auto w-[73%] brightness-0 invert max-[900px]:left-[10%] max-[900px]:top-[35%] max-[900px]:w-[80%]" src="/tm-logo.svg" alt="Two Minds" width={1076} height={190} />
            </div>
            <div className="absolute left-1/2 top-[80.8%] w-max max-w-[92cqw] -translate-x-1/2 rounded-[3.33cqw] bg-[#ffffff60] px-[4.37cqw] py-[2.96cqw] backdrop-blur-[10px] max-[900px]:top-[85%] max-[900px]:w-[90%] max-[900px]:rounded-[22px] max-[900px]:px-4 max-[900px]:py-[18px]">
              {["Build Your Business System", "Build Your Brand Experience", "Secure Your Operations"].map(label => (
                <a className="group flex items-center gap-[1.36cqw] whitespace-nowrap text-[3.98cqw] leading-[1.46] tracking-[-.09cqw] max-[900px]:gap-2 max-[900px]:text-[clamp(15px,3.8vw,23px)] max-[900px]:leading-[1.65] max-[900px]:tracking-[-.3px]" key={label} href={`${contact}?subject=${encodeURIComponent(label)}`}>
                  <ArrowUpRight className="h-[4.07cqw] w-[4.07cqw] flex-none stroke-[1.15] motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] max-[900px]:size-[23px]" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="pb-[calc(19.6*var(--u))] pt-[calc(25.4*var(--u))] text-center max-[900px]:pb-[100px] max-[900px]:pt-[155px]" id="dashboard" aria-labelledby="dashboard-title">
          <div className={`reveal mx-auto w-[82.3%] rounded-[calc(4*var(--u))] bg-[#ffffff60] px-[calc(4*var(--u))] pb-[calc(5.9*var(--u))] pt-[calc(4.9*var(--u))] max-[900px]:w-[90%] max-[900px]:rounded-[28px] max-[900px]:px-[15px] max-[900px]:pb-[25px] max-[900px]:pt-[35px] ${tabletColumn}`}>
            <h2 className="m-0 mb-[calc(1.3*var(--u))] text-[calc(5.1*var(--u))] font-semibold leading-[1.2] tracking-[calc(-.15*var(--u))] max-[900px]:mb-[17px] max-[900px]:text-[clamp(29px,7.3vw,45px)] max-[900px]:leading-[1.13] max-[900px]:tracking-[-1px]" id="dashboard-title">Control Your<br />Business in One View</h2>
            <p className="m-0 mb-[calc(3.6*var(--u))] text-[calc(2.13*var(--u))] font-normal leading-[1.13] max-[900px]:mx-2 max-[900px]:mb-[27px] max-[900px]:text-[15px] max-[900px]:leading-[1.35]">A centralized dashboard that transforms your data into clear<br className="max-[900px]:hidden" /> insights, real-time decisions, and scalable growth.</p>
            <Image className="mx-auto block h-auto w-[82.8%] rounded-[calc(2.1*var(--u))] max-[900px]:w-full max-[900px]:rounded-[14px]" src={dashboardShot} alt="Task management dashboard with project progress, workflows, schedules, and completed tasks" sizes="(max-width: 900px) 85vw, 66vw" placeholder="blur" />
          </div>
          <div className="reveal-move mt-[calc(4.25*var(--u))] max-[900px]:mt-7">
            <ProjectButton className="h-[calc(6.32*var(--u))] text-[calc(1.93*var(--u))] max-[900px]:h-[52px] max-[900px]:text-[13px]" />
          </div>
        </section>
      </main>
      {/* ::before carries the gradient full-bleed while the content stays inside the frame. */}
      <footer className="relative isolate px-[3.45%] pb-[calc(2.2*var(--u))] pt-[calc(6.7*var(--u))] before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-footer before:content-[''] max-[900px]:px-[6%] max-[900px]:pb-5 max-[900px]:pt-[45px]" id="contact">
        <div className={`grid grid-cols-[38.3%_19.7%_20%_22%] text-[calc(1.755*var(--u))] leading-[1.3] max-[900px]:grid-cols-2 max-[900px]:gap-x-6 max-[900px]:gap-y-9 max-[900px]:text-[14px] ${tabletColumn}`}>
          <div className="max-[900px]:col-span-full">
            <ContactForm />
            <p className="mb-0 mt-[calc(11.55*var(--u))] text-[calc(2*var(--u))] leading-[1.12] max-[900px]:mt-[30px] max-[900px]:text-[17px] max-[900px]:leading-[1.3]">Let&apos;s Talk<br /><a className={footerLink} href={contact}>{contactEmail}</a></p>
          </div>
          <div className="flex flex-col items-start gap-[calc(1.45*var(--u))] max-[900px]:gap-3">
            <h2 className="m-0 mb-[calc(.55*var(--u))] font-machina text-[calc(1.79*var(--u))] font-extrabold max-[900px]:mb-[7px] max-[900px]:text-[14px]">COMPANY</h2>
            <a className={footerLink} href="#company">About</a>
            <a className={footerLink} href={`${contact}?subject=Careers`}>Careers</a>
            <a className={footerLink} href={`${contact}?subject=Blogs`}>Blogs</a>
            <a className={footerLink} href={contact}>Contact</a>
          </div>
          <div className="flex flex-col items-start gap-[calc(1.45*var(--u))] max-[900px]:gap-3">
            <h2 className="m-0 mb-[calc(.55*var(--u))] font-machina text-[calc(1.79*var(--u))] font-extrabold max-[900px]:mb-[7px] max-[900px]:text-[14px]">INDUSTRIES</h2>
            {["F&B", "FMCG", "Medical", "Retail", "Construction", "Engineering", "Logistics"].map(label => <a className={footerLink} key={label} href={`${contact}?subject=${encodeURIComponent(label + " industry system")}`}>{label}</a>)}
            <a className={`${footerLink} underline underline-offset-4`} href="#industries">View All</a>
          </div>
          <div className="flex flex-col items-start gap-[calc(1.45*var(--u))] max-[900px]:gap-3">
            <h2 className="m-0 mb-[calc(.55*var(--u))] font-machina text-[calc(1.79*var(--u))] font-extrabold max-[900px]:mb-[7px] max-[900px]:text-[14px]">SERVICES</h2>
            {["Web Development", "Cyber Security", "CRM Systems"].map(label => <a className={footerLink} key={label} href={`${contact}?subject=${encodeURIComponent(label)}`}>{label}</a>)}
          </div>
        </div>
        {/* Inline SVG (not <Image>) so the wordmark can draw itself in. No scaleY: true proportions. */}
        <FooterLogo className="mt-[calc(8*var(--u))] block h-auto w-full brightness-0 max-[900px]:mt-12" />
      </footer>
    </RevealRoot>
  );
}
