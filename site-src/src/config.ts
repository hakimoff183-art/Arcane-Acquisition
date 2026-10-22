// ► Réglages du site. Tout ce qui change d'une version à l'autre est ici.
declare const __PREVIEW__: boolean;

export const SITE = {
  url: "https://www.arcane-acquisition.site/",
  // Formulaire Tally (demande de Radar)
  tallyEmbed: "https://tally.so/embed/dbqRED?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  tallyLink: "https://tally.so/r/dbqRED",
  // Vidéo de présentation (Vimeo)
  videoEmbed: "https://player.vimeo.com/video/1238198192?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1",
  videoLink: "https://vimeo.com/1238198192",
};

/** true dans l'aperçu Claude : les iframes externes (Tally, Vimeo) y sont bloquées, on ouvre des liens à la place. */
export const PREVIEW = typeof __PREVIEW__ !== "undefined" && __PREVIEW__;
