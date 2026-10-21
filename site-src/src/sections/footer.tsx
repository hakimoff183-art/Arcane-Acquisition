import { Logo } from "@/components/brand";
import { NAV } from "./header";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-night text-paper">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:py-20">
        <div>
          <Logo variant="horizontalDark" className="h-10 w-auto" title="Arcane Acquisition" />
          <p className="mt-5 max-w-[26em] text-[0.98rem] leading-relaxed text-fog">
            Le Radar des agences B2B qui vivent du bouche-à-oreille : les entreprises de ton marché qui ont besoin de toi cette semaine.
          </p>
        </div>
        <nav aria-label="Pied de page" className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem] text-fog md:max-w-[28rem] md:justify-end md:pt-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-md transition-colors hover:text-paper">
              {n.label}
            </a>
          ))}
          <a href="#formulaire" className="rounded-md font-semibold text-paper transition-colors hover:text-fog">
            Recevoir mon Radar
          </a>
        </nav>
      </div>
      <div className="border-t border-night-line">
        {/* ► À COMPLÉTER : raison sociale, identifiant d'entreprise, adresse, hébergeur (page mentions légales) */}
        <div className="wrap flex flex-col gap-3 py-6 text-[0.86rem] text-fog-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arcane Acquisition</p>
          <p className="flex gap-6">
            <a href="/mentions-legales" className="rounded-md hover:text-paper">
              Mentions légales
            </a>
            <a href="/confidentialite" className="rounded-md hover:text-paper">
              Confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
