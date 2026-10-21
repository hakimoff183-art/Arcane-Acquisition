import { BlurFade } from "@/components/ui/blur-fade";
import { Icon } from "@/components/brand";

const CRITERIA = [
  ["Métier", "Tu diriges une agence B2B : SEO, web, publicité en ligne, branding, vidéo ou contenu."],
  ["Chiffre d'affaires", "Ton agence fait 10 000 € par mois ou plus. Entre 5 000 et 10 000 €, tu passes sur liste d'attente."],
  ["Clients", "Tes clients sont des entreprises, pas des particuliers."],
  ["Panier", "Un client te rapporte au moins 1 500 € par mois, ou 5 000 € par projet."],
  ["Capacité", "Tu peux accueillir 2 à 4 nouveaux clients dans les 3 prochains mois."],
];

export function Who() {
  return (
    <section id="pour-qui" className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <BlurFade inView direction="up" className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono text-ink-3">Pour qui</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.045em]">
            Offert, mais pas à tout le monde.
          </h2>
          <p className="mt-6 max-w-[28em] text-[1.1rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
            On ne construit un Radar que si on peut t'apporter de vrais clients.
          </p>
        </BlurFade>
        <div>
          <ul className="overflow-hidden rounded-3xl border border-line bg-card">
            {CRITERIA.map(([k, v], i) => (
              <BlurFade as="li" key={k} inView direction="up" delay={0.05 * i} className="border-b border-line last:border-b-0">
                <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 px-6 py-5 md:grid-cols-[28px_150px_minmax(0,1fr)] md:px-7 md:py-6">
                  <span aria-hidden className="mt-0.5 flex size-6 items-center justify-center rounded-md bg-ink text-paper">
                    <Icon.Check />
                  </span>
                  <span className="label-mono col-start-2 pt-1.5 text-ink-3 md:col-start-auto">{k}</span>
                  <p className="col-start-2 text-[1.02rem] leading-relaxed text-ink md:col-start-auto">{v}</p>
                </div>
              </BlurFade>
            ))}
          </ul>
          <p className="mt-6 max-w-[34em] text-[0.96rem] leading-relaxed text-ink-3">
            Pas dans les critères ? On te répond par email, franchement. Un Radar sur un marché trop étroit ne t'apporterait rien.
          </p>
        </div>
      </div>
    </section>
  );
}
