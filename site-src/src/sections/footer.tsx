import { Icon, Logo } from "@/components/brand";
import { NAV } from "./header";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-night text-paper">
      <div className="wrap grid gap-10 py-14 md:gap-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <Logo variant="horizontalDark" className="h-10 w-auto" title="Arcane Acquisition" />
          <p className="mt-5 max-w-[26em] text-[0.98rem] leading-relaxed text-fog">
            Le Radar des agences B2B qui vivent du <span className="whitespace-nowrap">bouche-à-oreille</span> : les entreprises de ton marché qui ont besoin de toi cette semaine.
          </p>
        </div>
        {/* téléphone : deux colonnes lues de haut en bas, cibles de 44 px ; tablette : une seule ligne ; ordinateur : à droite */}
        <nav
          aria-label="Pied de page"
          className="flex flex-col items-start text-[0.95rem] md:flex-row md:items-center md:justify-between md:gap-8 lg:flex-col lg:items-end lg:justify-start lg:gap-0 lg:pt-2"
        >
          <ul className="grid grid-flow-col grid-cols-[auto_minmax(0,1fr)] grid-rows-2 gap-x-10 md:flex md:flex-wrap md:gap-x-8 md:gap-y-3 lg:justify-end">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="flex min-h-11 items-center rounded-md text-fog transition-colors hover:text-paper md:min-h-0">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#formulaire"
            className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold whitespace-nowrap text-paper transition-colors hover:text-fog md:mt-0 md:min-h-0 lg:mt-4"
          >
            Recevoir mon Radar <Icon.Arrow />
          </a>
        </nav>
      </div>
      <div className="border-t border-night-line">
        {/* ► À COMPLÉTER : raison sociale, identifiant d'entreprise, adresse, hébergeur (page mentions légales) */}
        <div className="wrap flex flex-col gap-1 py-5 text-[0.86rem] text-fog-2 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p>© 2026 Arcane Acquisition</p>
          <p className="flex gap-6">
            <a href="/mentions-legales" className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-paper sm:min-h-0">
              Mentions légales
            </a>
            <a href="/confidentialite" className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-paper sm:min-h-0">
              Confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
