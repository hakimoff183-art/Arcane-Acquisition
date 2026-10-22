// La vidéo s'ouvre depuis n'importe quel bouton de la page : un événement, une seule fenêtre (voir hero-video-dialog).
export const OPEN_VIDEO = "arcane:open-video";

export function openVideo() {
  window.dispatchEvent(new Event(OPEN_VIDEO));
}
