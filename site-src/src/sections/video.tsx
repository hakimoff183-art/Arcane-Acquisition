import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Eyebrow, Logo } from "@/components/brand";
import { PREVIEW, SITE } from "@/config";

function Thumbnail() {
  return (
    <span className="relative block aspect-[16/10] w-full overflow-hidden bg-night sm:aspect-video">
      <DotPattern width={28} height={28} cx={1.5} cy={1.5} cr={1.5} className="fill-paper/[0.13]" />
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,transparent,rgb(26_26_26/0.65))]" />
      {/* le motif du logo en grand : une grille, un seul carré */}
      <span aria-hidden className="absolute top-1/2 right-[7%] grid w-[34%] -translate-y-1/2 grid-cols-6 gap-[2.4%] opacity-90">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="flex aspect-square items-center justify-center">
            <span className={i === 10 ? "block size-[78%] rounded-[20%] bg-signal" : "block size-[26%] rounded-full bg-paper/25"} />
          </span>
        ))}
      </span>
      <span className="absolute top-5 left-5 md:top-8 md:left-8">
        <Logo variant="horizontalDark" className="h-7 w-auto md:h-9" title="" />
      </span>
      <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 md:right-8 md:bottom-8 md:left-8">
        <span className="font-display text-[clamp(1.25rem,3vw,2.2rem)] leading-tight font-bold tracking-[-0.03em] text-paper">
          Le Radar, de l'intérieur
        </span>
        <span className="label-mono shrink-0 rounded-full bg-paper/10 px-3 py-1.5 text-paper ring-1 ring-paper/20">3 min</span>
      </span>
    </span>
  );
}

export function Video() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="wrap">
        <BlurFade inView direction="up" className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div>
            <Eyebrow step={2}>La vidéo</Eyebrow>
            <h2 className="display-section mt-4">
              Un Radar, expliqué en 3&nbsp;minutes.
            </h2>
          </div>
          <p className="text-[1rem] text-ink-3">Comment on repère les signaux, et ce que tu reçois.</p>
        </BlurFade>
        <BlurFade inView direction="up" delay={0.08}>
          <HeroVideoDialog
            className="overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgb(26_26_26/0.5)] ring-1 ring-ink/10"
            videoSrc={SITE.videoEmbed}
            thumbnail={<Thumbnail />}
            label="Lancer la vidéo de présentation (3 minutes)"
            embedAllowed={!PREVIEW}
            fallbackHref={SITE.videoLink}
          />
        </BlurFade>
      </div>
    </section>
  );
}
