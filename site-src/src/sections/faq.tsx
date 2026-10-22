import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/brand";

const FAQ = [
  [
    "Pourquoi c'est offert ?",
    "Parce que c'est la preuve la plus honnête qu'on puisse te donner : tu vois tes futurs prospects et tes futurs messages avant de dépenser un euro. Si le Radar te convainc, on te présentera notre accompagnement par email. Sinon, tu gardes tout.",
  ],
  [
    "Est-ce que je vais devoir faire un appel ?",
    "Non. Tu remplis le formulaire, on construit ton Radar et tu le reçois par email. Pas d'appel, pas de démo, pas de relance téléphonique.",
  ],
  [
    "C'est quoi, un signal d'achat ?",
    "Un fait public qui montre qu'une entreprise a besoin d'une agence comme la tienne maintenant : une levée de fonds, un recrutement, un nouveau dirigeant, un nouveau site. On les repère sur LinkedIn, sur les sites d'emploi et sur les sites des entreprises.",
  ],
  ["Vous allez contacter des gens en mon nom ?", "Non. Le Radar est un document. C'est toi qui décides d'envoyer, ou non, les messages, depuis ton propre compte."],
  [
    "Je prospecte déjà. Qu'est-ce que ça change ?",
    "La plupart des messages de prospection partent au hasard. Les nôtres partent d'un fait précis sur l'entreprise. C'est la différence entre « je me permets de vous contacter » et « j'ai vu que vous recrutez votre premier responsable marketing ».",
  ],
];

// « est-ce » reste d'un bloc : pas de coupure après le trait d'union
const keepHyphens = (s: string) =>
  s.split(/(\S+-\S+)/).map((part, i) => (i % 2 ? <span key={i} className="whitespace-nowrap">{part}</span> : part));

export function Faq() {
  return (
    <section id="questions" className="pb-24 md:pb-32">
      <div className="wrap">
        {/* un filet sépare ce chapitre du précédent, posé sur le même fond */}
        <div className="grid gap-12 border-t border-line pt-16 md:gap-14 md:pt-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <BlurFade inView direction="up" className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow step={6}>Questions</Eyebrow>
            <h2 className="display-section mt-4">
              Les questions qu'on nous pose.
            </h2>
          </BlurFade>
          <div className="border-t border-ink">
            {FAQ.map(([q, a], i) => (
              <details key={q} className="group border-b border-line" open={i === 0}>
                <summary className="group/q -mx-3 flex min-h-11 cursor-pointer items-center justify-between gap-5 rounded-xl px-3 py-5 text-[1.06rem] leading-snug font-semibold tracking-[-0.015em] focus-visible:outline-offset-[-2px] md:gap-6 md:py-6 md:text-[1.18rem]">
                  <span className="text-balance">{keepHyphens(q)}</span>
                  <span
                    aria-hidden
                    className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-line-2 transition-colors group-hover/q:border-ink/40 group-open:border-ink group-open:bg-ink"
                  >
                    <span className="absolute h-[2px] w-3 rounded-full bg-ink transition-colors group-open:bg-paper" />
                    <span className="absolute h-3 w-[2px] rounded-full bg-ink transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-[38em] pb-6 text-[1rem] leading-relaxed text-ink-2 md:pr-14 md:pb-7 md:text-[1.04rem]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
