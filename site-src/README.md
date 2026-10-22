# Site Arcane Acquisition — sources

La page publiée est le fichier `index.html` à la racine du dépôt. Il est **généré** à partir de ce dossier :
on n'édite pas `index.html` à la main.

## Ce qu'il y a dedans

- **React 19 + Tailwind CSS v4**, rendu en HTML statique au build (la page s'affiche sans attendre le JavaScript,
  puis devient interactive).
- **Composants Magic UI** dans `src/components/ui/` : marquee, blur-fade, shimmer-button, border-beam,
  animated-list, number-ticker, dot-pattern, animated-beam, magic-card, bento-grid, hero-video-dialog,
  typing-animation. Mêmes noms et mêmes props que le registre `@magicui/*`, réécrits
  sans la librairie `motion` (animations CSS natives, plus légères).
- **Polices** Inter et Inter Display (licence OFL) auto-hébergées dans `public/fonts/` : aucun appel à Google Fonts.
- **Couleurs** du logo : crème `#F9F6F0`, noir `#1A1A1A`, orange `#FF6600` réservé au signal (le carré).
  Tous les tokens sont en haut de `src/styles.css`.

## Règles de design

- **L'orange marque les signaux d'achat** (carrés allumés, puce `SignalSquare`) et le carré du logo.
  Jamais pour un fond, un texte ou une bordure. Seules exceptions, sur le chemin de la demande :
  l'étincelle du bouton principal et le liseré qui fait le tour du formulaire.
- **Le bouton noir plein est réservé à l'action principale** (« Recevoir mon Radar offert »).
  Les autres actions sont en contour (ex. `VideoTrigger`, qui ouvre la vidéo depuis n'importe où dans la page).
- **Trois tailles de titre** (`src/styles.css`) : `display-hero` (le grand titre), `display-section`
  (chaque titre de section), `display-sub` (les sous-titres). `lead` pour le paragraphe d'introduction.
- **Repères de section** : `<Eyebrow step={n}>` au-dessus de chaque titre de section, numérotées de 1 à 7
  dans l'ordre de la page (`src/components/brand.tsx`). Si tu ajoutes ou retires une section,
  mets à jour `SECTION_COUNT` et les numéros.
- **Coches** : `<CheckBadge />` (rondes et légères), pas de carrés noirs.
- **Ombres** : `shadow-card` pour une carte posée, `shadow-float` pour les grandes pièces de démonstration.
- **Une seule animation vedette** : le Radar du haut de page. Ailleurs, apparitions au défilement
  et démonstrations utiles seulement. Tout s'arrête avec « réduire les animations ».

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
