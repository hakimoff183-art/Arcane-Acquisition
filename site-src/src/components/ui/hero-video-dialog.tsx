import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Magic UI — HeroVideoDialog (API de @magicui/hero-video-dialog).
// Fenêtre native <dialog> : focus piégé, touche Échap, et la vidéo ne se charge qu'au clic.
// Ajouts : `thumbnail` (vignette dessinée en HTML au lieu d'une image), `fallbackHref` (lien direct si l'intégration est impossible).
type AnimationStyle = "from-bottom" | "from-center" | "fade";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  thumbnail?: ReactNode;
  className?: string;
  label?: string;
  fallbackHref?: string;
  embedAllowed?: boolean;
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Vignette de la vidéo",
  thumbnail,
  className,
  label = "Lancer la vidéo",
  fallbackHref,
  embedAllowed = true,
}: HeroVideoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    if (!embedAllowed && fallbackHref) {
      window.open(fallbackHref, "_blank", "noopener");
      return;
    }
    setOpen(true);
    dialogRef.current?.showModal();
  }, [embedAllowed, fallbackHref]);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("click", onClick);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onClick);
    };
  }, []);

  const Trigger = !embedAllowed && fallbackHref ? "a" : "button";

  return (
    <div className={cn("relative", className)}>
      <Trigger
        {...(Trigger === "a"
          ? { href: fallbackHref, target: "_blank", rel: "noopener" }
          : { type: "button", onClick: show })}
        aria-label={label}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-[inherit] text-left"
      >
        {thumbnail ??
          (thumbnailSrc && (
            <img src={thumbnailSrc} alt={thumbnailAlt} className="w-full transition-all duration-200 ease-out group-hover:brightness-[0.8]" />
          ))}
        <span className="absolute inset-0 flex scale-[0.92] items-center justify-center transition-all duration-200 ease-out group-hover:scale-100">
          <span className="relative flex size-24 items-center justify-center md:size-28">
            <span aria-hidden className="play-ring absolute inset-0 rounded-full bg-paper/30" />
            <span className="relative flex size-20 items-center justify-center rounded-full bg-paper shadow-[0_12px_40px_rgb(0_0_0/0.35)] md:size-24">
              <svg aria-hidden viewBox="0 0 24 24" className="ml-1 size-8 fill-ink md:size-9">
                <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
          </span>
        </span>
      </Trigger>

      <dialog ref={dialogRef} data-video-dialog="" aria-label="Vidéo de présentation du Radar">
        <div className="flex h-full w-full items-center justify-center p-4 md:p-10">
          <div data-video-panel="" className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={close}
              className="absolute -top-14 right-0 flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur-md transition hover:bg-paper/20"
              aria-label="Fermer la vidéo"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative isolate z-[1] mx-auto aspect-[4/3] max-h-[78vh] overflow-hidden rounded-2xl bg-night ring-1 ring-paper/15">
              {open && (
                <iframe
                  src={videoSrc}
                  title="Présentation du Radar"
                  className="size-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
