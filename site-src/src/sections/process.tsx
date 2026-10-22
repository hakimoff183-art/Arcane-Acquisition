import { forwardRef, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Eyebrow, Icon, Logo } from "@/components/brand";

const Node = forwardRef<HTMLDivElement, { children: ReactNode; label: string; sub?: string; big?: boolean; accent?: boolean }>(
  ({ children, label, sub, big, accent }, ref) => (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full bg-night-3 text-paper ring-1 ring-night-line",
          big ? "size-20 md:size-24" : "size-12 md:size-14",
          accent && "ring-paper/40",
        )}
      >
        {children}
      </div>
      <p className={cn("max-w-[8.5rem] text-[0.78rem] leading-tight md:text-[0.84rem]", big ? "font-semibold text-paper" : "text-fog")}>
        {label}
        {sub && <span className="block text-fog-2">{sub}</span>}
      </p>
    </div>
  ),
);
Node.displayName = "Node";

function Mechanism() {
  const container = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLDivElement>(null);
  const li = useRef<HTMLDivElement>(null);
  const jobs = useRef<HTMLDivElement>(null);
  const sites = useRef<HTMLDivElement>(null);
  const radar = useRef<HTMLDivElement>(null);
  const inbox = useRef<HTMLDivElement>(null);
  const beam = { containerRef: container, toRef: radar, pathColor: "#F9F6F0", pathOpacity: 0.12, pathWidth: 1.5, gradientStartColor: "#FF6600", gradientStopColor: "#FFB27A" };

  return (
    <figure className="relative overflow-hidden rounded-[28px] bg-night-2 ring-1 ring-night-line">
      <div ref={container} className="relative flex items-center justify-between gap-4 px-4 py-8 sm:px-10 md:py-12">
        <div className="flex flex-col gap-5 md:gap-6">
          <Node ref={form} label="Ton formulaire" accent>
            <Icon.Form />
          </Node>
          <Node ref={li} label="LinkedIn">
            <Icon.Profile />
          </Node>
          <Node ref={jobs} label="Sites d'emploi">
            <Icon.Briefcase />
          </Node>
          <Node ref={sites} label="Sites des entreprises">
            <Icon.Globe />
          </Node>
        </div>
        <Node ref={radar} label="Ton Radar" big>
          <Logo variant="symbolSmallDark" className="size-10 md:size-12" title="" />
        </Node>
        <Node ref={inbox} label="Ta boîte mail" sub="sous 72 h">
          <Icon.Inbox />
        </Node>

        <AnimatedBeam {...beam} fromRef={form} curvature={-40} duration={4.2} />
        <AnimatedBeam {...beam} fromRef={li} curvature={-12} duration={4.8} delay={0.4} />
        <AnimatedBeam {...beam} fromRef={jobs} curvature={12} duration={5.1} delay={0.9} />
        <AnimatedBeam {...beam} fromRef={sites} curvature={40} duration={4.6} delay={1.3} />
        <AnimatedBeam {...beam} fromRef={radar} toRef={inbox} duration={3.6} delay={0.6} gradientStopColor="#FF6600" />
      </div>
      <figcaption className="border-t border-night-line px-6 py-4 text-[0.86rem] text-fog-2 sm:px-10">
        Tu décris ta cible. On croise les signaux publics de ton marché. Tu reçois les fiches.
      </figcaption>
    </figure>
  );
}

const STEPS = [
  { n: "01", stat: 2, unit: "min", title: "Tu remplis le formulaire", text: "Ton agence, ton offre, ton client idéal et ta zone." },
  { n: "02", stat: 10, unit: "prospects", title: "On construit ton Radar", text: "On repère les signaux sur ton marché, on identifie chaque décideur et on écrit les messages." },
  { n: "03", stat: 72, unit: "h", title: "Tu le reçois par email", text: "Tes 10 prospects, leurs messages et la carte de ton marché." },
];

export function Process() {
  return (
    <section id="etapes" className="on-dark bg-night py-24 text-paper md:py-32">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
          <BlurFade inView direction="up">
            <Eyebrow step={4} tone="dark">Comment ça marche</Eyebrow>
            <h2 className="display-section mt-4">
              Trois étapes.
              <br />
              Aucun appel.
            </h2>
            <p className="mt-6 max-w-[28em] text-[1.1rem] leading-relaxed text-fog md:text-[1.2rem]">
              Tu remplis un formulaire. Tu reçois tes prospects. C'est tout.
            </p>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.1}>
            <Mechanism />
          </BlurFade>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-night-line ring-1 ring-night-line md:mt-20 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <BlurFade as="li" key={s.n} inView direction="up" delay={0.08 * i} className="bg-night">
              <div className="flex h-full flex-col gap-4 p-7 md:p-8">
                <span className="label-mono text-fog-2">Étape {s.n}</span>
                <p className="flex items-baseline gap-2 font-display leading-none font-extrabold tracking-[-0.05em]">
                  <NumberTicker value={s.stat} className="text-[clamp(3.4rem,6vw,4.8rem)] tracking-[-0.05em]" delay={0.15 * i} />
                  <span className="text-[1.15rem] font-bold tracking-[-0.02em] text-fog">{s.unit}</span>
                </p>
                <h3 className="mt-2 text-[1.2rem] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="text-[0.98rem] leading-relaxed text-fog">{s.text}</p>
              </div>
            </BlurFade>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-8 border-t border-night-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[32em] text-[1.15rem] leading-snug font-medium tracking-[-0.015em] md:text-[1.3rem]">
            Même si tu ne vas pas plus loin, tu gardes les 10 prospects et les messages. Les conversations qu'ils
            déclenchent sont à toi.
          </p>
          <ShimmerButton
            href="#formulaire"
            background="#F9F6F0"
            shimmerColor="#FF6600"
            shimmerDuration="3.2s"
            className="h-14 shrink-0 gap-2.5 self-start border-ink/10 px-7 text-[1.02rem] font-semibold text-ink md:self-auto"
          >
            Recevoir mon Radar offert <Icon.Arrow />
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
