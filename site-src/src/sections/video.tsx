import { BlurFade } from "@/components/ui/blur-fade";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Eyebrow, Icon, Logo } from "@/components/brand";
import { PREVIEW, SITE } from "@/config";

// Ce que montre la vidéo : seulement ce qu'on sait qu'elle contient.
const INSIDE = [
  { icon: Icon.Map, text: "Comment on repère les signaux d'achat sur ton marché" },
  { icon: Icon.Inbox, text: "Ce que contient ton Radar" },
];

// Vignette 4:3 (le format de la vidéo), dessinée sur une grille 400 x 300 :
// le marché en points, les cercles du Radar autour du bouton lecture, un seul carré repéré.
const PITCH = 25;
const COLS = 16;
const ROWS = 12;
const SQUARE = { x: 287.5, y: 87.5 };
const RINGS = [53.75, 107.5, 161.25];

function Thumbnail() {
  return (
    // tailles relatives à la vignette elle-même (cqw) : mêmes proportions sur téléphone, tablette et grand écran
    <span className="@container relative block aspect-[4/3] w-full overflow-hidden bg-night">
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_50%,var(--color-night-2),var(--color-night))]" />
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="absolute inset-0 size-full [mask-image:radial-gradient(62%_66%_at_50%_50%,#000_45%,transparent)]"
      >
        <g className="fill-paper/25">
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const x = PITCH / 2 + (i % COLS) * PITCH;
            const y = PITCH / 2 + Math.floor(i / COLS) * PITCH;
            return x === SQUARE.x && y === SQUARE.y ? null : <circle key={i} cx={x} cy={y} r={1.35} />;
          })}
        </g>
        <g fill="none" className="stroke-paper/15" strokeWidth={1}>
          {RINGS.map((r) => (
            <circle key={r} cx={200} cy={150} r={r} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      {/* le carré du logo : l'entreprise qui montre un signal */}
      <svg aria-hidden viewBox="0 0 400 300" className="absolute inset-0 size-full">
        <rect x={SQUARE.x - 6.5} y={SQUARE.y - 6.5} width={13} height={13} rx={2.6} className="fill-signal" />
      </svg>
      <span className="absolute top-[clamp(1rem,4.5cqw,2rem)] left-[clamp(1rem,4.5cqw,2rem)]">
        <Logo variant="horizontalDark" className="h-[clamp(1.6rem,5.4cqw,2.25rem)] w-auto" title="" />
      </span>
      <span className="label-mono absolute top-[clamp(1rem,4.5cqw,2rem)] right-[clamp(1rem,4.5cqw,2rem)] rounded-full bg-paper/10 px-3 py-1.5 text-paper ring-1 ring-paper/20">
        3 min
      </span>
      <span className="font-display absolute bottom-[clamp(1rem,4.5cqw,2rem)] left-[clamp(1rem,4.5cqw,2rem)] text-[clamp(1.15rem,4.6cqw,1.9rem)] leading-tight font-bold tracking-[-0.03em] text-paper">
        Le Radar, de l'intérieur
      </span>
    </span>
  );
}

export function Video() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="wrap">
        {/* un trait et de l'air : un nouveau chapitre commence */}
        <div className="grid gap-10 border-t border-line pt-24 md:gap-12 md:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          {/* tablette : la liste à côté du titre, la vignette en dessous ; grand écran : tout le texte à gauche */}
          <BlurFade inView direction="up" className="md:grid md:grid-cols-2 md:items-end md:gap-10 lg:block">
            <div>
              <Eyebrow step={2}>La vidéo</Eyebrow>
              <h2 className="display-section mt-4">Un Radar, expliqué en 3&nbsp;minutes.</h2>
              <p className="lead mt-6 max-w-[34em] text-ink-2">Comment on repère les signaux, et ce que tu reçois.</p>
            </div>
            <div className="mt-7 md:mt-0 lg:mt-10">
              <p className="label-mono text-ink-3">Dans la vidéo</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {INSIDE.map(({ icon: Glyph, text }) => (
                  <li key={text} className="flex items-center gap-4 py-3 md:py-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink md:size-10">
                      <Glyph />
                    </span>
                    <span className="text-[1rem] leading-snug text-ink md:text-[1.04rem]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade inView direction="up" delay={0.08}>
            <HeroVideoDialog
              className="rounded-3xl shadow-float md:rounded-[28px]"
              videoSrc={SITE.videoEmbed}
              thumbnail={<Thumbnail />}
              label="Lancer la vidéo de présentation (3 minutes)"
              embedAllowed={!PREVIEW}
              fallbackHref={SITE.videoLink}
            />
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
