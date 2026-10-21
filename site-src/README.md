# Site Arcane Acquisition — sources

La page publiée est le fichier `index.html` à la racine du dépôt. Il est **généré** à partir de ce dossier :
on n'édite pas `index.html` à la main.

## Ce qu'il y a dedans

- **React 19 + Tailwind CSS v4**, rendu en HTML statique au build (la page s'affiche sans attendre le JavaScript,
  puis devient interactive).
- **Composants Magic UI** dans `src/components/ui/` : marquee, blur-fade, shimmer-button, border-beam,
  animated-list, number-ticker, dot-pattern, animated-beam, magic-card, bento-grid, hero-video-dialog,
  typing-animation, animated-shiny-text. Mêmes noms et mêmes props que le registre `@magicui/*`, réécrits
  sans la librairie `motion` (animations CSS natives, plus légères).
- **Polices** Inter et Inter Display (licence OFL) auto-hébergées dans `public/fonts/` : aucun appel à Google Fonts.
- **Couleurs** du logo : crème `#F9F6F0`, noir `#1A1A1A`, orange `#FF6600` réservé au signal (le carré).
  Tous les tokens sont en haut de `src/styles.css`.

## Modifier un texte

| Je veux changer… | Fichier |
| --- | --- |
| Le formulaire Tally ou la vidéo Vimeo | `src/config.ts` |
| Le titre, le Radar d'exemple | `src/sections/hero.tsx` |
| Les signaux qui défilent | `src/sections/signals-rail.tsx` |
| « Un mois plein. Puis plus rien. » | `src/sections/problem.tsx` |
| La vidéo | `src/sections/video.tsx` |
| Ce que contient le Radar | `src/sections/contents.tsx` |
| Les 3 étapes | `src/sections/process.tsx` |
| Les critères « Pour qui » | `src/sections/who.tsx` |
| La FAQ | `src/sections/faq.tsx` |
| Le formulaire | `src/sections/apply.tsx` |
| Titre Google, description, image de partage | `build.mjs` (objet `META`) |

## Regénérer le site

```bash
cd site-src
npm install
npm run site      # construit dist/ puis copie le résultat à la racine du dépôt
```

Ensuite : commit + push, Vercel redéploie tout seul.

`npm run preview` produit `preview.html`, une version autonome (polices incluses) pour un aperçu hors site.

## Suivi des demandes

Dans `src/sections/apply.tsx`, la fonction `onMessage` reçoit l'événement « formulaire envoyé » de Tally :
c'est là qu'on branche un pixel ou un outil de statistiques.
