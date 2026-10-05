// Vérifie le site généré (dist/) avant déploiement :
// 1. chaque page .html contient <meta name="robots" content="noindex, nofollow">
// 2. aucun fichier sitemap
// 3. aucune ressource externe chargée (script, style, police, image, iframe...)
// Usage : npm run check:dist (après npm run build). Code de sortie 1 si un problème.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(dist);
const errors = [];
const robotsMeta = /<meta\s+name=["']?robots["']?\s+content=["'][^"']*noindex[^"']*["']/i;
// Attributs qui font charger une ressource ; les liens <a href> vers des sources ne comptent pas.
const externalLoad =
  /<(script|link|img|iframe|source|video|audio|embed|object)\b[^>]*\b(src|href|srcset|data)=["']?(https?:)?\/\//gi;
const cssExternal = /(@import|url\()\s*["']?(https?:)?\/\//gi;

const htmlFiles = files.filter((f) => f.endsWith('.html'));
if (htmlFiles.length === 0) errors.push('aucun fichier .html dans dist/ (build manquant ?)');

for (const f of files) {
  const rel = relative(dist, f);
  if (/sitemap/i.test(rel)) errors.push(`sitemap interdit : ${rel}`);
  if (f.endsWith('.html')) {
    const html = readFileSync(f, 'utf8');
    if (!robotsMeta.test(html)) errors.push(`meta robots noindex absente : ${rel}`);
    for (const m of html.matchAll(externalLoad)) errors.push(`ressource externe dans ${rel} : ${m[0]}`);
    for (const m of html.matchAll(cssExternal)) errors.push(`ressource externe (CSS) dans ${rel} : ${m[0]}`);
  } else if (/\.(css|js|mjs)$/.test(f)) {
    const text = readFileSync(f, 'utf8');
    for (const m of text.matchAll(cssExternal)) errors.push(`ressource externe dans ${rel} : ${m[0]}`);
  }
}

if (errors.length) {
  console.error('Vérification de dist/ : ÉCHEC');
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}
console.log(`Vérification de dist/ : OK (${htmlFiles.length} pages avec noindex, pas de sitemap, aucune ressource externe).`);
