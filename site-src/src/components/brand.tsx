import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Les tracés du logo sont posés une seule fois dans la page (sprite SVG ajouté au build, voir server.tsx).
const VIEWBOX = {
  horizontalLight: "0 0 711.76 174",
  horizontalDark: "0 0 711.76 174",
  symbolLight: "0 0 256 256",
  symbolDark: "0 0 256 256",
  symbolSmallLight: "0 0 256 256",
  symbolSmallDark: "0 0 256 256",
} as const;
type Variant = keyof typeof VIEWBOX;

/** Logo vectoriel issu du kit (tracés, aucune police à charger). title vide = décoratif. */
export function Logo({ variant = "horizontalLight", className, title = "Arcane Acquisition" }: { variant?: Variant; className?: string; title?: string }) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  return (
    <svg viewBox={VIEWBOX[variant]} className={cn("block", className)} {...a11y}>
      <use href={`#logo-${variant}`} />
    </svg>
  );
}

/** Le motif de la marque : une grille de points et un seul carré. */
export function SignalSquare({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 shrink-0 rounded-[2px] bg-signal", className)} />;
}

/** Nombre de sections numérotées dans la page (voir Eyebrow). */
export const SECTION_COUNT = 7;

/**
 * Petit titre au-dessus d'un titre de section. Avec `step`, une rangée de points le précède :
 * le carré indique où on en est dans la page (la grille du logo, sans l'orange réservé au signal).
 */
export function Eyebrow({
  children,
  step,
  tone = "light",
  className,
}: {
  children: ReactNode;
  step?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("label-mono flex items-center gap-3", tone === "dark" ? "text-fog-2" : "text-ink-3", className)}>
      {step !== undefined && (
        <span aria-hidden className="flex items-center gap-[3px]">
          {Array.from({ length: SECTION_COUNT }, (_, i) =>
            i === step - 1 ? (
              <span key={i} className={cn("size-[7px] rounded-[1.5px]", tone === "dark" ? "bg-paper" : "bg-ink")} />
            ) : (
              <span key={i} className="size-[3px] rounded-full bg-current opacity-60" />
            ),
          )}
        </span>
      )}
      <span>{children}</span>
    </p>
  );
}

/** Coche ronde et légère : le carré plein reste la signature du logo. */
export function CheckBadge({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full",
        tone === "dark" ? "bg-paper/10 text-paper ring-1 ring-paper/20" : "bg-ink/[0.06] text-ink ring-1 ring-ink/10",
        className,
      )}
    >
      <Icon.Check className="size-3" />
    </span>
  );
}

type IconProps = { className?: string };
const base = "size-5 shrink-0";
const svgProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Icon = {
  Form: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <path d="M9 3.5h6v2.5H9zM8.5 10.5h7M8.5 14h7M8.5 17.5h4" />
    </svg>
  ),
  Profile: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.8 16.5c.6-1.6 1.8-2.5 3.2-2.5s2.6.9 3.2 2.5M14.5 10h3.5M14.5 13.5h3.5" />
    </svg>
  ),
  Briefcase: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
    </svg>
  ),
  Globe: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" />
    </svg>
  ),
  Inbox: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <path d="M3.5 13.5 6 5.8A2 2 0 0 1 7.9 4.5h8.2A2 2 0 0 1 18 5.8l2.5 7.7V18a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-4.5Z" />
      <path d="M3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" />
    </svg>
  ),
  Map: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <path d="m9 4.5-5 2v13l5-2 6 2 5-2v-13l-5 2-6-2ZM9 4.5v13M15 6.5v13" />
    </svg>
  ),
  Doc: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8L14 3.5Z" />
      <path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
    </svg>
  ),
  Message: ({ className }: IconProps) => (
    <svg {...svgProps} className={cn(base, className)}>
      <path d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5v-3.5H6a2 2 0 0 1-2-2v-8Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  ),
  Arrow: ({ className }: IconProps) => (
    <svg {...svgProps} strokeWidth={2} className={cn("size-4 shrink-0", className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Check: ({ className }: IconProps) => (
    <svg {...svgProps} strokeWidth={2.4} className={cn("size-3.5 shrink-0", className)}>
      <path d="m5.5 12.5 4 4 9-9.5" />
    </svg>
  ),
  Play: ({ className }: IconProps) => (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-3 shrink-0 fill-current", className)}>
      <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
    </svg>
  ),
};
