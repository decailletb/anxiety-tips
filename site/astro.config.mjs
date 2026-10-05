// @ts-check
import { defineConfig } from 'astro/config';

// Site de projet GitHub Pages : https://decailletb.github.io/anxiety-tips/
// Pas d'intégration (pas de sitemap, pas d'analytics) : voir docs/decisions.md.
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
});
