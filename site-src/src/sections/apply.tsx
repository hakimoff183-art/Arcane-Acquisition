import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { CheckBadge, Eyebrow, Icon } from "@/components/brand";
import { PREVIEW, SITE } from "@/config";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

/** Formulaire Tally : le script n'est chargé qu'à l'approche du formulaire. */
function TallyForm() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const frame = ref.current;
    if (!frame || PREVIEW) return;
    const load = () => {
      // l'iframe reçoit son adresse directement ; le script Tally ne sert qu'à ajuster la hauteur
      frame.src = SITE.tallyEmbed;
      if (window.Tally) return;
      const s = document.createElement("script");
      s.src = "https://tally.so/widgets/embed.js";
      s.onload = () => window.Tally?.loadEmbeds();
      document.body.appendChild(s);
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "900px" },
    );
    io.observe(frame);

    // Demande envoyée : branche ici ton pixel ou tes statistiques.
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data === "string" && e.data.includes("Tally.FormSubmitted")) {
        /* ex : fbq('track', 'Lead');  ou  plausible('Demande Radar'); */
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      io.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, []);

  if (PREVIEW || failed) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-2 bg-paper/60 p-6">
        <p className="text-[0.98rem] text-ink-2">Le formulaire s'ouvre dans un nouvel onglet.</p>
        <a
          href={SITE.tallyLink}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper transition-colors hover:bg-ink/85"
        >
          Ouvrir le formulaire <Icon.Arrow />
        </a>
      </div>
    );
  }

  return (
    <>
      {/* sans JavaScript, l'iframe resterait vide : seul le lien s'affiche */}
      <iframe
        ref={ref}
        data-tally-src={SITE.tallyEmbed}
        loading="lazy"
        width="100%"
        height={560}
        title="Demande de Radar"
        className="hidden w-full border-0 [.js_&]:block"
      />
      <noscript>
        <a href={SITE.tallyLink} className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper">
          Ouvrir le formulaire <Icon.Arrow />
        </a>
      </noscript>
    </>
  );
}

const DEAL = ["Offert, sans carte bancaire", "Aucun appel, aucun engagement", "Tu gardes les 10\u00a0prospects, quoi qu'il arrive"];

/** Notre capacité réelle : cinq carrés identiques, un par Radar. Rien ne suggère des places prises ou restantes. */
function Capacity() {
  return (
    <p className="mt-8 max-w-[36rem] border-t border-line-2 pt-6 text-[0.95rem] leading-relaxed text-ink-2 md:mt-10">
      <strong className="mb-1 flex items-center gap-3 text-[1rem] font-semibold text-ink md:text-[1.02rem]">
        <span aria-hidden className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="size-2 rounded-[2px] bg-ink" />
          ))}
        </span>
        5 Radars par semaine.
      </strong>
      C'est notre vraie capacité de production, pour garder chaque Radar fait main.
    </p>
  );
}

export function Apply() {
  return (
    <section id="formulaire" className="border-t border-line bg-paper-2 py-24 md:py-32">
      <div className="wrap grid gap-12 md:gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <BlurFade inView direction="up" className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow step={7}>Ta demande</Eyebrow>
          <h2 className="display-section mt-4">
            Reçois tes 10&nbsp;prospects sous 72&nbsp;h.
          </h2>
          <p className="lead mt-5 max-w-[30em] text-ink-2 md:mt-6">
            Remplis le formulaire. Si ton agence correspond, ton Radar arrive dans ta boîte mail sous 72&nbsp;h. Sinon, on te le dit franchement.
          </p>
          <ul className="mt-7 grid gap-3 md:mt-8">
            {DEAL.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[1rem] font-medium md:text-[1.02rem]">
                <CheckBadge className="mt-px" />
                <span className="text-balance">{d}</span>
              </li>
            ))}
          </ul>
          <Capacity />
        </BlurFade>

        <BlurFade inView direction="up" delay={0.08}>
          {/* sur téléphone, marges réduites : le formulaire garde toute la largeur possible */}
          <div className="relative rounded-[28px] bg-card px-4 pt-6 pb-4 shadow-float ring-1 ring-line sm:p-8 md:p-10">
            <h3 className="font-display text-[1.45rem] leading-tight font-bold tracking-[-0.025em] md:text-[1.6rem]">Ta demande de Radar</h3>
            <p className="mt-1 mb-5 text-[0.95rem] text-ink-3 md:mt-1.5 md:mb-6">2 minutes. Les réponses servent à construire ton Radar.</p>
            <TallyForm />
            <BorderBeam size={240} duration={14} colorFrom="#FF6600" colorTo="#FFC7A1" borderWidth={1.5} delay={4} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
