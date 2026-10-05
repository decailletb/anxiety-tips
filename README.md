# Traverser la vague

Un petit site « formation » personnel et un guide en Markdown pour mieux **traverser** les crises d'anxiété (ruminations, boule au ventre, sommeil, nourriture, difficulté à rester seule). Contenu en français, compatible grossesse, ressources suisses.

- Site : https://decailletb.github.io/anxiety-tips/ (non indexé par les moteurs de recherche)
- Guide complet : [docs/guide-direct.md](docs/guide-direct.md)

> Ce contenu ne remplace pas un suivi médical. En cas d'urgence en Suisse : **144**. Pour parler à quelqu'un, jour et nuit : **143** (La Main Tendue).

## Structure du projet

```
docs/
  guide-direct.md        Livrable 1 : le guide complet (base de contenu du site)
  decisions.md           Choix techniques et alternatives écartées
research/                Fiches de recherche sourcées + rapports de relecture
site/                    Le site (Astro, statique)
  src/content/modules/   ← LES MODULES, un fichier Markdown par module
  src/content/pages/     ← trousse.md (trousse de crise) et aide.md
  src/pages/             Gabarits des pages (accueil, module, trousse, aide, journal)
  src/layouts/           Mise en page commune (noindex, bouton trousse, hors ligne)
  src/styles/global.css  Couleurs (thème jour, mode nuit en option), typographie
  public/                Fichiers servis tels quels (sw.js, manifest, icônes, local.js)
  scripts/               Vérifications avant déploiement
.github/workflows/       Déploiement automatique vers GitHub Pages
CLAUDE.md, PROGRESS.md   Règles et suivi du travail des agents
```

## Modifier ou ajouter un module

Tout se fait en Markdown, sans toucher au code.

1. Ouvre `site/src/content/modules/`. Chaque fichier = un module (ex. `06-sommeil.md`).
2. **Modifier** : change le texte, enregistre. C'est tout.
3. **Ajouter** : copie un module existant, renomme-le (ex. `11-respirer.md`) et adapte l'en-tête :
   ```markdown
   ---
   title: "Le titre affiché"
   order: 11
   summary: "Une phrase qui résume le module."
   ---
   ```
   `order` fixe la position dans la liste. L'adresse de la page reprend le nom du fichier.
4. Structure conseillée : `## En bref` → `## Exercices` (un `###` par exercice : Pourquoi ça t'aide / Comment / Quand) → `## À retenir` → `## Sources`.
5. Liens entre pages : vers un autre module `../06-sommeil/`, vers la trousse `../../trousse/`, vers l'aide `../../aide/`.

La **trousse de crise** se modifie dans `site/src/content/pages/trousse.md` (une action par ligne de liste, chaque ligne devient une grande carte). La page **aide** dans `site/src/content/pages/aide.md`.

Directement sur GitHub : ouvre le fichier, clique sur le crayon ✏️, modifie, puis « Commit changes ». Le site se met à jour tout seul en une à deux minutes.

## Prévisualiser en local

Prérequis : Node.js 22.12 ou plus récent.

```sh
cd site
npm ci              # une seule fois
npm run dev         # aperçu en direct : http://localhost:4321/anxiety-tips/
```

Pour tester comme en production (y compris le hors ligne) :

```sh
npm run build
npm run check:dist   # noindex partout, pas de sitemap, aucune ressource externe, liste hors ligne
npm run check:links  # aucun lien interne ni ancre cassé
npm run preview
```

## Déploiement

- Chaque push sur `main` lance le workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) : installation, build, vérifications (`check:dist`, `check:links`), puis publication sur GitHub Pages.
- Si une vérification échoue, rien n'est publié et l'ancienne version reste en ligne.
- Suivi : onglet **Actions** du repo.
- Réglage requis (déjà fait) : *Settings → Pages → Source : GitHub Actions*.

## Vie privée et non-indexation

- Chaque page porte `<meta name="robots" content="noindex, nofollow">` ; pas de sitemap, pas d'analytics, pas de police ni script externes. Détails et justification (dont `robots.txt`) dans [docs/decisions.md](docs/decisions.md).
- Le journal et les contacts personnels sont stockés **uniquement dans le navigateur du téléphone** (localStorage). Rien n'est envoyé nulle part.
- Le repo est public : n'y mets jamais de prénom, de numéro personnel ni de détail médical.

## Conventions Git

Commits au format `type(scope): description` (en anglais, à l'impératif), branches `type/description-courte`. Un hook vérifie le format : active-le une fois avec `git config core.hooksPath .githooks`.
