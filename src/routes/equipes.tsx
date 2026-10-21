import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Music, Megaphone, GraduationCap, Users, Trophy, HeartHandshake, Flame } from "lucide-react";
import jbcLogo from "@/assets/jbc-logo.png.asset.json";
import jbcMusicImg from "@/assets/jbc-music.jpg.asset.json";

const SIGNUP_URL = "https://forms.gle/VGYy399t2H2eVS6u9";
const AUDITION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd0FsnKmxqXmTAxPIzqe5q4IDE4xN-6kiN6hjA0fdijsZzzWw/viewform";

export const Route = createFileRoute("/equipes")({
  head: () => ({
    meta: [
      { title: "Equipes — JBC Juventude Batista Carioca" },
      { name: "description", content: "Conheça as coordenadorias da JBC, a Audição JBC Music e inscreva-se para servir com a gente." },
      { property: "og:title", content: "Equipes — JBC Juventude Batista Carioca" },
      { property: "og:description", content: "Conheça as coordenadorias da JBC e inscreva-se para servir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EquipesPage,
});

const COORDS = [
  { icon: Music, name: "Adoração e Arte", text: "Conduz a adoração e as expressões artísticas da JBC: música, ministração, teatro e dança nos encontros e eventos." },
  { icon: HeartHandshake, name: "Missões", text: "Lidera projetos missionários, como o Tempos de Paz, e ações de serviço e evangelismo na cidade." },
  { icon: Flame, name: "Intercessão e Devoção", text: "Sustenta em oração cada projeto e pessoa, promovendo vigílias e uma vida devocional constante." },
  { icon: GraduationCap, name: "Capacitação", text: "Forma e treina líderes e jovens com cursos, workshops e conteúdos para crescer na fé e no serviço." },
  { icon: Trophy, name: "Esportes", text: "Organiza a Copa JBC e outras ações esportivas que reúnem a juventude em comunhão." },
  { icon: Megaphone, name: "Comunicação", text: "Cuida das redes sociais, artes, fotos, vídeos e de toda a divulgação da JBC." },
  { icon: Users, name: "Universitários", text: "Conecta e acompanha jovens universitários, levando fé e comunhão para dentro dos campi." },
];

function EquipesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border">
        <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 focus-ring">
            <img src={jbcLogo.url} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-lg font-black tracking-tight">
              JBC<span className="text-accent">.</span>
            </span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-4 min-h-10 text-sm font-semibold hover:bg-muted/50 transition focus-ring">
            <ArrowLeft className="h-4 w-4" /> Voltar ao início
          </Link>
        </nav>
      </header>

      <main className="px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="eyebrow mb-4">Equipes</div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight">
            Sirva com a <span className="text-gradient-brand">JBC.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
            A JBC é feita por jovens que colocam seus dons a serviço do Reino. Conheça nossas
            coordenadorias e descubra onde você pode servir.
          </p>

          {/* Audição */}
          <a
            href={AUDITION_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-14 grid md:grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card hover:border-accent/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 focus-ring"
          >
            <div className="relative aspect-[16/10] md:aspect-auto bg-muted overflow-hidden">
              <img src={jbcMusicImg.url} alt="Banda ministrando louvor" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-7 sm:p-10 flex flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground animate-pulse" />
                Inscrições abertas
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold mt-4 group-hover:text-accent transition-colors">
                Audição JBC Music
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Não é sobre palco — é sobre altar, adoração e um coração disponível para servir. Se
                você tem entre 18 e 40 anos e é membro de uma igreja batista filiada à Convenção
                Batista Carioca, esse lugar pode ser seu.
              </p>
              <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Inscrever-se na audição <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </div>
          </a>

          {/* Coordenadorias */}
          <h2 className="font-display text-3xl sm:text-5xl font-bold mt-24">Nossas coordenadorias</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COORDS.map(({ icon: Icon, name, text }) => (
              <div key={name} className="rounded-3xl border border-border bg-card p-7 hover:border-accent/60 hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold mt-5">{name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-black">Quer fazer parte?</h2>
            <p className="mt-3 opacity-90 max-w-xl mx-auto">
              Inscreva-se na coordenadoria com a qual você mais se identifica.
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 min-h-12 text-base font-semibold hover:opacity-90 active:scale-[0.97] transition focus-ring"
            >
              Inscreva-se nas coordenadorias
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
