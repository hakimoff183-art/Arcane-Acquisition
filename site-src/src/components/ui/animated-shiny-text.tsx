import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Magic UI — AnimatedShinyText (API de @magicui/animated-shiny-text).
interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({ children, className, shimmerWidth = 100, ...props }: AnimatedShinyTextProps) {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "max-w-md text-ink-2/90",
        // shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // shine gradient
        "bg-linear-to-r from-transparent via-ink via-50% to-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
