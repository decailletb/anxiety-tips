// @ts-check
import { defineConfig } from 'astro/config';
import swPrecache from './integrations/sw-precache.mjs';
import frSpaces from './integrations/fr-spaces.mjs';

// Site de projet GitHub Pages : https://decailletb.github.io/anxiety-tips/
// Pas de sitemap, pas d'analytics : voir docs/decisions.md.
// Intégrations maison, sans dépendance : fr-spaces (espaces insécables de la typographie
// française dans dist/), puis sw-precache (liste hors ligne écrite dans dist/sw.js après le build).
export default defineConfig({
  site: 'https://decailletb.github.io',
  base: '/anxiety-tips',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS intégré à chaque page : une page = un seul fichier, rapide et simple à garder hors ligne.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
  integrations: [frSpaces(), swPrecache()],
});
