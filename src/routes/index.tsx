import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  
  Instagram,
  Facebook,
  Youtube,
  Calendar,
  Sparkles,
  Users,
  ChevronDown,
  Download,
  BookOpen,
} from "lucide-react";
import jbcLogo from "@/assets/jbc-logo.png.asset.json";
import ebookAsset from "@/assets/ebook-jbc-100-anos.pdf.asset.json";
import temposDePazImg from "@/assets/tempos-de-paz.png.asset.json";
import copaJbcImg from "@/assets/copa-jbc.png.asset.json";

export const Route = createFileRoute("/")({
  component: JBCLanding,
});

const EVENTS = [
  {
    title: "Audição JBC Music",
    subtitle:
      "Inscrições abertas para novos voluntários. Não é sobre palco — é sobre altar, adoração e um coração disponível para servir. Se você tem entre 18 e 40 anos e é membro de uma igreja batista filiada à Convenção Batista Carioca, esse lugar pode ser seu.",
    tag: "Audição · Inscrições abertas",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd0FsnKmxqXmTAxPIzqe5q4IDE4xN-6kiN6hjA0fdijsZzzWw/viewform",
    closed: false,
    image: null as string | null,
    meta: null as string | null,
  },
  {
    title: "Copa JBC · Campeonato de Futsal",
    subtitle:
      "Times escalados, confrontos definidos e muita energia dentro de quadra. Um dia para reunir a juventude no esporte e na comunhão.",
    tag: "Copa · Encerrado",
    href: "https://docs.google.com/forms/u/0/d/1L6pgBzo8JKFzZv9ERuxb54gv0PxFQX-BS0YJTqYOi5g/viewform?edit_requested=true",
    closed: true,
    image: copaJbcImg.url,
    meta: "16 de maio · Primeira Igreja Batista do Rio de Janeiro — Rua Frei Caneca, 525, Estácio · RJ",
  },
  {
    title: "Tempos de Paz",
    subtitle:
      "Roteiro da missão: três dias para servir, orar e viver a paz de Cristo em comunidade.",
    tag: "Missão · Encerrado",
    href: "https://docs.google.com/forms/d/1op80PJbCa0BCgSCSo96HFEhQyRlkehjMQ7OhDMihxFs/closedform",
    closed: true,
    image: temposDePazImg.url,
    meta: "19, 20 e 21 de junho",
  },
];

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/jbcarioca/", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/jbcarioca", Icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/@jbcarioca_", Icon: Youtube },
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
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function JBCLanding() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body antialiased selection:bg-foreground selection:text-background">
      <style>{`
        :root { --font-display: 'Montserrat', system-ui, sans-serif; --font-body: 'Inter', system-ui, sans-serif; }
        .font-display { font-family: var(--font-display); letter-spacing: -0.02em; font-weight: 800; }
        .font-body { font-family: var(--font-body); }
        [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].is-visible { opacity: 1; transform: none; }
        .grain::before {
          content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .04;
          background-image: radial-gradient(currentColor 1px, transparent 1px);
          background-size: 3px 3px;
        }
        .marquee { animation: marquee 40s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={jbcLogo.url} alt="JBC" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-display text-xl font-black tracking-tight">
              JBC<span className="text-accent">.</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollTo("historia")} className="hover:text-foreground/70 transition">Nossa História</button>
            <button onClick={() => scrollTo("eventos")} className="hover:text-foreground/70 transition">Eventos</button>
            <button onClick={() => scrollTo("conecte")} className="hover:text-foreground/70 transition">Conecte-se</button>
          </div>
          <button
            onClick={() => scrollTo("eventos")}
            className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Participar
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-foreground/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-foreground/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest text-accent font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> 1925 — 2025 · 100 anos
          </div>

          <h1
            data-reveal
            className="font-display mt-6 text-[15vw] leading-[0.9] font-black sm:text-[10vw] lg:text-[9rem]"
          >
            Juventude
            <br />
            <span className="text-primary">Batista</span> Carioca
          </h1>

          <p data-reveal className="mt-8 max-w-xl text-lg text-muted-foreground">
            Um movimento de jovens que acredita em conexão real, propósito e comunidade.
            Cem anos de história — e o melhor ainda está por vir.
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("eventos")}
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-accent/20"
            >
              Nossos Eventos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={() => scrollTo("historia")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <span className="h-px w-8 bg-current" />
              conheça a jbc
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border overflow-hidden py-6 bg-muted/30">
        <div className="marquee flex whitespace-nowrap gap-16 font-display text-3xl md:text-5xl font-bold">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 items-center pr-16">
              <span>CONEXÃO</span><span className="text-muted-foreground">◆</span>
              <span>PROPÓSITO</span><span className="text-muted-foreground">◆</span>
              <span>COMUNIDADE</span><span className="text-muted-foreground">◆</span>
              <span>100 ANOS</span><span className="text-muted-foreground">◆</span>
              <span>JBC</span><span className="text-muted-foreground">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* HISTÓRIA */}
      <section id="historia" className="py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" data-reveal>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              — Nossa História
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-[1]">
              100 anos
              <br />
              de uma mesma
              <br />
              juventude.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6" data-reveal>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desde 1925, a Juventude Batista Carioca é ponto de encontro de gerações que
              acreditam no poder da fé vivida em comunidade. São décadas de amizades,
              acampamentos, congressos e histórias que atravessam o tempo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Celebramos o passado como quem prepara o próximo capítulo — com a mesma
              coragem, o mesmo sonho e um chamado renovado para os jovens do Rio.
            </p>


            <a
              href={ebookAsset.url}
              download="E-BOOK_JBC_100_anos.pdf"
              className="group relative block overflow-hidden rounded-3xl border border-accent/40 bg-accent/10 p-8 md:p-10 hover:bg-accent/20 transition-colors"
            >
              <div className="relative flex items-start gap-6">
                <div className="shrink-0 grid place-items-center h-16 w-16 rounded-2xl bg-accent/20 border border-accent/40 text-accent">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">E-book · 100 anos</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mt-2">
                    Baixe o e-book da história da JBC
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Um século de fé, comunidade e juventude em um material comemorativo — grátis para download.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
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
      <section id="eventos" className="py-32 px-6 lg:px-10 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-reveal>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                — Eventos & Ações
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
                Inscreva-se
                <br />
                nas próximas ações.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Encontros, projetos e mobilizações da JBC. Escolha uma ação e faça parte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {EVENTS.map((e, i) => (
              <a
                key={i}
                href={e.href}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group relative overflow-hidden rounded-3xl border border-border bg-background flex flex-col hover:border-foreground transition-all duration-500 hover:-translate-y-2"
              >
                {e.image && (
                  <div className="relative overflow-hidden aspect-[16/10] bg-muted">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {e.closed && (
                      <span className="absolute top-4 left-4 z-10 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-foreground border border-border">
                        Inscrições encerradas
                      </span>
                    )}
                  </div>
                )}

                <div className="relative p-8 flex-1 flex flex-col justify-between min-h-[280px]">
                  <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 group-hover:text-background transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
                        {e.tag}
                      </span>
                      <span className="font-display text-2xl font-bold opacity-40">0{i + 1}</span>
                    </div>

                    <div className={e.image ? "mt-6" : "mt-24"}>
                      {!e.image && <Calendar className="h-6 w-6 mb-6 opacity-70" />}
                      <h3 className="font-display text-2xl font-bold leading-tight">
                        {e.title}
                      </h3>
                      {e.meta && (
                        <div className="mt-3 flex items-start gap-2 text-xs uppercase tracking-widest text-accent group-hover:text-accent/90 font-semibold">
                          <Calendar className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>{e.meta}</span>
                        </div>
                      )}
                      <p className="mt-3 text-sm text-muted-foreground group-hover:text-background/70">
                        {e.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-medium group-hover:text-background transition-colors duration-500">
                    {e.closed ? "Ver detalhes" : "Inscrever-se"}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONECTE-SE */}
      <section id="conecte" className="py-32 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16" data-reveal>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              — Conecte-se
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
              Onde a gente
              <br />
              se encontra.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Siga a JBC nas redes e acompanhe tudo que está rolando.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6" data-reveal>
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border p-10 flex flex-col items-start gap-8 hover:bg-foreground hover:text-background transition-all duration-500 min-h-[260px]"
              >
                <Icon className="h-10 w-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.5} />
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest opacity-60">Rede social</div>
                  <div className="font-display text-3xl font-bold mt-2">{name}</div>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  Seguir <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img src={jbcLogo.url} alt="JBC" className="h-12 w-12 rounded-lg object-cover" />
                <div className="font-display text-4xl font-black">JBC<span className="text-accent">.</span></div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground max-w-sm">
                Juventude Batista Carioca — 100 anos conectando jovens, fé e comunidade.
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Navegação</div>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollTo("top")} className="hover:text-foreground/70">Início</button></li>
                <li><button onClick={() => scrollTo("historia")} className="hover:text-foreground/70">História</button></li>
                <li><button onClick={() => scrollTo("eventos")} className="hover:text-foreground/70">Eventos</button></li>
                <li><button onClick={() => scrollTo("conecte")} className="hover:text-foreground/70">Conecte-se</button></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Social</div>
              <ul className="space-y-2 text-sm">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground/70">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Juventude Batista Carioca. Todos os direitos reservados.</div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5" /> Feito com propósito no Rio de Janeiro
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
