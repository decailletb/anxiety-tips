// Intégration Astro (sans dépendance) : typographie française dans les pages construites.
// Remplace l'espace ordinaire avant « : ; ? ! » et à l'intérieur des guillemets « » par une
// espace insécable, pour qu'un « » » ou un « : » ne se retrouve jamais seul en début de ligne
// sur un petit écran. Seul le texte affiché change (pas le code, ni les styles, ni les attributs).
// Doit tourner AVANT sw-precache (l'empreinte du cache porte sur les fichiers finaux).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NBSP = ' ';
// Blocs laissés tels quels.
const RAW = /(<(script|style|pre|code|textarea)\b[\s\S]*?<\/\2>)/gi;

function fixText(text) {
  return text.replace(/«[ \t]+/g, '«' + NBSP).replace(/[ \t]+([»:;?!])/g, NBSP + '$1');
}

export function fixHtml(html) {
  return html
    .split(RAW)
    .map((part, i, all) => {
      // split avec 2 groupes : [texte, bloc brut, nom de balise, texte, ...]
      if (i % 3 !== 0) return i % 3 === 1 ? part : '';
      return part.replace(/>([^<>]+)</g, (_, t) => '>' + fixText(t) + '<');
    })
    .join('');
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

export default function frSpaces() {
  return {
    name: 'fr-spaces',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        let changed = 0;
        for (const file of walk(fileURLToPath(dir))) {
          if (!file.endsWith('.html')) continue;
          const html = readFileSync(file, 'utf8');
          const out = fixHtml(html);
          if (out !== html) {
            writeFileSync(file, out);
            changed++;
          }
        }
        logger.info(`espaces insécables : ${changed} pages`);
      },
    },
  };
}
