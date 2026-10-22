import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { OPEN_VIDEO } from "@/lib/video";

// Magic UI — HeroVideoDialog (API de @magicui/hero-video-dialog).
// Fenêtre native <dialog> : focus piégé, touche Échap, et la vidéo ne se charge qu'au clic.
// Ajouts : `thumbnail` (vignette dessinée en HTML au lieu d'une image), `fallbackHref` (lien direct si l'intégration est impossible).
// Le panneau 4:3 et son bouton Fermer tiennent toujours dans l'écran : voir « vidéo : la fenêtre » dans styles.css.
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
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, [embedAllowed, fallbackHref]);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    // un clic hors du panneau (sur le fond) ferme la fenêtre
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-video-panel]")) d.close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("click", onClick);
    // les autres boutons « Voir la vidéo » de la page (openVideo) ouvrent cette même fenêtre
    window.addEventListener(OPEN_VIDEO, show);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("click", onClick);
      window.removeEventListener(OPEN_VIDEO, show);
    };
  }, [show]);

  const Trigger = !embedAllowed && fallbackHref ? "a" : "button";

  return (
    <div className={cn("relative", className)}>
      <Trigger
        {...(Trigger === "a"
          ? { href: fallbackHref, target: "_blank", rel: "noopener" }
          : { type: "button", onClick: show })}
        aria-label={label}
        className="group @container relative block w-full cursor-pointer overflow-hidden rounded-[inherit] text-left"
      >
        {thumbnail ??
          (thumbnailSrc && (
            <img src={thumbnailSrc} alt={thumbnailAlt} className="w-full transition-all duration-200 ease-out group-hover:brightness-[0.8]" />
          ))}
        {/* bouton lecture proportionné à la vignette (cqw), avec un halo fixe : pas d'animation en boucle */}
        <span aria-hidden className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-[clamp(4rem,15cqw,6rem)] items-center justify-center rounded-full bg-paper text-ink shadow-[0_18px_44px_-12px_rgb(0_0_0/0.7)] ring-[length:clamp(8px,2.2cqw,14px)] ring-paper/10 transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.06] group-hover:ring-paper/15">
            <svg viewBox="0 0 24 24" className="ml-[7%] size-[36%] fill-current">
              <path d="M7 4.5v15a1 1 0 0 0 1.53.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
        </span>
      </Trigger>
      {/* sans JavaScript, la vignette mène à la vidéo sur Vimeo */}
      {Trigger === "button" && fallbackHref && (
        <noscript>
          <a href={fallbackHref} target="_blank" rel="noopener" aria-label={label} className="absolute inset-0 rounded-[inherit]" />
        </noscript>
      )}

      <dialog ref={dialogRef} data-video-dialog="" aria-label="Vidéo de présentation du Radar">
        <div data-video-stage="" className="on-dark flex size-full items-center justify-center">
          <div data-video-panel="" className="relative aspect-[4/3]">
            {/* premier élément focalisable : le focus arrive ici à l'ouverture, Échap reste dans la page */}
            <button
              type="button"
              data-video-close=""
              onClick={close}
              className="absolute flex size-11 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/25 backdrop-blur-md transition-colors hover:bg-paper/20"
              aria-label="Fermer la vidéo"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative isolate size-full overflow-hidden rounded-2xl bg-night ring-1 ring-paper/15">
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
