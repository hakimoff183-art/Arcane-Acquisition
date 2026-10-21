import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { isInViewport, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/hooks";

// Magic UI — NumberTicker (API de @magicui/number-ticker), sans motion.
// Rendu serveur : la valeur finale. Le compteur ne repart de zéro que s'il est hors écran au chargement.
interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  duration?: number;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration = 1.4,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const armed = useRef(false);
  const from = direction === "down" ? value : startValue;
  const to = direction === "down" ? startValue : value;
  const fmt = (n: number) =>
    Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(
      Number(n.toFixed(decimalPlaces)),
    );

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isInViewport(el)) return;
    armed.current = true;
    el.textContent = fmt(from);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed.current) return;
    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / (duration * 1000));
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = fmt(from + (to - from) * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay * 1000);
      },
      { rootMargin: "0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={cn("inline-block tabular-nums tracking-wider", className)} {...props}>
      {fmt(to)}
    </span>
  );
}
