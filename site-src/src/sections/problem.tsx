import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow, SignalSquare } from "@/components/brand";

// Illustration : un an d'une agence qui vit de recommandations (août creux, rentrée forte).
const MONTHS = [
  ["janv.", 3], ["févr.", 5], ["mars", 7], ["avr.", 6], ["mai", 4], ["juin", 6],
  ["juil.", 3], ["août", 1], ["sept.", 7], ["oct.", 8], ["nov.", 5], ["déc.", 2],
] as const;
const LEVELS = 8;

function MonthsChart() {
  return (
    <figure className="rounded-3xl border border-line bg-card p-5 md:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-mono text-ink-3">Chiffre d'affaires, mois par mois</p>
        <p className="label-mono text-ink-3">Illustration</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-1 md:gap-2" aria-hidden>
        {MONTHS.map(([m, v]) => (
          <div key={m} className="flex flex-col items-center gap-3">
            <div className="flex flex-col-reverse gap-[clamp(4px,0.9vw,8px)]">
              {Array.from({ length: LEVELS }, (_, i) => (
                <span
                  key={i}
                  className={
                    i < v
                      ? "block size-[clamp(7px,1.25vw,13px)] rounded-full bg-ink"
                      : "block size-[clamp(7px,1.25vw,13px)] rounded-full bg-line"
                  }
                />
              ))}
            </div>
            <span className="label-mono text-[0.62rem] tracking-[0.02em] text-ink-3 md:text-[0.64rem]">
              <span className="md:hidden">{m.charAt(0)}</span>
              <span className="hidden md:inline">{m}</span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 text-[0.88rem] leading-snug text-ink-3">
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
            <p className="mt-6 max-w-[31em] text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
              Tes meilleurs clients arrivent par recommandation. Mais les recommandations ne préviennent pas quand elles
              s'arrêtent. Et quand la production déborde, plus personne ne prospecte.
            </p>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.1}>
            <MonthsChart />
          </BlurFade>
        </div>

        <div className="mt-24 md:mt-32">
          <BlurFade inView direction="up">
            <Eyebrow>Le signal d'achat</Eyebrow>
            <h3 className="display-sub mt-4 max-w-[22em]">
              Le bon prospect n'est pas celui qui ressemble à ta cible. C'est celui qui a besoin de toi cette semaine.{" "}
              <span className="text-ink-3">Et ça se voit.</span>
            </h3>
          </BlurFade>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNALS.map(([s, why], i) => (
              <BlurFade as="li" key={s} inView direction="up" delay={0.06 * i} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-2">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-ink-3">Signal {String(i + 1).padStart(2, "0")}</span>
                    <SignalSquare className="size-2.5" />
                  </div>
                  <p className="text-[1.08rem] leading-snug font-semibold tracking-[-0.015em] text-ink">{s}</p>
                  <p className="mt-auto text-[0.96rem] leading-relaxed text-ink-2">
                    <span aria-hidden className="text-ink-3">→ </span>
                    {why}
                  </p>
                </div>
              </BlurFade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
