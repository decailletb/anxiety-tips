# Décisions techniques

Ce document explique **pourquoi** le site est construit comme il l'est. Il sert à toute personne (ou tout agent) qui reprend le projet.

Vérifications faites le 2026-10-05 (versions publiées, état des projets).

## 1. Critères, par ordre de priorité

1. **Rapidité et lisibilité sur mobile.** Le site est consulté pendant une crise, sur un téléphone, d'une main. Il doit s'afficher tout de suite, sans chargement visible, avec un texte grand et aéré.
2. **Mise à jour en Markdown par un non-développeur.** Ajouter ou corriger un module = modifier un fichier `.md` (même depuis l'interface web de GitHub), rien d'autre.
3. **Hors ligne.** La trousse de crise doit rester accessible sans réseau.
4. **Déploiement GitHub Pages simple.** Un push sur `main` suffit ; pas de serveur, pas de secret.
5. **Maintenance minimale.** Peu de dépendances, outil vivant et stable, pas de thème lourd à suivre.

## 2. Choix retenu : Astro statique (sans Starlight) + service worker maison

- **Astro** (v7 au moment du choix) génère du **HTML statique** et n'envoie **aucun JavaScript** au navigateur par défaut → pages très légères, affichage immédiat (critère 1).
- **Content collections** : chaque module est un fichier Markdown dans `site/src/content/modules/` avec un petit en-tête (`title`, `order`, `summary`). Le schéma est validé au build : une faute dans l'en-tête produit une erreur claire au lieu d'une page cassée (critère 2).
- **Mise en page entièrement maîtrisée** : un seul layout, un CSS maison de quelques kilo-octets, pensé pour l'usage en crise (gros texte, peu d'éléments, bouton « Trousse de crise » fixe). Pas de barre latérale, pas de recherche, pas de menu complexe.
- **Hors ligne** : un **service worker écrit à la main** (quelques dizaines de lignes) + `manifest.webmanifest`. Pré-cache de la trousse, de l'accueil et du CSS ; cache-first pour les pages visitées. Pas de plugin PWA : moins de dépendances, comportement lisible (critère 3, 5). *(Tâche S5.)*
- **Déploiement** : workflow GitHub Actions officiel (`actions/upload-pages-artifact` + `actions/deploy-pages`) ; Astro documente ce cas (critère 4).
- **Maintenance** : dépendance unique `astro` ; projet très actif ; aucune intégration tierce (critère 5).

## 3. Alternatives écartées

| Option | Pourquoi écartée |
|---|---|
| **Astro Starlight** | Thème orienté documentation technique : barre latérale, table des matières, recherche (Pagefind, avec son JavaScript et son index), en-tête chargé. Très bien pour une doc, **trop d'éléments pour une personne en crise** qui doit trouver un seul bouton. Le personnaliser au point d'enlever tout cela coûte plus que d'écrire un layout simple. |
| **MkDocs + Material for MkDocs** | Chaîne Python (deuxième écosystème à maintenir). **MkDocs 1.x n'est plus maintenu** (aucune vraie évolution depuis août 2024) et l'équipe de Material a annoncé en novembre 2025 que **Material for MkDocs passe en mode maintenance** (corrections critiques seulement) au profit de son nouvel outil, Zensical. Thème « doc » chargé ; le mode hors ligne n'est pas une vraie PWA native. |
| **Eleventy (11ty)** | Bon outil, léger et stable (v3). Mais il faut tout assembler soi-même (gabarits, collections, validation du contenu) : pas de schéma validé pour l'en-tête des modules, plus de configuration à écrire et à expliquer. Astro offre le même résultat « zéro JS » avec une validation du contenu intégrée. |
| **Jekyll** | Seul générateur intégré nativement à GitHub Pages, mais l'environnement Pages est figé sur **Jekyll 3.10** (le gem `github-pages` n'a plus évolué depuis 2024) et n'autorise qu'une liste fermée de plugins. Écosystème Ruby vieillissant. En passant par Actions pour avoir Jekyll 4, on perd l'avantage « natif ». |
| **HTML pur** | Aucune dépendance, mais chaque modification de contenu oblige à éditer du HTML (balises, liens précédent/suivant, sommaire à la main) : contraire au critère 2, source d'erreurs. |

## 4. Non-indexation du site

Le site est personnel. Il ne doit pas apparaître dans les moteurs de recherche.

Mesures appliquées :

- **`<meta name="robots" content="noindex, nofollow">` sur chaque page**, posée dans le layout unique. Le workflow de déploiement **échoue** si un fichier `.html` de `dist/` ne contient pas `noindex`.
- **Pas de sitemap** (pas d'intégration `@astrojs/sitemap`). Le workflow échoue si un fichier `sitemap*` apparaît dans `dist/`.
- **Aucun analytics, aucun traqueur, aucune ressource externe** (ni police, ni script, ni image distante). **Polices système** uniquement.
- **Pas d'en-tête `X-Robots-Tag`** : GitHub Pages ne permet pas de définir des en-têtes HTTP. La balise meta suffit pour les pages HTML (les seules pages publiées).

### Pourquoi on ne bloque rien dans `robots.txt`

- Un `Disallow` **empêche le robot de lire la page**, donc **il ne voit jamais le `noindex`**. Si un lien externe pointe vers le site, l'URL peut alors être indexée **sans contenu** (titre/URL seuls). Pour qu'un `noindex` fonctionne, la page doit rester explorable.
- Le site est un **site de projet** GitHub Pages : `https://decailletb.github.io/anxiety-tips/`. Les robots ne lisent `robots.txt` **qu'à la racine de l'hôte** (`https://decailletb.github.io/robots.txt`). Un fichier `anxiety-tips/robots.txt` n'est donc **jamais consulté** et n'aurait aucun effet, ni positif ni négatif.

**Décision : on publie un `robots.txt` neutre** (`User-agent: *` / `Allow: /`), sans aucun `Disallow`, dans `site/public/robots.txt`.

Justification :
- il est sans effet aujourd'hui (pas à la racine de l'hôte) et sans risque ;
- il **documente l'intention** dans le repo : quelqu'un qui voudrait « bien faire » en ajoutant un `Disallow` trouve le fichier commenté qui explique pourquoi il ne faut pas ;
- si le site passe un jour sur un **domaine personnalisé** (alors à la racine de l'hôte), le fichier devient actif et reste correct (il laisse lire le `noindex`).

### Limite à connaître

Le **repo est public** : le contenu Markdown est lisible sur GitHub de toute façon (et GitHub peut être indexé). C'est accepté car le contenu ne contient **aucune donnée personnelle** (voir `CLAUDE.md`, règle « Vie privée »). La non-indexation sert à ne pas exposer le site dans les résultats de recherche, pas à le rendre secret.

## 5. Conventions techniques

- `base: '/anxiety-tips'`, `site: 'https://decailletb.github.io'`, `trailingSlash: 'always'` (GitHub Pages sert `dossier/index.html` ; URLs toujours terminées par `/`, cohérent avec `build.format: 'directory'`).
- Tous les liens internes passent par `import.meta.env.BASE_URL`.
- Node : version LTS en CI (`lts/*`) ; Astro exige Node ≥ 22.12.
- `package-lock.json` commité ; la CI utilise `npm ci`.
