import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand";

const NAV = [
  { href: "#radar", label: "Le Radar" },
  { href: "#etapes", label: "Comment ça marche" },
  { href: "#pour-qui", label: "Pour qui" },
  { href: "#questions", label: "Questions" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-[env(safe-area-inset-top,0px)] z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-line bg-paper/85 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-paper/0",
      )}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <a href="#top" className="shrink-0 rounded-md" aria-label="Arcane Acquisition, retour en haut">
          <Logo className="h-9 w-auto" title="Arcane Acquisition" />
        </a>
        <nav aria-label="Sections de la page" className="hidden items-center gap-8 text-[0.92rem] font-medium text-ink-2 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-md transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#formulaire"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-4 text-[0.88rem] font-semibold whitespace-nowrap text-paper transition-colors hover:bg-ink/85"
        >
          <span className="hidden min-[375px]:inline">Recevoir mon Radar</span>
          <span className="min-[375px]:hidden">Mon Radar</span>
        </a>
      </div>
    </header>
  );
}

export { NAV };
