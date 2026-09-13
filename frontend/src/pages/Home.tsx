import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Code2,
  Copy,
  Cpu,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Terminal,
  TestTube2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { portfolioCopy, type Language } from "@/content/portfolioCopy";

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

// Drop final iPhone screenshot URLs here; the existing device frames will render them without layout changes.
const gapScreenshots: Record<"coreFlow" | "context" | "recommendation", string | undefined> = {
  coreFlow: "https://customer-assets-v7afamib.emergentagent.net/job_andre-products/artifacts/qvfooj6b_home.webp",
  context: "https://customer-assets-v7afamib.emergentagent.net/job_andre-products/artifacts/1v9mc6j3_Simulator%20Screenshot%20-%20iPhone%2017%20Pro%20Max%20-%202026-09-07%20at%2023.44.34.webp",
  recommendation: "https://customer-assets-v7afamib.emergentagent.net/job_andre-products/artifacts/vi0pzsrh_Simulator%20Screenshot%20-%20iPhone%2017%20Pro%20Max%20-%202026-09-07%20at%2023.43.01.webp",
};

const navItems = [
  { key: "overview" as const, href: "#hero", testId: "nav-link-overview" },
  { key: "gap" as const, href: "#gap-centerpiece", testId: "nav-link-gap" },
  { key: "projects" as const, href: "#featured-projects", testId: "nav-link-projects" },
  { key: "experience" as const, href: "#experience", testId: "nav-link-experience" },
];

const pathStages = [
  {
    number: "01",
    icon: Cpu,
    accent: "vermilion",
  },
  {
    number: "02",
    icon: Layers3,
    accent: "cobalt",
  },
  {
    number: "03",
    icon: TestTube2,
    accent: "sage",
  },
  {
    number: "04",
    icon: Code2,
    accent: "violet",
  },
];

const smallerProjects = [
  {
    title: "Habit Tracker",
    link: projectLinks.habitTracker,
    discipline: "Full stack",
  },
  {
    title: "TableTennisManager",
    link: projectLinks.tableTennis,
    discipline: "PUCPR · Python",
  },
  {
    title: "PromoSearch Java",
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

function SectionLabel({ number, children, testId, className = "", accentClassName = "text-vermilion" }: { number: string; children: React.ReactNode; testId: string; className?: string; accentClassName?: string }) {
  return (
    <div data-testid={testId} data-reveal="metadata" className={`mb-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${className || "text-slate"}`}>
      <span className={`font-mono ${accentClassName}`}>{number}</span>
      <span className="section-rule h-px w-8 bg-slate-300" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function LanguageSwitch({ language, onChange, location, label, englishLabel, portugueseLabel }: { language: Language; onChange: (language: Language) => void; location: "header" | "mobile"; label: string; englishLabel: string; portugueseLabel: string }) {
  return (
    <div role="group" aria-label={label} data-testid={`${location}-language-switch`} className="flex items-center gap-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
      {(["en", "pt"] as const).map((option, index) => (
        <span key={option} className="flex items-center gap-1">
          {index > 0 && <span className="text-slate-300" aria-hidden="true">/</span>}
          <button type="button" onClick={() => onChange(option)} aria-label={option === "en" ? englishLabel : portugueseLabel} aria-pressed={language === option} lang={option === "pt" ? "pt-BR" : "en"} data-testid={`${location}-language-${option}-button`} className={`language-option border-b px-1 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${language === option ? "border-vermilion text-vermilion" : "border-transparent text-slate hover:text-ink"}`}>{option.toUpperCase()}</button>
        </span>
      ))}
    </div>
  );
}

function GapScreen({ label, screen, imageAlt, prominent = false, revealDelay, selected, onSelect }: { label: string; screen: string; imageAlt: string; prominent?: boolean; revealDelay: number; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-testid={`gap-screenshot-${screen.toLowerCase().replaceAll(" ", "-")}-button`}
      data-reveal="phone"
      data-reveal-delay={revealDelay}
      aria-pressed={selected}
      className="gap-screen-button group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div className={`iphone-frame ${prominent ? "iphone-prominent" : ""} ${selected ? "iphone-selected" : ""}`} data-testid={`gap-${screen.toLowerCase().replaceAll(" ", "-")}-image-slot`}>
        <img src={gapScreenshots[screen === "Home" ? "coreFlow" : screen === "Smart recommendation" ? "recommendation" : "context"]} alt={imageAlt} className="iphone-image" loading="eager" decoding="sync" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-slate">
        <span data-testid={`gap-screenshot-${screen.toLowerCase().replaceAll(" ", "-")}-label`}>{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${selected ? "bg-vermilion" : "bg-slate-300"}`} aria-hidden="true" />
      </div>
    </button>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("Smart recommendation");
  const [activeStage, setActiveStage] = useState(0);
  const [activeNav, setActiveNav] = useState("hero");
  const [emailCopied, setEmailCopied] = useState(false);
  const ambientLineRef = useRef<HTMLDivElement>(null);
  const stageSelectionLockRef = useRef(0);
  const t = portfolioCopy[language];

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.meta.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [language, t.meta.description, t.meta.title]);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("motion-ready");
    if (reducedMotion) root.classList.add("motion-reduced");

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-revealed"));
      return () => {
        root.classList.remove("motion-ready", "motion-reduced");
      };
    }

    const revealTargets = new Map<Element, HTMLElement[]>();
    revealNodes.forEach((node) => {
      const target = node.dataset.reveal === "mask" ? node.parentElement ?? node : node;
      revealTargets.set(target, [...(revealTargets.get(target) ?? []), node]);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (revealTargets.get(entry.target) ?? []).forEach((node) => node.classList.add("is-revealed"));
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.01, rootMargin: "0px" },
    );
    revealTargets.forEach((nodes, target) => {
      const bounds = target.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) {
        nodes.forEach((node) => node.classList.add("is-revealed"));
      } else {
        revealObserver.observe(target);
      }
    });

    return () => {
      revealObserver.disconnect();
      root.classList.remove("motion-ready", "motion-reduced");
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => ({ id: item.href.slice(1), element: document.querySelector<HTMLElement>(item.href) }))
      .filter((item): item is { id: string; element: HTMLElement } => Boolean(item.element));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      }),
      { rootMargin: "-28% 0px -58% 0px", threshold: 0 },
    );
    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-build-stage]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting && Date.now() > stageSelectionLockRef.current) {
          setActiveStage(Number((entry.target as HTMLElement).dataset.buildStage ?? 0));
        }
      }),
      { rootMargin: "-36% 0px -48% 0px", threshold: 0 },
    );
    stages.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
    ambientLineRef.current?.style.setProperty("transform", `translate(${x}px, ${y}px)`);
  };

  const handleHeroPointerLeave = () => {
    ambientLineRef.current?.style.setProperty("transform", "translate(0, 0)");
  };

  const selectBuildStage = (index: number) => {
    stageSelectionLockRef.current = Date.now() + 1200;
    setActiveStage(index);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      toast.success(t.contact.copySuccess);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      toast.error(t.contact.copyError);
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
          <nav aria-label={t.navigation.primary} data-testid="desktop-navigation" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-testid={item.testId} aria-current={activeNav === item.href.slice(1) ? "page" : undefined} className={`nav-item text-[0.68rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${activeNav === item.href.slice(1) ? "nav-item-active text-ink" : "text-slate"}`}>{t.navigation[item.key]}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitch language={language} onChange={setLanguage} location="header" label={t.navigation.language} englishLabel={t.navigation.english} portugueseLabel={t.navigation.portuguese} />
            <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="header-github-link" aria-label={language === "pt" ? "GitHub de André" : "André's GitHub"} className="text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"><Github className="size-4" /></a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="header-linkedin-link" aria-label={language === "pt" ? "LinkedIn de André" : "André's LinkedIn"} className="text-slate transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"><Linkedin className="size-4" /></a>
            <a href="#contact" data-testid="header-contact-link" className="border border-ink px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{t.navigation.contact}</a>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} data-testid="mobile-menu-toggle" aria-label={mobileMenuOpen ? t.navigation.close : t.navigation.open} aria-expanded={mobileMenuOpen} className="flex size-10 items-center justify-center text-ink md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav aria-label={t.navigation.mobile} data-testid="mobile-navigation" className="border-t border-slate-200 bg-canvas px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMobileMenu} data-testid={`mobile-${item.testId}`} aria-current={activeNav === item.href.slice(1) ? "page" : undefined} className={`nav-item text-sm font-semibold uppercase tracking-[0.13em] text-ink ${activeNav === item.href.slice(1) ? "nav-item-active" : ""}`}>{t.navigation[item.key]}</a>
              ))}
              <LanguageSwitch language={language} onChange={setLanguage} location="mobile" label={t.navigation.language} englishLabel={t.navigation.english} portugueseLabel={t.navigation.portuguese} />
              <div className="flex gap-5 border-t border-slate-200 pt-5">
                <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="mobile-github-link" className="text-sm font-semibold text-ink">GitHub <ArrowUpRight className="ml-1 inline size-3" /></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="mobile-linkedin-link" className="text-sm font-semibold text-ink">LinkedIn <ArrowUpRight className="ml-1 inline size-3" /></a>
              </div>
            </div>
          </nav>
        )}
      </header>

      <section id="hero" data-testid="hero-section" onPointerMove={handleHeroPointerMove} onPointerLeave={handleHeroPointerLeave} className="relative mx-auto flex min-h-[min(820px,100vh)] max-w-7xl items-end px-5 pb-8 pt-32 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
        <div ref={ambientLineRef} className="hero-ambient-line pointer-events-none absolute right-24 top-40 hidden h-px w-48 bg-vermilion/50 lg:block" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl">
          <div data-testid="hero-eyebrow" data-reveal="metadata" className="mb-8 flex items-center gap-3 text-[0.67rem] font-semibold uppercase tracking-[0.19em] text-slate"><CircleDot className="size-3 text-vermilion" /> {t.hero.eyebrow}</div>
          <h1 data-testid="hero-title" data-reveal="mask" className="max-w-6xl font-display text-[clamp(3.35rem,9vw,8.5rem)] font-medium leading-[0.91] tracking-[-0.055em] text-ink">André Gustavo <span className="text-vermilion">Reitz</span> Fleischfresser</h1>
          <div className="mt-10 grid max-w-4xl gap-8 border-t border-slate-300 pt-7 sm:grid-cols-[1fr_1.25fr] sm:items-start">
            <p data-testid="hero-manifesto" data-reveal="copy" data-reveal-delay="90" className="max-w-xs text-lg font-medium leading-relaxed text-ink sm:text-xl">{t.hero.manifesto}</p>
            <div>
              <p data-testid="hero-credibility" data-reveal="metadata" data-reveal-delay="120" className="mb-4 font-mono text-[0.65rem] font-semibold tracking-[0.13em] text-vermilion">{t.hero.credibility}</p>
              <p data-testid="hero-description" data-reveal="copy" data-reveal-delay="160" className="max-w-lg text-sm leading-7 text-slate sm:text-base">{t.hero.description}</p>
              <div data-reveal="copy" data-reveal-delay="220" className="mt-8 flex flex-wrap gap-3">
                <a href="#gap-centerpiece" data-testid="hero-view-work-button" className="group inline-flex items-center gap-3 bg-ink px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-canvas transition-colors hover:bg-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{t.hero.viewWork} <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" /></a>
                <a href={githubUrl} target="_blank" rel="noreferrer" data-testid="hero-github-button" className="inline-flex items-center gap-2 border border-slate-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">GitHub <ArrowUpRight className="size-4" /></a>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="hero-linkedin-button" className="inline-flex items-center gap-2 border border-slate-300 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:border-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">LinkedIn <ArrowUpRight className="size-4" /></a>
              </div>
            </div>
          </div>
          <div data-testid="hero-thread-bridge" data-reveal="copy" data-reveal-delay="260" className="mt-9 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate"><span className="h-6 w-px bg-vermilion" aria-hidden="true" /> {t.hero.thread}</div>
        </div>
      </section>

      <section id="gap-centerpiece" data-testid="gap-section" data-color-section="dark" className="dark-section bg-ink text-canvas">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <SectionLabel number="01" testId="gap-section-label">{t.gap.sectionLabel}</SectionLabel>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p data-testid="gap-project-kicker" data-reveal="metadata" className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-vermilion">{t.gap.kicker}</p>
              <h2 data-testid="gap-project-title" data-reveal="mask" className="max-w-xl font-display text-6xl font-medium leading-[0.92] tracking-[-0.045em] sm:text-8xl">Gap<span className="text-vermilion">.</span></h2>
              <p data-testid="gap-learning-dimension" data-reveal="metadata" data-reveal-delay="100" className="mt-4 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">{t.gap.learning}</p>
              <p data-testid="gap-project-tagline" data-reveal="copy" data-reveal-delay="120" className="mt-8 max-w-md text-xl leading-relaxed text-white/75 sm:text-2xl">{t.gap.tagline}</p>
              <p data-testid="gap-project-description" data-reveal="copy" data-reveal-delay="160" className="mt-7 max-w-lg text-sm leading-7 text-white/60 sm:text-base">{t.gap.description}</p>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/50"><span>Swift</span><span>SwiftUI</span><span>SwiftData</span><span>Local persistence</span></div>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a href={projectLinks.gap} target="_blank" rel="noreferrer" data-testid="gap-view-project-button" className="group inline-flex items-center gap-2 bg-canvas px-5 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-vermilion hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas">{t.gap.viewProject} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                <button type="button" onClick={() => setCaseStudyOpen((open) => !open)} data-testid="gap-case-study-toggle" aria-expanded={caseStudyOpen} className="group inline-flex items-center gap-2 border-b border-white/35 pb-1 text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:border-vermilion hover:text-vermilion focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-canvas">{caseStudyOpen ? t.gap.closeCaseStudy : t.gap.readCaseStudy}<ChevronDown className={`size-4 transition-transform duration-300 ${caseStudyOpen ? "rotate-180" : ""}`} /></button>
              </div>
            </div>
            <div className="relative min-h-[25rem] sm:min-h-[34rem] lg:pt-8">
              <div className="grid grid-cols-[0.94fr_1.12fr_0.94fr] items-end gap-2 sm:gap-5">
                <GapScreen label={t.gap.screens[0]} imageAlt={t.gap.screenAlts[0]} screen="Home" revealDelay={100} selected={activeScreen === "Home"} onSelect={() => setActiveScreen("Home")} />
                <div className="pb-9"><GapScreen label={t.gap.screens[1]} imageAlt={t.gap.screenAlts[1]} screen="Smart recommendation" revealDelay={0} prominent selected={activeScreen === "Smart recommendation"} onSelect={() => setActiveScreen("Smart recommendation")} /></div>
                <div className="pb-20"><GapScreen label={t.gap.screens[2]} imageAlt={t.gap.screenAlts[2]} screen="New task" revealDelay={180} selected={activeScreen === "New task"} onSelect={() => setActiveScreen("New task")} /></div>
              </div>
            </div>
          </div>
          {caseStudyOpen && (
            <div data-testid="gap-case-study-panel" className="mt-20 border-t border-white/15 pt-10 animate-in fade-in duration-300">
              <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                <div><p data-testid="gap-case-study-label" className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-vermilion">{t.gap.caseLabel}</p><h3 data-testid="gap-case-study-title" className="mt-4 font-display text-3xl text-white sm:text-4xl">{t.gap.caseTitle}</h3></div>
                <div className="grid gap-8 sm:grid-cols-2"><p data-testid="gap-case-study-story" className="text-sm leading-7 text-white/65">{t.gap.caseStory}</p><div><p data-testid="gap-case-study-features-label" className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40">{t.gap.explores}</p><ul className="space-y-3 text-sm text-white/75">{t.gap.features.map((item, index) => <li key={item} data-testid={`gap-feature-${index + 1}`} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-vermilion" />{item}</li>)}</ul></div></div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="featured-projects" data-testid="featured-projects-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <SectionLabel number="02" testId="featured-projects-label">{t.featured.sectionLabel}</SectionLabel>
        <div className="mb-16 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><h2 data-testid="featured-projects-title" data-reveal="mask" className="max-w-2xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-7xl">{t.featured.title}</h2><p data-testid="featured-projects-intro" data-reveal="copy" data-reveal-delay="100" className="max-w-md text-sm leading-7 text-slate">{t.featured.intro}</p></div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          <article data-testid="helpdesk-project" data-project-row className="project-row group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="helpdesk-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-cobalt">{t.featured.helpDesk.category}</p><h3 data-testid="helpdesk-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">HelpDesk</h3><p data-testid="helpdesk-learning-dimension" className="mt-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-slate">{t.featured.helpDesk.learning}</p>{projectImages.helpDesk && <img src={projectImages.helpDesk} alt={language === "pt" ? "Projeto HelpDesk" : "HelpDesk project"} data-testid="helpdesk-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="helpdesk-description" className="max-w-lg text-sm leading-7 text-slate">{t.featured.helpDesk.description}</p><p data-testid="helpdesk-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">{t.featured.helpDesk.emphasis}</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="helpdesk-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">TypeScript · Node.js<br />Express · PostgreSQL · Prisma<br />Zod · JWT · Jest · Swagger · React</div><ExternalProjectLink href={projectLinks.helpDesk} testId="helpdesk-repository-link">{t.featured.repository}</ExternalProjectLink></div>
          </article>
          <article data-testid="elder-watch-project" data-project-row className="project-row group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="elder-watch-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vermilion">{t.featured.elderWatch.category}</p><h3 data-testid="elder-watch-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">Elder-Watch</h3><p data-testid="elder-watch-learning-dimension" className="mt-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-slate">{t.featured.elderWatch.learning}</p>{projectImages.elderWatch && <img src={projectImages.elderWatch} alt={language === "pt" ? "Protótipo Elder-Watch" : "Elder-Watch prototype"} data-testid="elder-watch-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="elder-watch-description" className="max-w-lg text-sm leading-7 text-slate">{t.featured.elderWatch.description}</p><p data-testid="elder-watch-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">{t.featured.elderWatch.emphasis}</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="elder-watch-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">ESP32 · MPU6050<br />Sensors · Telegram<br />Local monitoring</div><ExternalProjectLink href={projectLinks.elderWatch} testId="elder-watch-repository-link">{t.featured.repository}</ExternalProjectLink></div>
          </article>
          <article data-testid="promosearch-project" data-project-row className="project-row group grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.72fr_1fr_0.55fr] lg:gap-12">
            <div><p data-testid="promosearch-category" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-sage">{t.featured.promoSearch.category}</p><h3 data-testid="promosearch-title" className="mt-4 font-display text-4xl leading-none sm:text-5xl">PromoSearch</h3><p data-testid="promosearch-learning-dimension" className="mt-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-slate">{t.featured.promoSearch.learning}</p>{projectImages.promoSearch && <img src={projectImages.promoSearch} alt={language === "pt" ? "Projeto PromoSearch" : "PromoSearch project"} data-testid="promosearch-project-image" className="mt-8 aspect-[4/3] w-full object-cover object-center" />}</div>
            <div><p data-testid="promosearch-description" className="max-w-lg text-sm leading-7 text-slate">{t.featured.promoSearch.description}</p><p data-testid="promosearch-emphasis" className="mt-5 text-sm font-semibold leading-6 text-ink">{t.featured.promoSearch.emphasis}</p></div>
            <div className="flex flex-col justify-between gap-7 lg:items-end"><div data-testid="promosearch-technologies" className="text-right font-mono text-[0.63rem] uppercase leading-6 tracking-[0.12em] text-slate">PHP · MySQL · JavaScript<br />Leaflet · OpenStreetMap<br />Geolocation · Marketplace</div><ExternalProjectLink href={projectLinks.promoSearch} testId="promosearch-repository-link">{t.featured.repository}</ExternalProjectLink></div>
          </article>
        </div>
      </section>

      <section data-testid="other-projects-section" className="border-y border-slate-200 bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-10 grid gap-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-end">
            <SectionLabel number="03" testId="other-projects-label">{t.other.label}</SectionLabel>
            <p data-testid="other-projects-intro" data-reveal="copy" className="max-w-md text-sm leading-7 text-slate">{t.other.intro}</p>
          </div>
          <div data-testid="other-projects-grid" data-reveal="copy" data-reveal-delay="100" className="grid divide-y divide-slate-300 border-y border-slate-300 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {smallerProjects.map((project, index) => (
              <a key={project.title} href={project.link} target="_blank" rel="noreferrer" data-testid={`other-project-${index + 1}-link`} className="other-project-link group relative flex min-h-64 flex-col py-8 transition-colors lg:min-h-72 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-center justify-between gap-4">
                  <span data-testid={`other-project-${index + 1}-index`} className="font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-vermilion">0{index + 1}</span>
                  <span data-testid={`other-project-${index + 1}-discipline`} className="text-right font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate">{project.discipline}</span>
                </div>
                <h3 data-testid={`other-project-${index + 1}-title`} className="mt-8 font-display text-3xl leading-tight text-ink transition-colors group-hover:text-vermilion">{project.title}</h3>
                <p data-testid={`other-project-${index + 1}-description`} className="mt-4 max-w-sm text-sm leading-6 text-slate">{t.other.descriptions[index]}</p>
                <ArrowUpRight aria-hidden="true" className="mt-auto size-5 self-end text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" data-testid="experience-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <SectionLabel number="04" testId="experience-label">{t.experience.label}</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-24"><div><p data-testid="experience-period" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-vermilion">{t.experience.period}</p><h2 data-testid="experience-title" className="mt-5 max-w-sm font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl">{t.experience.title}</h2><p data-testid="experience-company" className="mt-6 text-base font-semibold text-ink">Mitel</p></div><div className="border-t border-slate-300 pt-7"><p data-testid="experience-description" className="max-w-2xl text-lg leading-8 text-ink">{t.experience.description}</p><div className="mt-10 grid gap-x-8 gap-y-4 border-t border-slate-200 pt-7 sm:grid-cols-2">{t.experience.skills.map((skill, index) => <span key={skill} data-testid={`experience-skill-${index + 1}`} className="text-sm text-slate"><span className="mr-2 text-vermilion">/</span>{skill}</span>)}</div></div></div>
      </section>

      <section id="how-i-build" data-testid="how-i-build-section" className="bg-surface-alt">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><SectionLabel number="05" testId="how-i-build-label">{t.how.label}</SectionLabel><div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><div><h2 data-testid="how-i-build-title" data-reveal="mask" className="max-w-md font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-7xl">{t.how.titleStart} <span className="text-vermilion">{t.how.titleAccent}</span></h2><p data-testid="how-i-build-intro" data-reveal="copy" data-reveal-delay="100" className="mt-7 max-w-sm text-sm leading-7 text-slate">{t.how.intro}</p></div><div className="relative border-l border-slate-300"><span data-testid="build-progress-line" className="build-progress-line" style={{ height: `${((activeStage + 1) / pathStages.length) * 100}%` }} aria-hidden="true" />{pathStages.map((stage, index) => { const Icon = stage.icon; const active = activeStage === index; const stageCopy = t.how.stages[index]; return <button type="button" key={stage.number} data-testid={`build-stage-${stage.number}`} data-build-stage={index} aria-pressed={active} onClick={() => selectBuildStage(index)} className={`build-stage-button relative grid w-full gap-4 pb-10 pl-7 text-left last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:pl-10 ${active ? "is-active" : ""}`}><span className="build-stage-dot absolute -left-[0.32rem] top-1 size-2.5 rounded-full border-2 border-surface-alt bg-vermilion" aria-hidden="true" /><div className="flex items-center gap-3 text-vermilion"><span data-testid={`build-stage-${stage.number}-number`} className="font-mono text-[0.68rem]">{stage.number}</span><Icon className="size-4" aria-hidden="true" /></div><div><h3 data-testid={`build-stage-${stage.number}-title`} className="font-display text-2xl text-ink">{stageCopy.title}</h3><p data-testid={`build-stage-${stage.number}-description`} className="mt-2 max-w-lg text-sm leading-6 text-slate">{stageCopy.text}</p><div className="mt-2 min-h-[2.8rem] overflow-hidden"><p data-testid={`build-stage-${stage.number}-carry`} className="build-stage-carry max-w-lg text-sm leading-6 text-vermilion">{stageCopy.carry}</p></div></div></button>; })}</div></div></div>
      </section>

      <section data-testid="milestones-section" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"><SectionLabel number="06" testId="milestones-label">{t.milestones.label}</SectionLabel><div className="mb-14 grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><h2 data-testid="milestones-title" className="max-w-2xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-7xl">{t.milestones.title}</h2><p data-testid="milestones-intro" className="max-w-md text-sm leading-7 text-slate">{t.milestones.intro}</p></div><div className="divide-y divide-slate-200 border-y border-slate-200"><article data-testid="milestone-robotics" className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.22fr_0.62fr_1fr] lg:gap-12"><div data-testid="milestone-robotics-number" className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-vermilion">01</div><div><h3 data-testid="milestone-robotics-title" className="font-display text-4xl leading-none text-ink sm:text-5xl">{t.milestones.robotics}</h3><p data-testid="milestone-robotics-achievement" className="mt-4 font-display text-2xl leading-tight text-ink">{t.milestones.roboticsAchievement}</p></div><div><p data-testid="milestone-robotics-description" className="max-w-xl text-sm leading-7 text-slate">{t.milestones.roboticsDescription}</p><div className="mt-6 grid gap-3 border-t border-slate-200 pt-5 text-sm font-semibold text-ink sm:grid-cols-2">{t.milestones.roboticsItems.map((item, index) => <span key={item} data-testid={`milestone-robotics-item-${index + 1}`}><span className="mr-2 text-vermilion">/</span>{item}</span>)}</div></div></article><article data-testid="milestone-academic" className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.22fr_0.62fr_1fr] lg:gap-12"><div data-testid="milestone-academic-number" className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-vermilion">02</div><div><h3 data-testid="milestone-academic-title" className="font-display text-4xl leading-none text-ink sm:text-5xl">{t.milestones.academic}</h3><p data-testid="milestone-academic-achievement" className="mt-4 font-display text-2xl leading-tight text-ink">{t.milestones.academicAchievement}</p></div><div className="flex items-start"><p data-testid="milestone-academic-description" className="text-sm font-semibold leading-7 text-slate">{t.milestones.academicDescription}</p></div></article></div></section>

      <section data-testid="exploring-section" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel number="07" testId="exploring-label">{t.exploring.label}</SectionLabel><h2 data-testid="exploring-title" data-reveal="mask" className="max-w-sm font-display text-4xl leading-none tracking-[-0.04em] sm:text-5xl">{t.exploring.title}</h2><p data-testid="exploring-intro" data-reveal="copy" data-reveal-delay="100" className="mt-5 max-w-sm text-sm leading-7 text-slate">{t.exploring.intro}</p></div><div className="grid border-t border-slate-300" data-reveal="copy" data-reveal-delay="140"><div className="exploring-rule" aria-hidden="true" />{t.exploring.directions.map((direction, index) => <div key={direction.title} data-testid={`exploring-direction-${index + 1}`} className="grid gap-2 border-b border-slate-200 py-5 sm:grid-cols-[0.72fr_1.28fr] sm:gap-8"><div className="flex items-baseline gap-4"><span data-testid={`exploring-direction-${index + 1}-index`} className="font-mono text-[0.62rem] text-vermilion">0{index + 1}</span><h3 data-testid={`exploring-direction-${index + 1}-title`} className="font-display text-xl text-ink">{direction.title}</h3></div><p data-testid={`exploring-direction-${index + 1}-description`} className="text-sm leading-6 text-slate">{direction.description}</p></div>)}</div></div></section>

      <section id="contact" data-testid="contact-section" data-color-section="dark" className="dark-section border-b border-white/10 bg-ink text-canvas"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><SectionLabel number="08" testId="contact-label" className="text-cobalt" accentClassName="text-cobalt">{t.contact.label}</SectionLabel><div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end"><div><h2 data-testid="contact-title" className="max-w-2xl font-display text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-canvas sm:text-8xl">{t.contact.title}<span className="text-cobalt">?</span></h2><p data-testid="contact-description" className="mt-8 max-w-md text-base leading-7 text-white/70">{t.contact.description}</p></div><div className="border-t border-white/20 pt-6"><p data-testid="contact-location" className="mb-6 flex items-center gap-2 text-sm text-white/65"><MapPin className="size-4 text-cobalt" /> {t.contact.location}</p><div className="flex flex-col gap-4"><a href={`mailto:${email}`} data-testid="contact-email-link" className="group flex items-center justify-between border-b border-white/30 pb-3 text-base font-semibold transition-colors hover:border-cobalt hover:text-cobalt"><span className="flex items-center gap-3"><Mail className="size-4 text-cobalt" />{email}</span><ArrowUpRight className="size-4 text-cobalt transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><button type="button" onClick={copyEmail} data-testid="copy-email-button" className="flex items-center gap-3 self-start text-xs font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-cobalt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">{emailCopied ? <Check className="size-4 text-cobalt" /> : <Copy className="size-4 text-cobalt" />}{emailCopied ? t.contact.copied : t.contact.copyEmail}</button><div className="flex gap-5 pt-3"><a href={githubUrl} target="_blank" rel="noreferrer" data-testid="contact-github-link" className="flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-cobalt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">GitHub <ArrowUpRight className="size-3 text-cobalt" /></a><a href={linkedinUrl} target="_blank" rel="noreferrer" data-testid="contact-linkedin-link" className="flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-cobalt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">LinkedIn <ArrowUpRight className="size-3 text-cobalt" /></a></div></div></div></div></div></section>

      <footer data-testid="site-footer" className="bg-ink text-white/55"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-[0.65rem] uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span data-testid="footer-name">André Gustavo Reitz Fleischfresser</span><span data-testid="footer-note" className="flex items-center gap-2"><Terminal className="size-3 text-vermilion" /> {t.footer}</span></div></footer>
    </main>
  );
}