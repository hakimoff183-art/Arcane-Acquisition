import { Marquee } from "@/components/ui/marquee";
import { SignalSquare } from "@/components/brand";

const SIGNALS = [
  "Vient de lever des fonds",
  "Recrute un responsable marketing",
  "Nouveau directeur général",
  "Refait son site",
  "Recrute son premier responsable acquisition",
  "Recrute un commercial",
  "Nouvelle direction marketing",
  "Lance un nouveau site",
];

export function SignalsRail() {
  return (
    <section aria-label="Les signaux d'achat qu'on repère" className="border-y border-line bg-paper-2">
      {/* sur téléphone, le titre passe au-dessus et la bande court d'un bord à l'autre de l'écran */}
      <div className="wrap flex flex-col gap-2.5 py-4 md:flex-row md:items-center md:gap-6">
        <p className="label-mono shrink-0 text-ink-3">Ce qu'on repère</p>
        <div className="relative -mx-4 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:mx-0">
          <Marquee pauseOnHover repeat={3} className="p-0 py-1 [--duration:52s] [--gap:0.75rem]">
            {SIGNALS.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-2 text-[0.9rem] font-medium whitespace-nowrap text-ink"
              >
                <SignalSquare />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
