import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Magic UI — ShimmerButton (même API que @magicui/shimmer-button).
// Ajout : `href` rend un lien <a> avec le même habillage (les CTA de la page sont des ancres).
export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: ReactNode;
  href?: string;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  className,
  children,
  href,
  ...props
}: ShimmerButtonProps) {
  const style = {
    "--spread": "90deg",
    "--shimmer-color": shimmerColor,
    "--radius": borderRadius,
    "--speed": shimmerDuration,
    "--cut": shimmerSize,
    "--bg": background,
  } as CSSProperties;

  const classes = cn(
    "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
    "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
    className,
  );

  const inner = (
    <>
      {/* spark container */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
        {/* spark */}
        <span className="absolute inset-0 aspect-square h-[100cqh] animate-shimmer-slide [border-radius:0] [mask:none]">
          {/* spark before */}
          <span className="absolute -inset-full w-auto rotate-0 animate-spin-around [translate:0_0] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </span>
      </span>
      <span className="relative flex items-center gap-[inherit]">{children}</span>
      {/* highlight */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 size-full [border-radius:var(--radius)]",
          "shadow-[inset_0_-8px_10px_#ffffff1f]",
          "transform-gpu transition-all duration-300 ease-in-out",
          "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
        )}
      />
      {/* backdrop */}
      <span aria-hidden className="pointer-events-none absolute -z-20 [border-radius:var(--radius)] [background:var(--bg)] [inset:var(--cut)]" />
    </>
  );

  if (href) {
    return (
      <a href={href} style={style} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button style={style} className={classes} {...props}>
      {inner}
    </button>
  );
}
