import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { openVideo } from "@/lib/video";
import { Icon } from "@/components/brand";

/** Bouton secondaire « Voir la vidéo » : ouvre la même fenêtre que la vignette de la section vidéo. */
export function VideoTrigger({
  children = "Voir la vidéo",
  duration = "3 min",
  tone = "light",
  className,
}: {
  children?: ReactNode;
  duration?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openVideo}
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-3 rounded-full border pr-6 pl-2.5 text-[1.02rem] font-semibold whitespace-nowrap transition-colors",
        tone === "dark"
          ? "border-paper/20 text-paper hover:border-paper/40 hover:bg-paper/5"
          : "border-line-2 bg-card/70 text-ink backdrop-blur-sm hover:border-ink/25 hover:bg-card",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105",
          tone === "dark" ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <Icon.Play className="ml-0.5" />
      </span>
      {children}
      <span className={cn("label-mono", tone === "dark" ? "text-fog-2" : "text-ink-3")}>{duration}</span>
    </button>
  );
}
