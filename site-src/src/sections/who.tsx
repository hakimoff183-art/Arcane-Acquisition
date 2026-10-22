import { BlurFade } from "@/components/ui/blur-fade";
import { CheckBadge, Eyebrow } from "@/components/brand";

const CRITERIA = [
  ["Métier", "Tu diriges une agence B2B : SEO, web, publicité en ligne, branding, vidéo ou contenu."],
  ["Chiffre d'affaires", "Ton agence fait 10 000 € par mois ou plus. Entre 5 000 et 10 000 €, tu passes sur liste d'attente."],
  ["Clients", "Tes clients sont des entreprises, pas des particuliers."],
  ["Panier", "Un client te rapporte au moins 1 500 € par mois, ou 5 000 € par projet."],
  ["Capacité", "Tu peux accueillir 2 à 4 nouveaux clients dans les 3 prochains mois."],
];

// espaces insécables : « 10 000 € », « 2 à 4 » ou « 3 prochains mois » ne se coupent jamais en fin de ligne
const keepNumbers = (s: string) => s.replace(/(\d) à (\d)/g, "$1 à\u00a0$2").replace(/(\d) /g, "$1\u00a0");

export function Who() {
  return (
    <section id="pour-qui" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="wrap grid gap-12 md:gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <BlurFade inView direction="up" className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow step={5}>Pour qui</Eyebrow>
          <h2 className="display-section mt-4">
            Offert, mais pas à tout le monde.
          </h2>
          <p className="lead mt-6 max-w-[28em] text-ink-2">
            On ne construit un Radar que si on peut t'apporter de vrais clients.
          </p>
        </BlurFade>
        <div>
          {/* La carte décide de sa mise en page (requête de conteneur) : intitulé au-dessus du texte quand
              elle est étroite, en colonne quand elle a la place. */}
          <ul className="@container overflow-hidden rounded-3xl border border-line bg-card">
            {CRITERIA.map(([k, v], i) => (
              <BlurFade as="li" key={k} inView direction="up" delay={0.05 * i} className="border-b border-line last:border-b-0">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2.5 px-6 py-4 @min-[35rem]:grid-cols-[auto_9.75rem_minmax(0,1fr)] @min-[35rem]:items-baseline @min-[35rem]:gap-x-3 @min-[35rem]:px-7 @min-[35rem]:py-5">
                  <CheckBadge className="size-5 @min-[35rem]:mt-[5px] @min-[35rem]:self-start" />
                  <span className="label-mono text-ink-3">{k}</span>
                  <p className="col-span-2 mt-2 text-[1rem] leading-relaxed text-ink @min-[35rem]:col-span-1 @min-[35rem]:mt-0 md:text-[1.02rem]">
                    {keepNumbers(v)}
                  </p>
                </div>
              </BlurFade>
            ))}
          </ul>
          <p className="mt-5 max-w-[34em] text-[0.96rem] leading-relaxed text-ink-3 md:mt-6">
            Pas dans les critères ? On te répond par email, franchement. Un Radar sur un marché trop étroit ne t'apporterait rien.
          </p>
        </div>
      </div>
    </section>
  );
}
