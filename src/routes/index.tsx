import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  Calendar,
  MapPin,
  Sparkles,
  ChevronDown,
  Download,
  BookOpen,
  Menu,
  X,
  Search,
  SlidersHorizontal,
  Heart,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import jbcLogo from "@/assets/jbc-logo.png.asset.json";
import ebookAsset from "@/assets/ebook-jbc-100-anos.pdf.asset.json";
import temposDePazImg from "@/assets/tempos-de-paz.png.asset.json";
import copaJbcImg from "@/assets/copa-jbc.png.asset.json";
import jbcMusicImg from "@/assets/jbc-music.jpg.asset.json";
import vigiliaImg from "@/assets/vigilia-jbc.png.asset.json";

export const Route = createFileRoute("/")({
  component: JBCLanding,
});

type EventItem = {
  title: string;
  subtitle: string;
  tag: string;
  href: string;
  closed: boolean;
  image: string;
  date?: string;
  location?: string;
  badgeLabel?: string;
  ctaLabel?: string;
};

const EVENTS: EventItem[] = [
  {
    title: "Vigília da JBC · Somos Um",
    subtitle:
      "Uma noite inteira em oração, adoração e comunhão — numa mesma paixão. Chegue cedo, traga um amigo e viva essa experiência com a gente.",
    tag: "Vigília",
    href: "https://www.google.com/maps/search/?api=1&query=Igreja+Batista+do+Meier+Rua+Hermengarda+31+Rio+de+Janeiro",
    closed: false,
    image: vigiliaImg.url,
    date: "31 de julho · 22h às 6h",
    location: "Igreja Batista do Méier · Rua Hermengarda, 31 — RJ",
    badgeLabel: "Em breve",
    ctaLabel: "Ver local no mapa",
  },
  {
    title: "Audição JBC Music",
    subtitle:
      "Não é sobre palco — é sobre altar, adoração e um coração disponível para servir. Se você tem entre 18 e 40 anos e é membro de uma igreja batista filiada à Convenção Batista Carioca, esse lugar pode ser seu.",
    tag: "Audição",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd0FsnKmxqXmTAxPIzqe5q4IDE4xN-6kiN6hjA0fdijsZzzWw/viewform",
    closed: false,
    image: jbcMusicImg.url,
  },
  {
    title: "Copa JBC · Campeonato de Futsal",
    subtitle:
      "Times escalados, confrontos definidos e muita energia dentro de quadra. Um dia para reunir a juventude no esporte e na comunhão.",
    tag: "Copa",
    href: "https://docs.google.com/forms/u/0/d/1L6pgBzo8JKFzZv9ERuxb54gv0PxFQX-BS0YJTqYOi5g/viewform?edit_requested=true",
    closed: true,
    image: copaJbcImg.url,
    date: "16 de maio",
    location: "1ª Igreja Batista do Rio · Estácio",
  },
  {
    title: "Tempos de Paz",
    subtitle:
      "Roteiro da missão: três dias para servir, orar e viver a paz de Cristo em comunidade.",
    tag: "Missão",
    href: "https://docs.google.com/forms/d/1op80PJbCa0BCgSCSo96HFEhQyRlkehjMQ7OhDMihxFs/closedform",
    closed: true,
    image: temposDePazImg.url,
    date: "19, 20 e 21 de junho",
  },
];

type EventStatus = "open" | "upcoming" | "closed";

function getEventStatus(e: EventItem): EventStatus {
  if (e.badgeLabel?.toLowerCase().includes("breve")) return "upcoming";
  if (e.closed) return "closed";
  return "open";
}

const STATUS_FILTERS: { id: "all" | EventStatus; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "open", label: "Inscrições abertas" },
  { id: "upcoming", label: "Em breve" },
  { id: "closed", label: "Encerrado" },
];

const SOCIALS = [
  { name: "Instagram", handle: "@jbcarioca", href: "https://www.instagram.com/jbcarioca/", Icon: Instagram },
  { name: "Facebook", handle: "/jbcarioca", href: "https://www.facebook.com/jbcarioca", Icon: Facebook },
  { name: "YouTube", handle: "@jbcarioca_", href: "https://www.youtube.com/@jbcarioca_", Icon: Youtube },
];

const NAV = [
  { id: "historia", label: "Nossa História" },
  { id: "eventos", label: "Eventos" },
  { id: "conecte", label: "Conecte-se" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const THEME_OPTIONS: { id: Theme; label: string; Icon: typeof Sun }[] = [
  { id: "light", label: "Claro", Icon: Sun },
  { id: "dark", label: "Escuro", Icon: Moon },
  { id: "system", label: "Sistema", Icon: Monitor },
];

function ThemeToggle({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-card/40 backdrop-blur p-0.5 ${
        variant === "full" ? "w-full justify-between" : ""
      }`}
    >
      {THEME_OPTIONS.map(({ id, label, Icon }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            title={label}
            onClick={() => setTheme(id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition focus-ring ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-foreground/70 hover:text-foreground"
            } ${variant === "full" ? "flex-1 justify-center py-2 text-sm" : ""}`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className={variant === "compact" ? "sr-only sm:not-sr-only" : ""}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function JBCLanding() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("top");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowTopBtn(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EventStatus>("all");

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      if (statusFilter !== "all" && getEventStatus(e) !== statusFilter) return false;
      if (!q) return true;
      return [e.title, e.subtitle, e.tag, e.date, e.location]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [query, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: EVENTS.length, open: 0, upcoming: 0, closed: 0 };
    EVENTS.forEach((e) => (counts[getEventStatus(e)] += 1));
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body antialiased selection:bg-accent selection:text-accent-foreground">
      <style>{`
        :root { --font-display: 'Montserrat', system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif; }
        .font-display { font-family: var(--font-display); letter-spacing: -0.02em; font-weight: 800; }
        .font-body { font-family: var(--font-body); }
        [data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].is-visible { opacity: 1; transform: none; }
        .marquee { animation: marquee 40s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .focus-ring:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 9999px; }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .marquee { animation: none; }
        }
      `}</style>

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo
      </a>

      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("top")}
            className="flex items-center gap-2.5 focus-ring"
            aria-label="Ir para o topo"
          >
            <img src={jbcLogo.url} alt="" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-lg font-black tracking-tight">
              JBC<span className="text-accent">.</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((n) => {
              const active = activeSection === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  aria-current={active ? "true" : undefined}
                  className={`relative px-3 py-2 rounded-full transition focus-ring ${
                    active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {n.label}
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-[3px] w-1 rounded-full bg-accent transition-all duration-300 ${
                      active ? "opacity-100 w-6" : "opacity-0 w-1"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={() => scrollTo("eventos")}
              className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition focus-ring"
            >
              Participar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground focus-ring"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 pb-6 pt-2 flex flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium hover:bg-muted/50 transition"
              >
                {n.label}
                <ArrowRight className="h-4 w-4 opacity-60" />
              </button>
            ))}
            <button
              onClick={() => scrollTo("eventos")}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold"
            >
              Participar
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-semibold px-1">
                Tema
              </div>
              <ThemeToggle variant="full" />
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-center pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.08) 1px, transparent 0)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
            }}
          />
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl animate-pulse [animation-duration:8s]" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl animate-pulse [animation-duration:10s]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 w-full">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-accent font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5" /> 1925 — 2026 · 101 anos
          </div>

          <h1
            data-reveal
            className="font-display mt-6 font-black leading-[0.9] text-[clamp(3rem,11vw,9rem)]"
          >
            Juventude
            <br />
            <span className="text-primary">Batista</span> Carioca
          </h1>

          <p
            data-reveal
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Um movimento de jovens que acredita em conexão real, propósito e comunidade.
            Mais de 100 anos de história — e o melhor ainda está por vir.
          </p>

          <div data-reveal className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo("eventos")}
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-6 py-3.5 text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-accent/25 focus-ring min-h-11"
            >
              Nossos Eventos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={() => scrollTo("historia")}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/30 backdrop-blur px-5 py-3.5 text-sm text-foreground/90 hover:bg-muted/50 hover:border-foreground/30 transition focus-ring min-h-11"
            >
              Conheça a JBC
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Quick stats */}
          <div
            data-reveal
            className="mt-14 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl"
          >
            {[
              { k: "101", v: "anos de história" },
              { k: "3", v: "ações ativas" },
              { k: "∞", v: "conexões reais" },
            ].map((s) => (
              <div
                key={s.v}
                className="group rounded-2xl border border-border bg-card/40 backdrop-blur px-4 py-4 sm:px-5 sm:py-5 hover:border-accent/50 hover:bg-card/60 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="font-display text-3xl sm:text-4xl font-black text-primary leading-none group-hover:text-accent transition-colors">
                  {s.k}
                </div>
                <div className="mt-2 text-[11px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <button
          onClick={() => scrollTo("historia")}
          aria-label="Rolar para próxima seção"
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground hover:text-accent transition focus-ring"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Role</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap border-y border-border overflow-hidden py-5 sm:py-6 bg-muted/30" aria-hidden="true">
        <div className="marquee flex whitespace-nowrap gap-10 sm:gap-16 font-display text-2xl sm:text-4xl md:text-5xl font-bold">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10 sm:gap-16 items-center pr-10 sm:pr-16">
              <span>CONEXÃO</span><span className="text-accent">◆</span>
              <span>PROPÓSITO</span><span className="text-accent">◆</span>
              <span>COMUNIDADE</span><span className="text-accent">◆</span>
              <span>+100 ANOS</span><span className="text-accent">◆</span>
              <span>JBC</span><span className="text-accent">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* HISTÓRIA */}
      <section id="historia" className="py-24 sm:py-32 px-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5" data-reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              — Nossa História
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1]">
              +100 anos
              <br />
              de uma mesma
              <br />
              <span className="text-primary">juventude.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6" data-reveal>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Desde 1925, a Juventude Batista Carioca é ponto de encontro de gerações que
              acreditam no poder da fé vivida em comunidade. São décadas de amizades,
              acampamentos, congressos e histórias que atravessam o tempo.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Celebramos o passado como quem prepara o próximo capítulo — com a mesma
              coragem, o mesmo sonho e um chamado renovado para os jovens do Rio.
            </p>

            <a
              href={ebookAsset.url}
              download="E-BOOK_JBC_100_anos.pdf"
              className="group relative block overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-6 sm:p-8 md:p-10 hover:border-accent/70 hover:from-accent/25 transition-all focus-ring"
            >
              <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 sm:gap-6">
                <div className="shrink-0 grid place-items-center h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-accent/20 border border-accent/40 text-accent">
                  <BookOpen className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
                    E-book · 100 anos · Grátis
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">
                    Baixe o e-book da história da JBC
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                    Um século de fé, comunidade e juventude em um material comemorativo.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold shadow-md shadow-accent/20">
                    <Download className="h-4 w-4" />
                    Baixar PDF
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* EVENTOS */}
      <section
        id="eventos"
        className="py-24 sm:py-32 px-5 sm:px-6 lg:px-10 bg-muted/30 border-y border-border"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
            data-reveal
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
                — Eventos & Ações
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95]">
                Inscreva-se
                <br />
                nas próximas <span className="text-primary">ações.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground text-base sm:text-lg">
              Encontros, projetos e mobilizações da JBC. Escolha uma ação e faça parte.
            </p>
          </div>

          {/* Filtros e busca */}
          <div
            data-reveal
            className="mb-8 sm:mb-10 rounded-3xl border border-border bg-card/60 backdrop-blur p-4 sm:p-5 flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
              <label className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  inputMode="search"
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                  placeholder="Buscar por nome, data, local…"
                  aria-label="Buscar eventos"
                  className="w-full h-12 rounded-full bg-background border border-border pl-11 pr-11 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Limpar busca"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>
              <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                <SlidersHorizontal className="h-4 w-4" /> Filtrar
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar por status"
              className="flex flex-wrap gap-2"
            >
              {STATUS_FILTERS.map((f) => {
                const active = statusFilter === f.id;
                const count = statusCounts[f.id] ?? 0;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStatusFilter(f.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition focus-ring ${
                      active
                        ? "bg-accent text-accent-foreground border-accent shadow-md shadow-accent/20"
                        : "bg-background text-foreground/80 border-border hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {f.label}
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        active ? "bg-accent-foreground/15" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div
              data-reveal
              className="rounded-3xl border border-dashed border-border bg-card/40 py-16 px-6 text-center"
            >
              <div className="mx-auto grid place-items-center h-14 w-14 rounded-full bg-muted text-muted-foreground mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">Nenhum evento encontrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tente outra busca ou remova os filtros aplicados.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent transition"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
              <div
                className="mb-5 flex items-center justify-between text-xs text-muted-foreground"
                aria-live="polite"
              >
                <span>
                  Mostrando{" "}
                  <strong className="text-foreground">{filteredEvents.length}</strong>{" "}
                  {filteredEvents.length === 1 ? "evento" : "eventos"}
                  {statusFilter !== "all" && (
                    <>
                      {" "}·{" "}
                      <span className="text-accent">
                        {STATUS_FILTERS.find((s) => s.id === statusFilter)?.label}
                      </span>
                    </>
                  )}
                </span>
                {(query || statusFilter !== "all") && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("all");
                    }}
                    className="text-accent hover:underline font-semibold"
                  >
                    Limpar
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

              {filteredEvents.map((e) => (
                <a
                  key={e.title}
                  href={e.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card flex flex-col hover:border-accent/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 focus-ring"
                  aria-label={`${e.title} — ${
                    e.badgeLabel ?? (e.closed ? "inscrições encerradas" : "inscrever-se")
                  }`}
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-muted">
                    <img
                      src={e.image}
                      alt=""
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                        e.closed ? "grayscale-[45%] group-hover:grayscale-0" : ""
                      }`}
                    />
                    {/* subtle bottom fade into card body */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/70 to-transparent" />
                    {/* neutral top scrim for badge legibility on any theme */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold border shadow-sm ${
                          e.closed
                            ? "bg-background/85 text-muted-foreground border-border"
                            : "bg-accent text-accent-foreground border-accent shadow-accent/30"
                        }`}
                      >
                        {!e.closed && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground animate-pulse" />
                        )}
                        {e.badgeLabel ?? (e.closed ? "Encerrado" : "Inscrições abertas")}
                      </span>
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-7 flex-1 flex flex-col">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
                      {e.tag}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight mt-2">
                      {e.title}
                    </h3>

                    {(e.date || e.location) && (
                      <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
                        {e.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{e.date}</span>
                          </div>
                        )}
                        {e.location && (
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                            <span>{e.location}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      {e.subtitle}
                    </p>

                    <div
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
                        e.closed ? "text-muted-foreground" : "text-accent"
                      }`}
                    >
                      {e.ctaLabel ?? (e.closed ? "Ver detalhes" : "Inscrever-se agora")}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </a>
              ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CONECTE-SE */}
      <section id="conecte" className="py-24 sm:py-32 px-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16" data-reveal>
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              — Conecte-se
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.95]">
              Onde a gente
              <br />
              <span className="text-primary">se encontra.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
              Siga a JBC nas redes e acompanhe tudo que está rolando.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" data-reveal>
            {SOCIALS.map(({ name, handle, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-8 flex flex-col gap-6 hover:border-accent/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 min-h-[220px] focus-ring"
              >
                <div className="flex items-start justify-between">
                  <div className="grid place-items-center h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 text-primary group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-auto">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Rede social
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold mt-1.5">{name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-14 sm:py-16">
          <div className="grid md:grid-cols-12 gap-10 md:gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <img src={jbcLogo.url} alt="" className="h-11 w-11 rounded-lg object-cover" />
                <div className="font-display text-3xl sm:text-4xl font-black">
                  JBC<span className="text-accent">.</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
                Juventude Batista Carioca — +100 anos conectando jovens, fé e comunidade
                no Rio de Janeiro.
              </p>
              <a
                href={ebookAsset.url}
                download="E-BOOK_JBC_100_anos.pdf"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 text-accent px-4 py-2 text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition focus-ring"
              >
                <Download className="h-3.5 w-3.5" />
                Baixar e-book dos 100 anos
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-semibold">
                Navegação
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => scrollTo("top")} className="text-foreground/80 hover:text-accent transition">
                    Início
                  </button>
                </li>
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => scrollTo(n.id)}
                      className="text-foreground/80 hover:text-accent transition"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-semibold">
                Social
              </div>
              <ul className="space-y-2.5 text-sm">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-foreground/80 hover:text-accent transition group"
                    >
                      <s.Icon className="h-4 w-4" />
                      <span>{s.name}</span>
                      <span className="text-muted-foreground group-hover:text-accent transition">
                        · {s.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Juventude Batista Carioca. Todos os direitos reservados.</div>
            <div className="flex items-center gap-2">
              Feito com <Heart className="h-3.5 w-3.5 text-accent fill-accent" /> no Rio de Janeiro
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top FAB */}
      <button
        onClick={() => scrollTo("top")}
        aria-label="Voltar ao topo"
        className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 h-12 w-12 rounded-full bg-accent text-accent-foreground shadow-xl shadow-accent/30 grid place-items-center transition-all duration-300 hover:scale-110 active:scale-95 focus-ring ${
          showTopBtn ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
