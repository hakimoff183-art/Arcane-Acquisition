import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks";
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Icon, Logo, SignalSquare } from "@/components/brand";

/* ------------------------------------------------------------------ données de l'exemple (fictif) */
const PROSPECTS = [
  { co: "Éditeur de logiciel RH", where: "Lyon · 40 salariés", signal: "Recrute son premier responsable acquisition", ago: "il y a 5 j" },
  { co: "Startup logistique", where: "Lyon · 25 salariés", signal: "Vient de lever 3 millions d'euros", ago: "il y a 9 j" },
  { co: "Cabinet d'expertise comptable", where: "Villeurbanne", signal: "Nouveau directeur général", ago: "il y a 12 j" },
  { co: "Fabricant de mobilier de bureau", where: "Annecy", signal: "Annonce la refonte de son site", ago: "il y a 3 j" },
];

// Grille du marché : 20 colonnes x 8 lignes. Les 4 premières positions correspondent aux 4 fiches.
const COLS = 20;
const ROWS = 8;
const SIGNALS = [
  [4, 2], [13, 1], [8, 5], [17, 6], // fiches affichées
  [2, 6], [11, 3], [16, 0], [6, 0], [19, 3], [14, 7], // « et 6 autres »
];
const SIGNAL_INDEX = new Map(SIGNALS.map(([c, r], i) => [r * COLS + c, i]));

function MarketGrid({ lit }: { lit: number }) {
  return (
    <div
      className="grid gap-y-[clamp(6px,1.1vw,10px)]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` } as CSSProperties}
      aria-hidden
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const s = SIGNAL_INDEX.get(i);
        const on = s !== undefined && s < lit;
        return (
          <div key={i} className="relative flex aspect-square items-center justify-center">
            <span
              data-cell=""
              data-lit={on ? "" : undefined}
              className={cn(
                "relative block",
                on ? "size-[62%] rounded-[22%] bg-signal" : "size-[26%] rounded-full bg-line-2",
              )}
            >
              {on && s! < 4 && <span data-ping="" className="absolute inset-0 rounded-[inherit] bg-signal" />}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProspectRow({ p }: { p: (typeof PROSPECTS)[number] }) {
  return (
    <div className="pb-2.5">
      <div className="rounded-2xl border border-line bg-card px-4 py-3.5 shadow-[0_1px_0_rgb(26_26_26/0.03),0_8px_20px_-14px_rgb(26_26_26/0.25)] md:px-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="min-w-0 font-semibold tracking-[-0.01em] text-ink">{p.co}</p>
          <time className="shrink-0 text-[0.8rem] whitespace-nowrap text-ink-3 tabular-nums">{p.ago}</time>
        </div>
        <p className="text-[0.86rem] text-ink-3">{p.where}</p>
        <p className="mt-2 flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink">
          <SignalSquare className="mt-[0.42em]" />
          <span>{p.signal}</span>
        </p>
      </div>
    </div>
  );
}

function RadarDemo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [start, setStart] = useState(false);
  const [ready, setReady] = useState(false);
  const [lit, setLit] = useState(SIGNALS.length); // rendu statique : tout est visible

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStart(true), 500);
    return () => clearTimeout(t);
  }, [inView]);

  const onIndex = useCallback((i: number) => {
    setReady(true);
    if (i >= PROSPECTS.length - 1 && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(SIGNALS.length);
      return;
    }
    setLit(i + 1);
  }, []);

  // une fois les 4 fiches affichées, les 6 autres signaux s'allument
  useEffect(() => {
    if (!ready || lit < PROSPECTS.length || lit >= SIGNALS.length) return;
    const t = setTimeout(() => setLit((n) => n + 1), lit === PROSPECTS.length ? 900 : 160);
    return () => clearTimeout(t);
  }, [ready, lit]);

  const shownLit = ready ? lit : SIGNALS.length;

  return (
    <figure className={cn("relative", className)}>
      {/* halo chaud derrière la carte */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_50%_40%,rgb(255_102_0/0.10),transparent_70%)]" />
      <div
        ref={ref}
        data-radar=""
        data-ready={ready ? "" : undefined}
        className="relative overflow-hidden rounded-[24px] bg-card shadow-[0_1px_0_rgb(26_26_26/0.04),0_30px_60px_-30px_rgb(26_26_26/0.35),0_80px_140px_-70px_rgb(26_26_26/0.25)] ring-1 ring-line"
      >
        {/* barre du haut */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <Logo variant="symbolSmallLight" className="size-6 shrink-0" title="" />
            <p className="min-w-0 truncate text-[0.95rem]">
              <strong className="font-semibold">Radar</strong>
              <span className="text-ink-3"> · Agence SEO, région lyonnaise</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="label-mono text-ink-3">Livré le 17 oct.</span>
            <span className="label-mono rounded-full border border-line-2 px-2.5 py-1 text-ink-2">Exemple fictif</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]">
          {/* le marché */}
          <div className="flex flex-col gap-5 px-5 py-6 md:px-7 md:py-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="label-mono text-ink-3">Carte de ton marché</p>
                <p className="mt-1.5 font-display text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">
                  1 240 entreprises dans ta cible
                </p>
              </div>
              <p className="shrink-0 text-right" aria-live="off">
                <span data-count="" className="font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums">{shownLit}</span>
                <span className="block text-[0.8rem] text-ink-3">en signal</span>
              </p>
            </div>
            <MarketGrid lit={shownLit} />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.84rem] text-ink-3">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-line-2 ring-2 ring-line-2" /> une entreprise de ta cible
              </span>
              <span className="inline-flex items-center gap-2">
                <SignalSquare /> un signal d'achat repéré
              </span>
            </div>
            <dl className="mt-auto grid grid-cols-3 overflow-hidden rounded-2xl border border-line">
              {[
                ["10", "décideurs identifiés"],
                ["20", "messages prêts à envoyer"],
                ["1", "diagnostic de ton acquisition"],
              ].map(([n, l]) => (
                <div key={l} className="flex flex-col gap-1 border-l border-line px-3 py-3.5 first:border-l-0 md:px-4">
                  <dt className="order-2 text-[0.78rem] leading-snug text-ink-3 md:text-[0.82rem]">{l}</dt>
                  <dd className="order-1 font-display text-[1.5rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums">{n}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* les signaux */}
          <div className="flex flex-col border-t border-line bg-paper/60 px-5 py-6 md:px-7 md:py-7 lg:border-t-0 lg:border-l">
            <p className="label-mono text-ink-3">Signaux détectés</p>
            <div className="mt-4 min-h-[452px] md:min-h-[440px]">
              <AnimatedList delay={1500} start={start} onIndexChange={onIndex}>
                {PROSPECTS.map((p) => (
                  <ProspectRow key={p.co} p={p} />
                ))}
              </AnimatedList>
            </div>
            <p className="mt-auto pt-2 text-[0.9rem] text-ink-2">
              Et 6 autres, chacun avec son décideur et ses deux messages prêts à envoyer.
            </p>
          </div>
        </div>
        <BorderBeam size={280} duration={11} colorFrom="#FF6600" colorTo="#FFC7A1" borderWidth={1.5} />
      </div>
      <figcaption className="mt-4 text-center text-[0.86rem] text-ink-3">
        Exemple fictif. Ton Radar porte sur ton propre marché.
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <DotPattern
        width={22}
        height={22}
        cx={1.2}
        cy={1.2}
        cr={1.2}
        className="-z-10 fill-ink/[0.14] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_75%)]"
      />
      <div className="wrap pt-8 pb-20 md:pt-14 md:pb-28 lg:pt-16">
        <p className="rise inline-flex max-w-full items-start gap-2.5 rounded-[18px] border border-line-2 bg-card/80 py-1.5 pr-4 pl-3 text-[0.88rem] leading-snug font-medium backdrop-blur-sm">
          <SignalSquare className="mt-[0.42em]" />
          <AnimatedShinyText>
            Pour les agences B2B qui vivent du <span className="whitespace-nowrap">bouche-à-oreille</span>
          </AnimatedShinyText>
        </p>

        <h1
          className="rise mt-6 font-display text-[clamp(2.75rem,8.2vw,7.1rem)] leading-[0.93] font-extrabold tracking-[-0.052em] text-ink md:mt-8"
          style={{ "--d": "0.08s" } as CSSProperties}
        >
          10 prospects chauds.
          <br />
          Livrés en 72&nbsp;h.
        </h1>

        <div
          className="rise mt-7 grid gap-7 md:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16"
          style={{ "--d": "0.18s" } as CSSProperties}
        >
          <p className="max-w-[34em] text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.25rem]">
            Les entreprises de ton marché qui recrutent, lèvent des fonds ou changent de dirigeant en ce moment. Pour
            chacune, le décideur et le message prêt à envoyer. <strong className="font-semibold text-ink">Offert.</strong>
          </p>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <ShimmerButton
              href="#formulaire"
              background="#1A1A1A"
              shimmerColor="#FF8A3D"
              shimmerDuration="3.2s"
              className="h-14 gap-2.5 px-7 text-[1.02rem] font-semibold text-paper"
            >
              Recevoir mon Radar offert <Icon.Arrow />
            </ShimmerButton>
            <p className="text-[0.9rem] text-ink-3">Un formulaire de 2 minutes. Aucun appel, aucune carte bancaire.</p>
          </div>
        </div>

        <div className="rise" style={{ "--d": "0.3s" } as CSSProperties}>
          <RadarDemo className="mt-14 md:mt-20" />
        </div>
      </div>
    </section>
  );
}
