// Build du site Arcane Acquisition : React (rendu serveur + hydratation) + Tailwind v4, sans dépendance réseau.
// node build.mjs            -> dist/  (le site à déployer tel quel sur Vercel)
// node build.mjs --preview  -> preview.html (aperçu autonome, polices incluses)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const LOCAL = path.join(path.dirname(new URL(import.meta.url).pathname), "node_modules");
const MODULES = process.env.NODE_TOOLS || (fs.existsSync(path.join(LOCAL, "react")) ? LOCAL : "/opt/npm-tools/node_modules");
const esbuild = await import(path.join(MODULES, "esbuild/lib/main.js"));
const { compile } = await import(path.join(MODULES, "tailwindcss/dist/lib.mjs"));

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const PREVIEW = process.argv.includes("--preview");
const OUT = path.join(ROOT, PREVIEW ? ".build/preview" : "dist");
fs.mkdirSync(path.join(ROOT, ".build"), { recursive: true });
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const META = {
  title: "Arcane Acquisition — 10 prospects chauds en 72 h",
  description:
    "Pour les agences B2B qui vivent du bouche-à-oreille : 10 entreprises de ton marché qui ont besoin de toi maintenant, avec le décideur et le message prêt à envoyer. Livré par email en 72 h. Offert.",
  ogTitle: "10 prospects chauds. Livrés en 72 h.",
  ogDescription:
    "Les entreprises de ton marché qui recrutent, lèvent des fonds ou changent de dirigeant, avec le message prêt à envoyer. Un formulaire, aucun appel. Offert.",
  url: "https://www.arcane-acquisition.site/",
};

const define = {
  "process.env.NODE_ENV": '"production"',
  __PREVIEW__: PREVIEW ? "true" : "false",
};
const common = {
  bundle: true,
  jsx: "automatic",
  nodePaths: [MODULES],
  tsconfig: path.join(ROOT, "tsconfig.json"),
  define,
  logLevel: "warning",
  legalComments: "none",
};

// 1. rendu serveur
const serverFile = path.join(ROOT, ".build", `server-${PREVIEW ? "preview" : "site"}.mjs`);
await esbuild.build({ ...common, entryPoints: [path.join(SRC, "server.tsx")], platform: "node", format: "esm", outfile: serverFile,
  banner: { js: 'import { createRequire as __cr } from "node:module"; const require = __cr(import.meta.url);' } });
const { render, sprite } = await import(pathToFileURL(serverFile).href + "?t=" + Date.now());
const appHtml = render();
const spriteSvg = sprite();

// 2. bundle client
const client = await esbuild.build({
  ...common,
  entryPoints: [path.join(SRC, "client.tsx")],
  platform: "browser",
  format: "iife",
  target: ["es2020", "safari15"],
  minify: true,
  write: false,
});
const js = client.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

// 3. CSS Tailwind (les classes sont lues directement dans les sources)
const TW = path.join(MODULES, "tailwindcss");
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|css)$/.test(f)) files.push(p);
  }
})(SRC);
const candidates = new Set();
for (const f of files) for (const tok of fs.readFileSync(f, "utf8").split(/[\s"'`]+/)) if (tok) candidates.add(tok);
const tw = await compile(fs.readFileSync(path.join(SRC, "styles.css"), "utf8"), {
  base: SRC,
  loadStylesheet: async (id) => {
    const map = { tailwindcss: "index.css", "tailwindcss/theme": "theme.css", "tailwindcss/preflight": "preflight.css", "tailwindcss/utilities": "utilities.css" };
    const file = path.join(TW, map[id] ?? id.replace(/^\.\//, ""));
    return { path: file, base: TW, content: fs.readFileSync(file, "utf8") };
  },
});
let css = tw.build([...candidates]);
const fontDir = path.join(PUBLIC, "fonts");
css = css.replace(/url\("__FONT__([^"]+)"\)/g, (_, f) =>
  PREVIEW ? `url("data:font/woff2;base64,${fs.readFileSync(path.join(fontDir, f)).toString("base64")}")` : `url("/fonts/${f}")`,
);
css = (await esbuild.transform(css, { loader: "css", minify: true })).code;

// 4. page
const jsFlag = `<script>document.documentElement.classList.add("js")</script>`;
let page;
if (PREVIEW) {
  // aperçu Claude : contenu seul, le gabarit <html>/<head>/<body> est ajouté à la publication
  page = [
    `<title>Arcane Acquisition</title>`,
    `<meta name="claude:viewport-fit-sides" content="cover">`,
    `<meta name="description" content="${META.description}">`,
    jsFlag,
    `<style>${css}</style>`,
    spriteSvg,
    `<div id="root">${appHtml}</div>`,
    `<script>${js}</script>`,
  ].join("\n");
  fs.writeFileSync(path.join(ROOT, "preview.html"), page);
} else {
  page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${META.title}</title>
<meta name="description" content="${META.description}">
<link rel="canonical" href="${META.url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Arcane Acquisition">
<meta property="og:url" content="${META.url}">
<meta property="og:title" content="${META.ogTitle}">
<meta property="og:description" content="${META.ogDescription}">
<meta property="og:image" content="${META.url}og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Arcane Acquisition : 10 prospects chauds, livrés en 72 h.">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F9F6F0">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/inter-display-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="dns-prefetch" href="https://tally.so">
<link rel="dns-prefetch" href="https://player.vimeo.com">
${jsFlag}
<style>${css}</style>
</head>
<body>
${spriteSvg}
<div id="root">${appHtml}</div>
<script>${js}</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, "index.html"), page);
  // fichiers statiques (polices, favicons, image de partage)
  fs.cpSync(PUBLIC, OUT, { recursive: true });
}

const kb = (n) => (n / 1024).toFixed(1) + " Ko";
console.log(
  `${PREVIEW ? "preview.html" : "dist/index.html"} : ${kb(Buffer.byteLength(page))} (CSS ${kb(css.length)}, JS ${kb(js.length)}, HTML rendu ${kb(appHtml.length)})`,
);
