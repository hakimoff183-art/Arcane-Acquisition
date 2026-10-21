import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isInViewport, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/hooks";

// Magic UI — BlurFade (même API que @magicui/blur-fade), réécrit sans la librairie motion.
// Rendu serveur visible : le contenu n'est masqué que par le JavaScript, et seulement s'il est hors écran.
interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
  as?: "div" | "li" | "span";
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  as: Tag = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"load" | "idle" | "armed" | "shown">(inView ? "idle" : "load");

  useIsoLayoutEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el || prefersReducedMotion() || isInViewport(el)) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: inViewMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, inViewMargin]);

  const horizontal = direction === "left" || direction === "right";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  const style = {
    "--bf-x": horizontal ? `${sign * offset}px` : "0px",
    "--bf-y": horizontal ? "0px" : `${sign * offset}px`,
    "--bf-blur": blur,
    "--bf-dur": `${duration}s`,
    "--bf-delay": `${0.04 + delay}s`,
  } as CSSProperties;

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} data-blur-fade={state} style={style} className={cn(className)}>
      {children}
    </Tag>
  );
}
