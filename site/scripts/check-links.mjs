// Vérifie les liens internes du site généré (dist/) :
// chaque <a href> interne (relatif ou sous /anxiety-tips/) doit pointer vers un fichier existant,
// et chaque ancre (#...) vers un id présent dans la page cible.
// Usage : npm run check:links (après npm run build). Code de sortie 1 si un lien est cassé.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const base = '/anxiety-tips/';

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// Résout un chemin d'URL du site vers un fichier de dist/.
function toFile(urlPath) {
  let p = join(dist, decodeURIComponent(urlPath));
  if (urlPath.endsWith('/')) p = join(p, 'index.html');
  else if (!existsSync(p) && existsSync(p + '/index.html')) p = join(p, 'index.html');
  return p;
}

const ids = new Map();
function idsOf(file) {
  if (!ids.has(file)) {
    const html = readFileSync(file, 'utf8');
    ids.set(file, new Set([...html.matchAll(/\bid=["']?([^"'\s>]+)/g)].map((m) => m[1])));
  }
  return ids.get(file);
}

const errors = [];
const htmlFiles = walk(dist).filter((f) => f.endsWith('.html'));

for (const file of htmlFiles) {
  const rel = relative(dist, file);
  const html = readFileSync(file, 'utf8');
  // URL de la page courante (pour résoudre les liens relatifs).
  const pageUrl = base + rel.split(sep).join('/').replace(/index\.html$/, '');
  for (const m of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|sms:|javascript:)/i.test(href)) continue;
    const [pathPart, hash] = href.split('#');
    let target = file;
    if (pathPart) {
      const url = new URL(pathPart, 'https://x' + pageUrl);
      if (!url.pathname.startsWith(base)) {
        errors.push(`${rel} : lien hors du site « ${href} »`);
        continue;
      }
      target = toFile(url.pathname.slice(base.length));
      if (!existsSync(target)) {
        errors.push(`${rel} : lien cassé « ${href} »`);
        continue;
      }
    }
    if (hash && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(hash))) {
      errors.push(`${rel} : ancre introuvable « ${href} »`);
    }
  }
}

if (errors.length) {
  console.error(`Liens internes : ${errors.length} problème(s)`);
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
}
console.log(`Liens internes : OK (${htmlFiles.length} pages vérifiées).`);
