import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { MagicCard } from "@/components/ui/magic-card";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { cn } from "@/lib/utils";
import { CheckBadge, Eyebrow, Icon, SignalSquare } from "@/components/brand";

const MESSAGE =
  "« Bonjour Claire, j'ai vu que vous recrutez votre premier responsable acquisition. Félicitations pour la croissance. J'ai repéré 3\u00A0sujets sur lesquels vos concurrents se positionnent déjà sur Google. Je vous les envoie ? »";

// Aperçu du message email de la fiche (exemple fictif) : l'objet et la première ligne.
const EMAIL = {
  subject: "3\u00A0sujets SEO pour votre futur responsable acquisition",
  opening: "Bonjour Claire, en voyant votre offre pour un premier responsable acquisition, j'ai regardé votre marché sur Google.",
};

function Row({ label, children, accent }: { label: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className="grid grow grid-cols-1 content-center gap-1.5 border-b border-line px-6 py-3.5 last:border-b-0 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 md:px-7 md:py-4">
      <dt className="label-mono pt-1 text-ink-3">{label}</dt>
      <dd className={cn("text-pretty md:max-w-[40em]", accent && "flex items-start gap-2.5")}>{children}</dd>
    </div>
  );
}

function Fiche() {
  return (
    <article className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-7">
        <p className="text-[0.95rem] leading-snug">
          <strong className="block font-semibold sm:inline">Fiche prospect</strong>{" "}
          <span className="text-ink-3">1&nbsp;sur&nbsp;10</span>
        </p>
        <span className="label-mono shrink-0 rounded-full border border-line-2 px-2.5 py-1 whitespace-nowrap text-ink-2">Exemple fictif</span>
      </header>
      <dl className="flex flex-1 flex-col text-[0.98rem] leading-relaxed">
        <Row label="Entreprise">Éditeur de logiciel RH, Lyon, 40&nbsp;salariés</Row>
        <Row label="Signal" accent>
          <SignalSquare className="mt-[0.5em]" />
          <span>
            Recrute son premier responsable acquisition.{" "}
            <span className="text-[0.9rem] text-ink-3 md:block">Offre publiée il y a 5&nbsp;jours.</span>
          </span>
        </Row>
        <Row label="Décideur">
          La fondatrice, qui dirige aussi le marketing.{" "}
          <span className="text-[0.9rem] text-ink-3 md:block">Profil LinkedIn inclus.</span>
        </Row>
        <Row label="Pourquoi maintenant">
          La personne recrutée voudra des premiers résultats en 90&nbsp;jours. Le SEO et le contenu seront sur sa liste.
        </Row>
        <Row label="Message LinkedIn">
          <div className="rounded-2xl rounded-tl-md bg-paper-2 px-4 py-3.5 text-ink">
            <TypingAnimation as="p" duration={22} startOnView delay={250}>
              {MESSAGE}
            </TypingAnimation>
          </div>
        </Row>
        <Row label="Message email">
          <div className="rounded-2xl border border-line bg-paper/60 px-4 py-3 text-[0.9rem] leading-snug">
            <p>
              <span className="text-ink-3">Objet&nbsp;:</span> <span className="font-medium text-ink">{EMAIL.subject}</span>
            </p>
            <p className="mt-1.5 overflow-hidden whitespace-nowrap text-ink-2 [mask-image:linear-gradient(to_right,#000_70%,transparent)]">
              {EMAIL.opening}
            </p>
          </div>
          <p className="mt-2 text-[0.9rem] leading-snug text-ink-3">Une version plus complète, dans le ton de ton agence.</p>
        </Row>
      </dl>
      <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line bg-paper/60 px-6 py-4 text-[0.88rem] text-ink-2 md:px-7">
        {["Signal daté et sourcé", "Décideur identifié", "Deux messages prêts"].map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <CheckBadge className="size-5" />
            {t}
          </span>
        ))}
      </footer>
    </article>
  );
}

/** Cadre commun des deux visuels : une tuile qui occupe la hauteur libre de la carte, contenu centré. */
function Tile({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className="flex h-full flex-col px-6 pt-6 md:px-7 md:pt-7">
      <div className="flex flex-1 flex-col justify-center rounded-2xl border border-line bg-paper/70 p-4">{children}</div>
    </div>
  );
}

function MiniMap() {
  // 16 x 5 points, 3 carrés : la carte du marché en miniature
  const lit = new Set([21, 44, 66]);
  return (
    <Tile>
      <div className="grid grid-cols-16 gap-1">
        {Array.from({ length: 80 }, (_, i) => (
          <span key={i} className="flex aspect-square items-center justify-center">
            <span className={lit.has(i) ? "block size-2.5 rounded-[2.5px] bg-signal" : "block size-[5px] rounded-full bg-line-2"} />
          </span>
        ))}
      </div>
      {/* légende : le premier repère tombe dans l'axe de la première colonne de points */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 pl-[calc((100%-60px)/32-2.5px)] text-[0.75rem] leading-none text-ink-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-[5px] rounded-full bg-line-2" />
          Ta cible
        </span>
        <span className="inline-flex items-center gap-1.5">
          <SignalSquare className="size-[7px]" />
          Un signal ce mois-ci
        </span>
      </div>
    </Tile>
  );
}

function MiniDoc() {
  const lines = [
    "D'où viennent tes clients",
    <>
      Ta dépendance au <span className="whitespace-nowrap">bouche-à-oreille</span>
    </>,
    "Ce que te coûtent tes mois creux, en euros",
  ];
  return (
    <Tile>
      <div className="mb-3 h-2 w-2/5 rounded-full bg-ink/80" />
      <ul className="grid gap-2">
        {lines.map((l, i) => (
          <li key={i} className="flex items-baseline gap-2.5 text-[0.82rem] leading-snug text-pretty text-ink-2">
            <span className="size-1.5 shrink-0 -translate-y-px rounded-full bg-ink" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 hidden gap-1.5 md:grid xl:hidden">
        <span className="h-1.5 rounded-full bg-line" />
        <span className="h-1.5 w-3/4 rounded-full bg-line" />
      </div>
    </Tile>
  );
}

const cardSkin = "h-full rounded-3xl shadow-card";
// halo discret et neutre : l'orange reste réservé aux signaux
const spot = { gradientColor: "#F2EDE3", gradientFrom: "#B8B1A5", gradientTo: "#D6CEBF", gradientSize: 240, gradientOpacity: 0.7 };

export function Contents() {
  return (
    <section id="radar" className="border-y border-line bg-paper-2 py-24 md:py-32">
      <div className="wrap">
        <BlurFade inView direction="up" className="max-w-[46rem]">
          <Eyebrow step={3}>Le livrable</Eyebrow>
          <h2 className="display-section mt-4">
            Ce que contient ton Radar.
          </h2>
          <p className="lead mt-5 text-ink-2">
            Dix fiches comme celle-ci, prêtes à l'emploi.
            <br className="max-sm:hidden" /> Tu n'as rien à chercher, rien à rédiger.
          </p>
        </BlurFade>

        <BentoGrid className="mt-12 auto-rows-auto grid-cols-1 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
          <BlurFade inView direction="up" className="md:col-span-2 xl:row-span-2">
            <MagicCard className={`${cardSkin} overflow-hidden`} {...spot}>
              <Fiche />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.08}>
            <MagicCard className={cardSkin} {...spot}>
              <BentoCard
                className="text-pretty"
                name="La carte de ton marché"
                eyebrow="Inclus"
                background={<MiniMap />}
                description="Combien d'entreprises correspondent à ton client idéal sur ta zone. Et combien montrent un signal chaque mois (estimation)."
              />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.14}>
            <MagicCard className={cardSkin} {...spot}>
              <BentoCard
                className="text-pretty"
                name="Ton diagnostic d'une page"
                eyebrow="Inclus"
                background={<MiniDoc />}
                description={
                  <>
                    D'où viennent tes clients, ta dépendance au <span className="whitespace-nowrap">bouche-à-oreille</span>, et ce que te
                    coûtent tes mois creux, en euros.
                  </>
                }
              />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.1} className="md:col-span-2 xl:col-span-3">
            <MagicCard className={cardSkin} {...spot}>
              <div className="grid gap-5 p-6 md:p-7 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-10">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 md:items-start md:gap-y-1.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-paper-2 text-ink md:row-span-2">
                    <Icon.Message />
                  </span>
                  <h3 className="font-display text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">Des messages à ton nom</h3>
                  <p className="col-span-2 max-w-[36em] text-[0.98rem] leading-relaxed text-ink-2 md:col-span-1 md:col-start-2">
                    Écrits à partir du signal réel, jamais d'un modèle générique.
                    <br className="max-md:hidden" /> Tu les envoies depuis ton compte, si tu le veux.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 md:pl-15 xl:flex-nowrap xl:pl-0">
                  {["Message LinkedIn", "Message email", "Dans le ton de ton agence"].map((t) => (
                    <li key={t} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[0.86rem] font-medium whitespace-nowrap text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          </BlurFade>
        </BentoGrid>
      </div>
    </section>
  );
}
