import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Magic UI — MagicCard (API de @magicui/magic-card) : halo qui suit le pointeur et bordure dégradée.
// Les positions passent par des variables CSS (aucun re-rendu React).
interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  borderColor?: string;
  background?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
  borderColor = "var(--color-line)",
  background = "var(--color-card)",
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  const leave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", `${-gradientSize}px`);
    el.style.setProperty("--my", `${-gradientSize}px`);
  }, [gradientSize]);

  const style = {
    "--mx": `${-gradientSize}px`,
    "--my": `${-gradientSize}px`,
    "--gs": `${gradientSize}px`,
  } as CSSProperties;

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} style={style} className={cn("group relative isolate rounded-[inherit]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-[background] duration-300"
        style={{
          background: `radial-gradient(var(--gs) circle at var(--mx) var(--my), ${gradientFrom}, ${gradientTo}, ${borderColor} 100%)`,
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-px -z-10 rounded-[inherit]" style={{ background }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-[var(--go)]"
        style={
          {
            background: `radial-gradient(var(--gs) circle at var(--mx) var(--my), ${gradientColor}, transparent 100%)`,
            "--go": gradientOpacity,
          } as CSSProperties
        }
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
