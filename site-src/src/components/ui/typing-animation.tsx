import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { isInViewport, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/hooks";

// Magic UI — TypingAnimation (API de @magicui/typing-animation).
// La place du texte complet est réservée dès le départ : la carte ne change pas de taille pendant la frappe.
interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: "p" | "div" | "span" | "blockquote";
  startOnView?: boolean;
}

export function TypingAnimation({ children, className, duration = 100, delay = 0, as: Tag = "div", startOnView = false }: TypingAnimationProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(children.length);
  const [typing, setTyping] = useState(false);
  const armed = useRef(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (startOnView && isInViewport(el)) return;
    armed.current = true;
    setShown(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed.current) return;
    let timer = 0;
    let interval = 0;
    const begin = () => {
      timer = window.setTimeout(() => {
        setTyping(true);
        let i = 0;
        interval = window.setInterval(() => {
          i += 1;
          setShown(i);
          if (i >= children.length) {
            clearInterval(interval);
            setTimeout(() => setTyping(false), 1600);
          }
        }, duration);
      }, delay);
    };
    if (!startOnView) {
      begin();
      return () => (clearTimeout(timer), clearInterval(interval));
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          begin();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => (io.disconnect(), clearTimeout(timer), clearInterval(interval));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={cn("relative grid", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">{children}</span>
      <span aria-hidden className="col-start-1 row-start-1">
        {children.slice(0, shown)}
        {typing && <span className="caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-ink" />}
      </span>
    </Tag>
  );
}
