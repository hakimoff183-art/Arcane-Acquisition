import { useEffect, useId, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/hooks";

// Magic UI — AnimatedBeam (API de @magicui/animated-beam).
// Le dégradé se déplace avec une animation SVG native au lieu de motion.
export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = "beam" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [pathD, setPathD] = useState("");
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!prefersReducedMotion());
    const update = () => {
      const c = containerRef.current, a = fromRef.current, b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      setBox({ width: cr.width, height: cr.height });
      const sx = ar.left - cr.left + ar.width / 2 + startXOffset;
      const sy = ar.top - cr.top + ar.height / 2 + startYOffset;
      const ex = br.left - cr.left + br.width / 2 + endXOffset;
      const ey = br.top - cr.top + br.height / 2 + endYOffset;
      const cy = sy - curvature;
      setPathD(`M ${sx},${sy} Q ${(sx + ex) / 2},${cy} ${ex},${ey}`);
    };
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    update();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  if (!pathD) return null;

  const x1 = reverse ? "90%;-10%" : "10%;110%";
  const x2 = reverse ? "100%;0%" : "0%;100%";
  const timing = { dur: `${duration}s`, begin: `${delay}s`, repeatCount: "indefinite", calcMode: "spline", keyTimes: "0;1", keySplines: "0.16 1 0.3 1" };

  return (
    <svg
      aria-hidden
      fill="none"
      width={box.width}
      height={box.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${box.width} ${box.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      {animate && (
        <>
          <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
          <defs>
            <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
              <animate attributeName="x1" values={x1} {...timing} />
              <animate attributeName="x2" values={x2} {...timing} />
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
            </linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
