import type { ReactNode } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow, Icon, SignalSquare } from "@/components/brand";
import { cn } from "@/lib/utils";

// Illustration : un an d'une agence qui vit de recommandations (août creux, rentrée forte).
const MONTHS = [
  ["janv.", 3], ["févr.", 5], ["mars", 7], ["avr.", 6], ["mai", 4], ["juin", 6],
  ["juil.", 3], ["août", 1], ["sept.", 7], ["oct.", 8], ["nov.", 5], ["déc.", 2],
] as const;
const LEVELS = 8;
const VALUES: number[] = MONTHS.map(([, v]) => v);
// le pic et le creux racontent le titre : les autres mois passent au second plan
const PEAK = VALUES.indexOf(Math.max(...VALUES));
const TROUGH = VALUES.indexOf(Math.min(...VALUES));

/** Annotation reliée à sa colonne par un trait fin : au-dessus du pic, sous le creux. */
function Note({ children, side }: { children: ReactNode; side: "top" | "bottom" }) {
  return (
    <span
      className={cn(
        "absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5",
        side === "top" ? "bottom-full mb-1.5 flex-col" : "top-full mt-1.5 flex-col-reverse",
      )}
    >
      <span className="text-[0.8rem] leading-none font-semibold whitespace-nowrap text-ink md:text-[0.84rem]">{children}</span>
      <span className="h-3 w-px bg-ink/70" />
    </span>
  );
}

function MonthsChart() {
  return (
    <figure className="@container rounded-3xl border border-line bg-card p-5 shadow-card md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
        <p className="label-mono text-ink-3">Chiffre d'affaires, mois par mois</p>
        <p className="label-mono text-ink-3">Illustration</p>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-x-1 pt-9 pb-9 @md:gap-x-2" aria-hidden>
        {MONTHS.map(([m, v], i) => {
          const story = i === PEAK || i === TROUGH;
          return (
            <div key={m} className="relative flex flex-col items-center gap-2.5">
              {i === PEAK && <Note side="top">Un mois plein</Note>}
              <div className="flex flex-col-reverse gap-[clamp(4px,1.5cqw,8px)]">
                {Array.from({ length: LEVELS }, (_, l) => (
                  <span
                    key={l}
                    className={cn(
                      "block size-[clamp(7px,2.5cqw,13px)] rounded-full",
                      l < v ? (story ? "bg-ink" : "bg-fog") : i === TROUGH ? "border border-ink/30" : "bg-line",
                    )}
                  />
                ))}
              </div>
              {/* graphique étroit : l'initiale, sauf pour les deux mois de l'histoire */}
              <span className={cn("label-mono text-[0.62rem] tracking-[0.02em] whitespace-nowrap @md:text-[0.64rem]", story ? "text-ink" : "text-ink-3")}>
                {story ? (
                  m
                ) : (
                  <>
                    <span className="@md:hidden">{m.charAt(0)}</span>
                    <span className="hidden @md:inline">{m}</span>
                  </>
                )}
              </span>
              {i === TROUGH && <Note side="bottom">Plus rien</Note>}
            </div>
          );
        })}
      </div>
      <figcaption className="mt-4 text-[0.88rem] leading-snug text-ink-3">
        Le profil type d'une agence qui vit de recommandations : un bon mois, puis un trou, sans prévenir.
      </figcaption>
    </figure>
  );
}

const SIGNALS = [
  ["Elle vient de lever des fonds.", "Elle va investir dans sa croissance dans les mois qui viennent."],
  ["Elle recrute un responsable marketing.", "Il devra montrer des résultats dès son premier trimestre."],
  ["Elle a un nouveau dirigeant.", "Il va revoir les prestataires en place."],
  ["Elle refait son site.", "Elle cherche des partenaires pour le faire vivre."],
];

export function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          <BlurFade inView direction="up">
            <Eyebrow step={1}>Le constat</Eyebrow>
            <h2 className="display-section mt-4">
              Un mois plein.
              <br />
              Puis plus rien.
            </h2>
            <p className="lead mt-6 max-w-[31em] text-ink-2">
              Tes meilleurs clients arrivent par recommandation. Mais les recommandations ne préviennent pas quand elles
              s'arrêtent. Et quand la production déborde, plus personne ne prospecte.
            </p>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.1}>
            <MonthsChart />
          </BlurFade>
        </div>

        <div className="mt-20 md:mt-32">
          <BlurFade inView direction="up">
            <Eyebrow>Le signal d'achat</Eyebrow>
            <h3 className="display-sub mt-4 max-w-[22em]">
              Le bon prospect n'est pas celui qui ressemble à ta cible. C'est celui qui a besoin de toi cette semaine.{" "}
              <span className="text-ink-3">Et ça se voit.</span>
            </h3>
          </BlurFade>
          {/* Téléphone : les signaux s'empilent en une seule carte (chaque ligne porte sa part du cadre : rien de vide
              avant l'apparition). Dès 480 px : une carte par signal. Chaque carte occupe deux rangées de la grille
              (sous-grille) : les traits s'alignent d'une carte à l'autre. */}
          <ul className="mt-10 grid min-[480px]:grid-cols-2 min-[480px]:gap-3 md:mt-12 md:gap-4 lg:grid-cols-4">
            {SIGNALS.map(([s, why], i) => (
              <BlurFade
                as="li"
                key={s}
                inView
                direction="up"
                delay={0.06 * i}
                className="row-span-2 grid grid-rows-subgrid gap-y-0 border-x border-b border-line bg-card first:rounded-t-3xl first:border-t last:rounded-b-3xl last:shadow-card min-[480px]:rounded-3xl min-[480px]:border min-[480px]:shadow-card"
              >
                <p className="flex gap-3 px-5 pt-4 pb-1.5 text-[1rem] leading-snug font-semibold tracking-[-0.01em] text-ink min-[480px]:pb-3.5 md:px-6 md:pt-6 md:pb-5 md:text-[1.05rem]">
                  <span className="flex h-[1.375em] w-3.5 shrink-0 items-center justify-center">
                    <SignalSquare />
                  </span>
                  {s}
                </p>
                <p className="flex gap-3 px-5 pb-4 text-[0.94rem] leading-normal text-ink-2 min-[480px]:border-t min-[480px]:border-line min-[480px]:pt-3.5 md:px-6 md:pt-5 md:pb-6 md:text-[0.96rem]">
                  <span className="flex h-[1.5em] w-3.5 shrink-0 items-center justify-center text-ink-3">
                    <Icon.Arrow className="size-3.5" />
                  </span>
                  {why}
                </p>
              </BlurFade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
