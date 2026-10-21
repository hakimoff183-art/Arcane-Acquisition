import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { MagicCard } from "@/components/ui/magic-card";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Icon, SignalSquare } from "@/components/brand";

const MESSAGE =
  "« Bonjour Claire, j'ai vu que vous recrutez votre premier responsable acquisition. Félicitations pour la croissance. J'ai repéré 3 sujets sur lesquels vos concurrents se positionnent déjà sur Google. Je vous les envoie ? »";

function Row({ label, children, accent }: { label: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className="grid gap-1.5 border-b border-line px-6 py-4 last:border-b-0 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 md:px-7">
      <dt className="label-mono pt-1 text-ink-3">{label}</dt>
      <dd className={accent ? "flex items-start gap-2.5" : ""}>{children}</dd>
    </div>
  );
}

function Fiche() {
  return (
    <article className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-7">
        <p className="text-[0.95rem]">
          <strong className="font-semibold">Fiche prospect</strong> <span className="text-ink-3">1 sur 10</span>
        </p>
        <span className="label-mono shrink-0 rounded-full border border-line-2 px-2.5 py-1 whitespace-nowrap text-ink-2">Exemple fictif</span>
      </header>
      <dl className="flex-1 text-[0.98rem] leading-relaxed">
        <Row label="Entreprise">Éditeur de logiciel RH, Lyon, 40 salariés</Row>
        <Row label="Signal" accent>
          <SignalSquare className="mt-[0.5em]" />
          <span>Recrute son premier responsable acquisition. Offre publiée il y a 5 jours.</span>
        </Row>
        <Row label="Décideur">La fondatrice, qui dirige aussi le marketing. Profil LinkedIn inclus.</Row>
        <Row label="Pourquoi maintenant">
          La personne recrutée voudra des premiers résultats en 90 jours. Le SEO et le contenu seront sur sa liste.
        </Row>
        <Row label="Message LinkedIn">
          <div className="rounded-2xl rounded-tl-md bg-paper-2 px-4 py-3.5 text-ink">
            <TypingAnimation as="p" duration={22} startOnView delay={250}>
              {MESSAGE}
            </TypingAnimation>
          </div>
        </Row>
        <Row label="Message email">Une version plus complète, dans le ton de ton agence.</Row>
      </dl>
      <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line bg-paper/60 px-6 py-4 text-[0.88rem] text-ink-2 md:px-7">
        {["Signal daté et sourcé", "Décideur identifié", "Deux messages prêts"].map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <span aria-hidden className="flex size-4.5 items-center justify-center rounded-[5px] bg-ink text-paper">
              <Icon.Check className="size-3" />
            </span>
            {t}
          </span>
        ))}
      </footer>
    </article>
  );
}

function MiniMap() {
  // 14 x 6 points, 3 carrés : la carte du marché en miniature
  const lit = new Set([17, 46, 74]);
  return (
    <div aria-hidden className="grid grid-cols-14 gap-2.5 px-6 pt-7 md:px-7">
      {Array.from({ length: 84 }, (_, i) => (
        <span key={i} className="flex aspect-square items-center justify-center">
          <span className={lit.has(i) ? "block size-[70%] rounded-[22%] bg-signal" : "block size-[34%] rounded-full bg-line-2"} />
        </span>
      ))}
    </div>
  );
}

function MiniDoc() {
  const lines = ["D'où viennent tes clients", "Ta dépendance au bouche-à-oreille", "Ce que te coûtent tes mois creux, en euros"];
  return (
    <div aria-hidden className="px-6 pt-7 md:px-7">
      <div className="rounded-xl border border-line bg-paper/70 p-4">
        <div className="mb-3 h-2 w-2/5 rounded-full bg-ink/80" />
        <ul className="grid gap-2.5">
          {lines.map((l) => (
            <li key={l} className="flex items-center gap-2.5 text-[0.82rem] text-ink-2">
              <span className="size-1.5 shrink-0 rounded-full bg-ink" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const cardSkin = "rounded-3xl";
const spot = { gradientColor: "#F6EADB", gradientFrom: "#FF6600", gradientTo: "#FFD3B5", gradientSize: 260, gradientOpacity: 0.9 };

export function Contents() {
  return (
    <section id="radar" className="pb-24 md:pb-32">
      <div className="wrap">
        <BlurFade inView direction="up" className="max-w-[46rem]">
          <p className="label-mono text-ink-3">Le livrable</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1] font-bold tracking-[-0.045em]">
            Ce que contient ton Radar.
          </h2>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
            Dix fiches comme celle-ci, prêtes à l'emploi. Tu n'as rien à chercher, rien à rédiger.
          </p>
        </BlurFade>

        <BentoGrid className="mt-12 auto-rows-auto grid-cols-1 lg:grid-cols-3">
          <BlurFade inView direction="up" className="lg:col-span-2 lg:row-span-2">
            <MagicCard className={`h-full ${cardSkin}`} {...spot}>
              <Fiche />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.08}>
            <MagicCard className={`h-full ${cardSkin}`} {...spot}>
              <BentoCard
                name="La carte de ton marché"
                eyebrow="Inclus"
                background={<MiniMap />}
                description="Combien d'entreprises correspondent à ton client idéal sur ta zone. Et combien montrent un signal chaque mois (estimation)."
              />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.14}>
            <MagicCard className={`h-full ${cardSkin}`} {...spot}>
              <BentoCard
                name="Ton diagnostic d'une page"
                eyebrow="Inclus"
                background={<MiniDoc />}
                description="D'où viennent tes clients, ta dépendance au bouche-à-oreille, et ce que te coûtent tes mois creux, en euros."
              />
            </MagicCard>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.1} className="lg:col-span-3">
            <MagicCard className={`h-full ${cardSkin}`} {...spot}>
              <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink">
                    <Icon.Message />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">Des messages à ton nom</h3>
                    <p className="mt-1.5 max-w-[40em] text-[0.98rem] leading-relaxed text-ink-2">
                      Écrits à partir du signal réel, jamais d'un modèle générique. Tu les envoies depuis ton compte, si tu le veux.
                    </p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2 md:justify-end">
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
