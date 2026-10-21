import React, { useEffect, useMemo, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/hooks";

// Magic UI — AnimatedList (API de @magicui/animated-list), réécrit sans motion.
// Ajouts : `start` (démarre quand on le décide), `onIndexChange` (pour synchroniser un autre visuel).
// Rendu serveur : toute la liste, pour que la page reste lisible sans JavaScript.

export function AnimatedListItem({ children, entering }: { children: ReactNode; entering?: boolean }) {
  return (
    <div data-list-item={entering ? "enter" : "static"} className="mx-auto w-full">
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  delay?: number;
  start?: boolean;
  onIndexChange?: (index: number) => void;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, start = true, onIndexChange, ...props }: AnimatedListProps) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
    // -1 = rendu statique (serveur, mouvement réduit) : tout est visible.
    const [index, setIndex] = useState(-1);
    const [ready, setReady] = useState(false);

    useEffect(() => {
      if (prefersReducedMotion()) {
        setReady(true);
        onIndexChange?.(childrenArray.length - 1);
        return;
      }
      if (!start) return;
      setReady(true);
      setIndex(0);
    }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      if (index < 0) return;
      onIndexChange?.(index);
      if (index < childrenArray.length - 1) {
        const t = setTimeout(() => setIndex((i) => i + 1), delay);
        return () => clearTimeout(t);
      }
    }, [index, delay, childrenArray.length]); // eslint-disable-line react-hooks/exhaustive-deps

    const itemsToShow = useMemo(() => {
      const shown = index < 0 ? childrenArray : childrenArray.slice(0, index + 1);
      return [...shown].reverse();
    }, [index, childrenArray]);

    return (
      <div
        data-animated-list=""
        data-ready={ready ? "" : undefined}
        className={cn("flex flex-col items-center", className)}
        {...props}
      >
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key} entering={index >= 0}>
            {item}
          </AnimatedListItem>
        ))}
      </div>
    );
  },
);
AnimatedList.displayName = "AnimatedList";
