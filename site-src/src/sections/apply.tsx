import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Icon } from "@/components/brand";
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
      const run = () => (window.Tally ? window.Tally.loadEmbeds() : (frame.src = SITE.tallyEmbed));
      if (window.Tally) return run();
      const s = document.createElement("script");
      s.src = "https://tally.so/widgets/embed.js";
      s.onload = run;
      s.onerror = () => {
        frame.src = SITE.tallyEmbed;
        setFailed(false);
      };
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
      <iframe
        ref={ref}
        data-tally-src={SITE.tallyEmbed}
        loading="lazy"
        width="100%"
        height={560}
        title="Demande de Radar"
        className="w-full border-0"
      />
      <noscript>
        <a href={SITE.tallyLink} className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper">
          Ouvrir le formulaire
        </a>
      </noscript>
    </>
  );
}

const DEAL = ["Offert, sans carte bancaire", "Aucun appel, aucun engagement", "Tu gardes les 10 prospects, quoi qu'il arrive"];

export function Apply() {
  return (
    <section id="formulaire" className="border-t border-line bg-paper-2 py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <BlurFade inView direction="up" className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono text-ink-3">Ta demande</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.045em]">
            Reçois tes 10 prospects sous 72&nbsp;h.
          </h2>
          <p className="mt-6 max-w-[30em] text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
            Remplis le formulaire. Si ton agence correspond, ton Radar arrive dans ta boîte mail sous 72 h. Sinon, on te le dit franchement.
          </p>
          <ul className="mt-8 grid gap-3.5">
            {DEAL.map((d) => (
              <li key={d} className="flex items-center gap-3.5 text-[1.02rem] font-medium">
                <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-md bg-ink text-paper">
                  <Icon.Check />
                </span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex items-center gap-5 rounded-2xl border border-line bg-card p-5">
            <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-[1.9rem] font-extrabold tracking-[-0.04em] text-paper">
              5
            </span>
            <p className="text-[0.95rem] leading-snug text-ink-2">
              <strong className="block font-semibold text-ink">5 Radars par semaine.</strong>
              C'est notre vraie capacité de production, pour garder chaque Radar fait main.
            </p>
          </div>
        </BlurFade>

        <BlurFade inView direction="up" delay={0.08}>
          <div className="relative rounded-[28px] bg-card p-6 shadow-[0_40px_80px_-50px_rgb(26_26_26/0.45)] ring-1 ring-line md:p-10">
            <h3 className="font-display text-[1.6rem] leading-tight font-bold tracking-[-0.025em]">Ta demande de Radar</h3>
            <p className="mt-1.5 mb-6 text-[0.95rem] text-ink-3">2 minutes. Les réponses servent à construire ton Radar.</p>
            <TallyForm />
            <BorderBeam size={240} duration={14} colorFrom="#FF6600" colorTo="#FFC7A1" borderWidth={1.5} delay={4} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
