// Intégration Astro (sans dépendance) : après le build, écrit dans dist/sw.js
// - la liste de TOUS les fichiers du site (pages comprises) à mettre en cache hors ligne ;
// - une version = empreinte du contenu du build (le cache change dès qu'un fichier change).
// Les chemins sont relatifs à la base du site (ex. 'trousse/' = /anxiety-tips/trousse/).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Fichiers inutiles hors ligne.
const SKIP = new Set(['sw.js', 'robots.txt', '404.html']);
// Doivent exister : le service worker refuse de s'installer sans eux.
const CORE = ['./', 'trousse/', 'aide/', 'journal/', 'favicon.svg', 'manifest.webmanifest'];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

export default function swPrecache() {
  return {
    name: 'sw-precache',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const hash = createHash('sha256');
        const entries = [];
        for (const file of walk(dist).sort()) {
          const rel = relative(dist, file).split(sep).join('/');
          if (SKIP.has(rel)) continue;
          hash.update(rel).update(readFileSync(file));
          // dossier/index.html -> dossier/ ; index.html -> ./
          if (rel === 'index.html') entries.push('./');
          else if (rel.endsWith('/index.html')) entries.push(rel.slice(0, -'index.html'.length));
          else entries.push(rel);
        }
        const missing = CORE.filter((p) => !entries.includes(p));
        if (missing.length) throw new Error(`sw-precache : pages indispensables absentes du build : ${missing.join(', ')}`);

        const version = hash.digest('hex').slice(0, 12);
        const swPath = join(dist, 'sw.js');
        let sw = readFileSync(swPath, 'utf8');
        const before = sw;
        sw = sw.replace(/\/\*SW_VERSION\*\/.*?\/\*END\*\//, `/*SW_VERSION*/ '${version}' /*END*/`);
        sw = sw.replace(/\/\*SW_PRECACHE\*\/.*?\/\*END\*\//, `/*SW_PRECACHE*/ ${JSON.stringify(entries)} /*END*/`);
        if (sw === before || sw.includes("'dev'")) throw new Error('sw-precache : marqueurs introuvables dans sw.js');
        writeFileSync(swPath, sw);
        logger.info(`sw.js : version ${version}, ${entries.length} fichiers en cache hors ligne`);
      },
    },
  };
}
