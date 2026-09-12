import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Plus,
  Terminal,
  TestTube2,
  X,
} from "lucide-react";
import { toast } from "sonner";

const githubUrl = "https://github.com/andrefleisch";
const linkedinUrl = "https://linkedin.com/in/andrefleischfresser";
const email = "andrefleisch2@gmail.com";

const projectLinks = {
  gap: "https://github.com/andrefleisch/Gap",
  helpDesk: "https://github.com/andrefleisch/HelpDesk",
  elderWatch: "https://github.com/andrefleisch/Elder-Watch",
  promoSearch: "https://github.com/andrefleisch/PromoSearch",
  habitTracker: "https://github.com/andrefleisch/habit-tracker",
  tableTennis: "https://github.com/andrefleisch/TableTennisManager",
  promoSearchJava: "https://github.com/andrefleisch/PromoSearch-Java",
};

// Add one real image URL per project when ready; undefined keeps the editorial rows unchanged.
const projectImages: Record<"helpDesk" | "elderWatch" | "promoSearch", string | undefined> = {
  helpDesk: undefined,
  elderWatch: undefined,
  promoSearch: undefined,
};

const navItems = [
  { label: "Overview", href: "#hero", testId: "nav-link-overview" },
  { label: "Gap", href: "#gap-centerpiece", testId: "nav-link-gap" },
  { label: "Projects", href: "#featured-projects", testId: "nav-link-projects" },
  { label: "Experience", href: "#experience", testId: "nav-link-experience" },
  { label: "Contact", href: "#contact", testId: "nav-link-contact" },
];

const pathStages = [
  {
    number: "01",
    title: "Robotics & embedded systems",
    text: "Robotics taught me to experiment with physical systems, where software has to respond to real constraints.",
    icon: Cpu,
    accent: "vermilion",
  },
  {
    number: "02",
    title: "Backend & full stack",
    text: "Backend development taught me to think in architecture, business rules, data and the contracts between them.",
    icon: Layers3,
    accent: "cobalt",
  },
  {
    number: "03",
    title: "Professional automation",
    text: "Test automation taught me to care about reliability, maintainability and the edge cases that shape a product.",
    icon: TestTube2,
    accent: "sage",
  },
  {
    number: "04",
    title: "Native iOS & product",
    text: "Building native iOS apps is teaching me more about product decisions and the relationship between technology and the user.",
    icon: Code2,
    accent: "violet",
  },
];

const smallerProjects = [
  {
    title: "Habit Tracker",
    description: "A full stack habit tracker focused on check-ins, streaks, consistency calculation and idempotent operations.",
    link: projectLinks.habitTracker,
    discipline: "Full stack",
  },
  {
    title: "TableTennisManager",
    description: "A collaborative university Python project for organizing table-tennis player queues and match history.",
    link: projectLinks.tableTennis,
    discipline: "PUCPR · Python",
  },
  {
    title: "PromoSearch Java",
    description: "A smaller Java/JavaFX desktop implementation related to the PromoSearch concept.",
    link: projectLinks.promoSearchJava,
    discipline: "Java · JavaFX",
  },
];

function ExternalProjectLink({ href, children, testId }: { href: string; children: React.ReactNode; testId: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function SectionLabel({ number, children, testId }: { number: string; children: React.ReactNode; testId: string }) {
  return (
    <div data-testid={testId} className="mb-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate">
      <span className="font-mono text-vermilion">{number}</span>
      <span className="h-px w-8 bg-slate-300" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function PlaceholderScreen({ label, screen, accent, selected, onSelect }: { label: string; screen: string; accent: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-testid={`gap-screenshot-${screen.toLowerCase().replaceAll(" ", "-")}-button`}
      aria-pressed={selected}
      className={`group block w-full text-left transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${selected ? "-translate-y-2" : "hover:-translate-y-1"}`}
    >
      <div className={`iphone-frame iphone-${accent} ${selected ? "iphone-selected" : ""}`}>
        <div className="iphone-island" aria-hidden="true" />
        <div className="iphone-screen">
          <div className="flex items-center justify-between text-[0.52rem] font-semibold text-white/75">
            <span>9:41</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-2.5 rounded-sm border border-white/60" /><span className="h-1.5 w-1 rounded-full bg-white/80" /></span>
          </div>
          <div className="mt-10 text-left">
            <p className="font-mono text-[0.48rem] uppercase tracking-[0.16em] text-white/60">{label}</p>
            <p className="mt-2 font-display text-lg leading-tight text-white">A little time is still time.</p>
            <div className="mt-5 space-y-2">
              <div className="h-12 rounded-xl border border-white/15 bg-white/10 p-2"><div className="h-1.5 w-2/3 rounded-full bg-white/65" /><div className="mt-2 h-1 w-1/2 rounded-full bg-white/25" /></div>
              <div className="h-10 rounded-xl border border-white/15 bg-white/5 p-2"><div className="h-1.5 w-1/2 rounded-full bg-white/45" /><div className="mt-2 h-1 w-1/3 rounded-full bg-white/20" /></div>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 text-[0.48rem] text-white/55"><span>Gap</span><span>⌁</span></div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-slate">
        <span data-testid={`gap-screenshot-${screen.toLowerCase().replaceAll(" ", "-")}-label`}>{screen}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${selected ? "bg-vermilion" : "bg-slate-300"}`} aria-hidden="true" />
      </div>
    </button>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("Core flow");
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      toast.error("Copy is unavailable — use the email link instead");
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main className="overflow-hidden bg-canvas text-ink selection:bg-vermilion selection:text-white">
      <header data-testid="site-header" className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#hero" data-testid="brand-home-link" onClick={closeMobileMenu} className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <span className="flex size-8 items-center justify-center bg-ink text-xs font-bold text-canvas transition-transform duration-300 group-hover:rotate-6">AF</span>
            <span data-testid="brand-name" className="hidden text-sm font-bold tracking-tight sm:block">André Fleischfresser</span>
          </a>
          <nav aria-label="Primary navigation" data-testid="desktop-navigation" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-testid={item.testId} className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{item.label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="header-github-link" aria-label="André's GitHub" className="text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"><Github className="size-4" /></a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="header-linkedin-link" aria-label="André's LinkedIn" className="text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"><Linkedin className="size-4" /></a>
            <a href="#contact" data-testid="header-contact-link" className="border border-ink px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Contact</a>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} data-testid="mobile-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} className="flex size-10 items-center justify-center text-ink md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav aria-label="Mobile navigation" data-testid="mobile-navigation" className="border-t border-slate-200 bg-canvas px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMobileMenu} data-testid={`mobile-${item.testId}`} className="text-sm font-semibold uppercase tracking-[0.13em] text-ink">{item.label}</a>
              ))}
              <div className="flex gap-5 border-t border-slate-200 pt-5">
                <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="mobile-github-link" className="text-sm font-semibold text-ink">GitHub <ArrowUpRight className="ml-1 inline size-3" /></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="mobile-linkedin-link" className="text-sm font-semibold text-ink">LinkedIn <ArrowUpRight className="ml-1 inline size-3" /></a>
              </div>
            </div>
          </nav>
        )}
      </header>

      <section id="hero" data-testid="hero-section" className="relative mx-auto flex min-h-[min(820px,100vh)] max-w-7xl items-end px-5 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-12 lg:pb-28">
        <div className="pointer-events-none absolute right-24 top-40 hidden h-px w-48 bg-vermilion/50 lg:block" aria-hidden="true" />
        <div className="relative z-10 max-w-5xl">
          <div data-testid="hero-eyebrow" className="mb-8 flex items-center gap-3 text-[0.67rem] font-semibold uppercase tracking-[0.19em] text-slate"><CircleDot className="size-3 text-vermilion" /> Software Engineering Student · Developer · Builder</div>
          <h1 data-testid="hero-title" className="max-w-4xl font-display text-[clamp(3.35rem,9vw,8.5rem)] font-medium leading-[0.91] tracking-[-0.055em] text-ink">André Gustavo <span className="text-vermilion">Reitz</span> Fleischfresser</h1>
          <div className="mt-10 grid max-w-4xl gap-8 border-t border-slate-300 pt-7 sm:grid-cols-[1fr_1.25fr] sm:items-start">
            <p data-testid="hero-manifesto" className="max-w-xs text-lg font-medium leading-relaxed text-ink sm:text-xl">I like building things, experimenting, and learning by doing.</p>
            <div>
              <p data-testid="hero-credibility" className="mb-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-vermilion">Software Engineering @ PUCPR · iOS Automation QA @ Mitel</p>
              <p data-testid="hero-description" className="max-w-lg text-sm leading-7 text-slate sm:text-base">I build software by experimenting, testing ideas, and learning through real projects — from robotics and embedded systems to backend applications, automation and native iOS products.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#gap-centerpiece" data-testid="hero-view-work-button" className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-canvas transition-colors hover:bg-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">View my work <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" /></a>
                <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="hero-github-button" className="inline-flex items-center gap-2 border border-slate-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">GitHub <ArrowUpRight className="size-4" /></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="hero-linkedin-button" className="inline-flex items-center gap-2 border border-slate-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">LinkedIn <ArrowUpRight className="size-4" /></a>
              </div>
            </div>
          </div>
          <div className="mt-20 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate"><span className="h-10 w-px bg-vermilion" aria-hidden="true" /> Scroll to explore the work</div>
        </div>
      </section>

      <section id="gap-centerpiece" data-testid="gap-section" className="bg-ink text-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <SectionLabel number="01" testId="gap-section-label">Flagship project</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p data-testid="gap-project-kicker" className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-vermilion">Native iOS · Product experiment</p>
              <h2 data-testid="gap-project-title" className="max-w-xl font-display text-6xl font-medium leading-[0.92] tracking-[-0.045em] sm:text-8xl">Gap<span className="text-vermilion">.</span></h2>
              <p data-testid="gap-project-tagline" className="mt-8 max-w-md text-xl leading-relaxed text-white/75 sm:text-2xl">How much time do I have right now?</p>
              <p data-testid="gap-project-description" className="mt-7 max-w-lg text-sm leading-7 text-white/60 sm:text-base">Gap helps people find tasks that realistically fit their current amount of free time, context and priorities — instead of presenting another large to-do list.</p>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/50"><span>Swift</span><span>SwiftUI</span><span>SwiftData</span><span>Local persistence</span></div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a href={projectLinks.gap} target="_blank" rel="noreferrer" data-testid="gap-view-project-button" className="group inline-flex items-center gap-2 bg-canvas px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-vermilion hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas">View project <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                <button type="button" onClick={() => setCaseStudyOpen((open) => !open)} data-testid="gap-case-study-toggle" aria-expanded={caseStudyOpen} className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:border-vermilion hover:text-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas">{caseStudyOpen ? "Close case study" : "Read case study"}<ChevronDown className={`size-4 transition-transform duration-300 ${caseStudyOpen ? "rotate-180" : ""}`} /></button>
              </div>
            </div>
            <div className="relative min-h-[25rem] sm:min-h-[34rem] lg:pt-8">
              <div className="absolute -right-12 top-0 hidden font-mono text-[0.61rem] uppercase tracking-[0.14em] text-white/35 [writing-mode:vertical-rl] sm:block">Replace with real product screens</div>
              <div className="grid grid-cols-3 items-end gap-2 sm:gap-5">
                <PlaceholderScreen label="Find a fit" screen="Core flow" accent="vermilion" selected={activeScreen === "Core flow"} onSelect={() => setActiveScreen("Core flow")} />
                <div className="pb-9"><PlaceholderScreen label="Filter by context" screen="Context" accent="cobalt" selected={activeScreen === "Context"} onSelect={() => setActiveScreen("Context")} /></div>
                <div className="pb-20"><PlaceholderScreen label="Pick for me" screen="Recommendation" accent="sage" selected={activeScreen === "Recommendation"} onSelect={() => setActiveScreen("Recommendation")} /></div>
              </div>
              <div data-testid="gap-placeholder-note" className="mt-8 flex items-start gap-3 border-t border-white/15 pt-4 text-[0.66rem] leading-5 text-white/45"><Plus className="mt-0.5 size-3 shrink-0 text-vermilion" /> Three replaceable placeholders — designed to hold the final Gap screenshots.</div>
            </div>
          </div>
          {caseStudyOpen && (
            <div data-testid="gap-case-study-panel" className="mt-20 border-t border-white/15 pt-10 animate-in fade-in duration-300">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div><p data-testid="gap-case-study-label" className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-vermilion">Case study · product thinking</p><h3 data-testid="gap-case-study-title" className="mt-4 font-display text-3xl text-white sm:text-4xl">From time filtering to less decision friction.</h3></div>
                <div className="grid gap-8 sm:grid-cols-2"><p data-testid="gap-case-study-story" className="text-sm leading-7 text-white/65">Gap evolved through user interviews and iteration. What started primarily as time filtering expanded after research showed that context, decision friction and priority also mattered.</p><div><p data-testid="gap-case-study-features-label" className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40">What it explores</p><ul className="space-y-3 text-sm text-white/75">{["5–30 minute time windows", "Contexts and priorities", "Pick for Me recommendations", "Completed history and Time Reclaimed"].map((item) => <li key={item} data-testid={`gap-feature-${item.toLowerCase().replaceAll(" ", "-")}`} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-vermilion" />{item}</li>)}</ul></div></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="featured-projects" data-testid="featured-projects-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <SectionLabel number="02" testId="featured-projects-label">Selected work</SectionLabel>
        <div className="mb-16 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><h2 data-testid="featured-projects-title" className="max-w-2xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-7xl">Selected work.</h2><p data-testid="featured-projects-intro" className="max-w-md text-sm leading-7 text-slate">The work below moves from software architecture to physical experimentation. Each project is a different way of learning by making.</p></div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          <article data-testid="helpdesk-project" className="group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="helpdesk-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cobalt">Full stack · backend architecture</p><h3 data-testid="helpdesk-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">HelpDesk</h3>{projectImages.helpDesk && <img src={projectImages.helpDesk} alt="HelpDesk project" data-testid="helpdesk-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="helpdesk-description" className="max-w-lg text-sm leading-7 text-slate">A help desk system built around authentication, role-based authorization, ticket CRUD, assignment, status and priority workflows, comments, filtering, pagination, dashboard, validation, automated tests and API documentation.</p><p data-testid="helpdesk-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">A project about business logic, architecture, testing and maintainability.</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="helpdesk-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">TypeScript · Node.js<br />Express · PostgreSQL · Prisma<br />Zod · JWT · Jest · Swagger · React</div><ExternalProjectLink href={projectLinks.helpDesk} testId="helpdesk-repository-link">View repository</ExternalProjectLink></div>
          </article>
          <article data-testid="elder-watch-project" className="group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="elder-watch-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vermilion">Collaborative university project · PUCPR</p><h3 data-testid="elder-watch-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">Elder-Watch</h3>{projectImages.elderWatch && <img src={projectImages.elderWatch} alt="Elder-Watch prototype" data-testid="elder-watch-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="elder-watch-description" className="max-w-lg text-sm leading-7 text-slate">An ESP32 prototype focused on elderly safety, exploring fall detection using motion data, an emergency button, sound sensing, Telegram alerts, medication reminders and a local monitoring dashboard.</p><p data-testid="elder-watch-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">Experimentation at the intersection of hardware and software.</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="elder-watch-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">ESP32 · MPU6050<br />Sensors · Telegram<br />Local monitoring</div><ExternalProjectLink href={projectLinks.elderWatch} testId="elder-watch-repository-link">View repository</ExternalProjectLink></div>
          </article>
          <article data-testid="promosearch-project" className="group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="promosearch-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sage">Collaborative university project · PUCPR</p><h3 data-testid="promosearch-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">PromoSearch</h3>{projectImages.promoSearch && <img src={projectImages.promoSearch} alt="PromoSearch project" data-testid="promosearch-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="promosearch-description" className="max-w-lg text-sm leading-7 text-slate">A marketplace for local promotions where stores publish offers and customers discover nearby deals through roles, moderation workflows, relational data, browser geolocation, maps and radius/category filtering.</p><p data-testid="promosearch-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">A study in turning local context into useful discovery.</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="promosearch-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">PHP · MySQL · JavaScript<br />Leaflet · OpenStreetMap<br />Geolocation · Marketplace</div><ExternalProjectLink href={projectLinks.promoSearch} testId="promosearch-repository-link">View repository</ExternalProjectLink></div>
          </article>
        </div>
      </section>

      <section data-testid="other-projects-section" className="border-y border-slate-200 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel number="03" testId="other-projects-label">Other projects</SectionLabel><p data-testid="other-projects-intro" className="max-w-xs text-sm leading-7 text-slate">Smaller experiments, collaborations and iterations that keep the learning moving.</p></div><div className="divide-y divide-slate-300 border-t border-slate-300">{smallerProjects.map((project, index) => <a key={project.title} href={project.link} target="_blank" rel="noreferrer" data-testid={`other-project-${index + 1}-link`} className="group grid gap-3 py-6 transition-colors hover:text-vermilion sm:grid-cols-[0.4fr_1fr_auto] sm:items-start sm:gap-8"><span data-testid={`other-project-${index + 1}-discipline`} className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">{project.discipline}</span><span><span data-testid={`other-project-${index + 1}-title`} className="block font-display text-2xl text-ink transition-colors group-hover:text-vermilion">{project.title}</span><span data-testid={`other-project-${index + 1}-description`} className="mt-1 block max-w-lg text-sm leading-6 text-slate">{project.description}</span></span><ArrowUpRight aria-hidden="true" className="hidden size-5 text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" /></a>)}</div></div></div>
      </section>

      <section id="experience" data-testid="experience-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <SectionLabel number="04" testId="experience-label">Professional experience</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24"><div><p data-testid="experience-period" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vermilion">Current role</p><h2 data-testid="experience-title" className="mt-5 max-w-sm font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">iOS Automation QA Intern</h2><p data-testid="experience-company" className="mt-6 text-base font-semibold text-ink">Mitel</p></div><div className="border-t border-slate-300 pt-7"><p data-testid="experience-description" className="max-w-2xl text-lg leading-8 text-ink">I work with automated testing for a production iOS application. The work has taught me to think about reliability, maintainability and collaboration in addition to simply making software work.</p><div className="mt-10 grid gap-x-8 gap-y-4 border-t border-slate-200 pt-7 sm:grid-cols-2"><span data-testid="experience-skill-appium" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>Appium & XCUITest</span><span data-testid="experience-skill-cucumber" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>Cucumber</span><span data-testid="experience-skill-accessibility" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>Accessibility identifiers</span><span data-testid="experience-skill-ui-automation" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>UI & end-to-end automation</span><span data-testid="experience-skill-regression" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>Regression testing & debugging</span><span data-testid="experience-skill-collaboration" className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>Git & collaborative development</span></div></div></div>
      </section>

      <section id="how-i-build" data-testid="how-i-build-section" className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><SectionLabel number="05" testId="how-i-build-label">How I build</SectionLabel><div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><div><h2 data-testid="how-i-build-title" className="max-w-md font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-7xl">I learn best by <span className="text-vermilion">building.</span></h2><p data-testid="how-i-build-intro" className="mt-7 max-w-sm text-sm leading-7 text-slate">When I encounter something unfamiliar, I start experimenting, research what I need, ask for feedback when necessary and iterate until I understand it better.</p></div><div className="relative border-l border-slate-300">{pathStages.map((stage) => { const Icon = stage.icon; return <div key={stage.number} data-testid={`build-stage-${stage.number}`} className="relative grid gap-4 pb-10 pl-7 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:pl-10"><span className="absolute -left-[0.32rem] top-1 size-2.5 rounded-full border-2 border-surface-alt bg-vermilion" aria-hidden="true" /><div className="flex items-center gap-3 text-vermilion"><span data-testid={`build-stage-${stage.number}-number`} className="font-mono text-[0.68rem]">{stage.number}</span><Icon className="size-4" aria-hidden="true" /></div><div><h3 data-testid={`build-stage-${stage.number}-title`} className="font-display text-2xl text-ink">{stage.title}</h3><p data-testid={`build-stage-${stage.number}-description`} className="mt-2 max-w-lg text-sm leading-6 text-slate">{stage.text}</p></div></div>; })}</div></div></div>
      </section>

      <section data-testid="exploring-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel number="06" testId="exploring-label">Currently exploring</SectionLabel><h2 data-testid="exploring-title" className="max-w-sm font-display text-4xl leading-none tracking-[-0.04em] sm:text-5xl">What I’m exploring now.</h2></div><div className="grid border-t border-slate-300 sm:grid-cols-2">{["Swift & SwiftUI", "Native iOS development", "Product development", "Software architecture", "Cloud architecture", "Automated testing"].map((item, index) => <div key={item} data-testid={`exploring-item-${index + 1}`} className="flex items-center gap-4 border-b border-slate-200 py-5 text-sm font-semibold text-ink"><span className="font-mono text-[0.62rem] text-vermilion">0{index + 1}</span>{item}</div>)}</div></div></section>

      <section id="contact" data-testid="contact-section" className="bg-vermilion text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><SectionLabel number="07" testId="contact-label">Contact</SectionLabel><div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><h2 data-testid="contact-title" className="max-w-2xl font-display text-6xl font-medium leading-[0.9] tracking-[-0.05em] sm:text-8xl">Have a good question<span className="text-ink">?</span></h2><p data-testid="contact-description" className="mt-8 max-w-md text-base leading-7 text-white/75">I’m always interested in thoughtful conversations about products, engineering and what we can learn by making something real.</p></div><div className="border-t border-white/30 pt-6"><p data-testid="contact-location" className="mb-6 flex items-center gap-2 text-sm text-white/70"><MapPin className="size-4" /> Curitiba, Paraná, Brazil · PUCPR</p><div className="flex flex-col gap-4"><a href={`mailto:${email}`} data-testid="contact-email-link" className="group flex items-center justify-between border-b border-white/35 pb-3 text-base font-semibold transition-colors hover:border-ink hover:text-ink"><span className="flex items-center gap-3"><Mail className="size-4" />{email}</span><ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><button type="button" onClick={copyEmail} data-testid="copy-email-button" className="flex items-center gap-3 self-start text-xs font-bold uppercase tracking-[0.14em] text-white/75 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{emailCopied ? <Check className="size-4" /> : <Copy className="size-4" />}{emailCopied ? "Copied" : "Copy email"}</button><div className="flex gap-5 pt-3"><a href={githubUrl} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="flex items-center gap-2 text-sm font-semibold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">GitHub <ArrowUpRight className="size-3" /></a><a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="flex items-center gap-2 text-sm font-semibold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">LinkedIn <ArrowUpRight className="size-3" /></a></div></div></div></div></div></section>

      <footer data-testid="site-footer" className="bg-ink text-white/55"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-[0.65rem] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span data-testid="footer-name">André Gustavo Reitz Fleischfresser</span><span data-testid="footer-note" className="flex items-center gap-2"><Terminal className="size-3 text-vermilion" /> Built by learning through doing</span></div></footer>
    </main>
  );
}