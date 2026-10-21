import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Magic UI — BentoGrid / BentoCard (API de @magicui/bento-grid).
interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  );
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: ReactNode;
  href?: string;
  cta?: string;
  eyebrow?: string;
}

export function BentoCard({ name, className, background, Icon, description, href, cta, eyebrow, ...props }: BentoCardProps) {
  return (
    <div className={cn("group relative flex h-full flex-col justify-between overflow-hidden", className)} {...props}>
      {background && <div className="relative min-h-0 flex-1">{background}</div>}
      <div className="relative z-10 flex flex-col gap-2 p-6 md:p-7">
        {Icon && <Icon className="size-6 text-ink" aria-hidden />}
        {eyebrow && <p className="label-mono text-ink-3">{eyebrow}</p>}
        <h3 className="font-display text-[1.35rem] leading-tight font-bold tracking-[-0.02em] text-ink">{name}</h3>
        <div className="max-w-[34em] text-[0.98rem] leading-relaxed text-ink-2">{description}</div>
        {href && cta && (
          <a href={href} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline">
            {cta} <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
