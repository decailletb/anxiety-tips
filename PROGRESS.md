# PROGRESS

## Statut global

- Phase en cours : **1 — recherche** + **3 — squelette site** (≈ 8 %)
- Branche active : `main` (lots sur branches dédiées)
- Site cible : https://decailletb.github.io/anxiety-tips/

Légende : `[ ]` à faire · `[~]` en cours · `[x]` fait · `[!]` bloqué

## Tâches

### Phase 0 — Démarrage
- [x] P0.1 Vérifier repo (public, droits admin, Pages en mode « workflow », Actions actifs)
- [x] P0.2 Créer CLAUDE.md (règles, reprise)
- [x] P0.3 Config sans attribution + hook commit-msg ; commit de test vérifié
- [x] P0.4 Sous-agents `.claude/agents/` (chercheur, redacteur, dev-site, relecteur)
- [x] P0.5 PROGRESS.md
- [x] P0.6 Fusion `chore/project-setup` → main, push

### Phase 1 — Recherche (`research/`, chercheurs en parallèle)
- [x] R1 `ruminations.md`
- [x] R2 `boule-au-ventre-et-sens-des-sensations.md` (inclut contraste nausées / boule au ventre)
- [x] R3 `nourriture-et-poids.md` (qualitatif, grossesse)
- [~] R4 `sommeil.md` (compatible grossesse)
- [x] R5 `etre-seule.md`
- [x] R6 `signaux-precoces-et-trousse-de-crise.md` (journal, patterns, ancrage, respiration douce)
- [~] R7 `ressources-suisse.md` (numéros vérifiés) + `livres.md` (disponibles en Suisse, FR)
- [ ] R8 Contrôle croisé grossesse sur toutes les fiches + vérifier liens non ouverts (R2 : PDF Russ Harris, Shortform, Lieberman 2007)

### Phase 2 — Livrable 1 (`docs/guide-direct.md`)
- [ ] G1 Plan + trousse de crise + section aide
- [ ] G2 Sections ruminations, boule au ventre, contraste nausées
- [ ] G3 Sections nourriture/poids, sommeil, être seule
- [ ] G4 Signaux précoces + journal + livres
- [ ] G5 Relecture (relecteur) + corrections

### Phase 3 — Squelette du site (parallèle à phase 2)
- [~] S1 `docs/decisions.md` (techno, robots, alternatives)
- [~] S2 Astro init dans `site/`, layout, thème doux, mode sombre, noindex
- [ ] S3 Bouton fixe + page trousse de crise
- [ ] S4 Workflow GitHub Actions → Pages, premier déploiement vérifié
- [ ] S5 Service worker + manifest (hors ligne)
- [ ] S6 Journal des signaux (localStorage) + version imprimable

### Phase 4 — Modules (rédacteurs en parallèle + relecture)
- [ ] M1 Comprendre tes crises
- [ ] M2 Repérer les signaux précoces
- [ ] M3 Pendant la crise
- [ ] M4 Les ruminations
- [ ] M5 La boule au ventre
- [ ] M6 Le sommeil
- [ ] M7 La nourriture, avec douceur
- [ ] M8 Quand être seule est difficile
- [ ] M9 Ta trousse de crise
- [ ] M10 Lectures recommandées
- [ ] M11 Quand demander de l'aide
- [ ] M12 Relecture de tous les modules

### Phase 5 — Finitions
- [ ] F1 Hors ligne testé (trousse au minimum)
- [ ] F2 Accessibilité (contrastes, cibles, navigation clavier)
- [ ] F3 Vérification des liens
- [ ] F4 Rendu mobile testé (captures)
- [ ] F5 README complet
- [ ] F6 Vérification du site publié (noindex sur chaque page)
- [ ] F7 Rapport final

## Décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-10-05 | Attribution désactivée via `attribution` (commit/pr vides, sessionUrl false) + `includeCoAuthoredBy: false` | Forme compatible avec la version installée (doc settings-reference) |
| 2026-10-05 | Hook `.githooks/commit-msg` (format Angular + mots interdits), activé par `core.hooksPath` | Garde-fou local en plus de la config |
| 2026-10-05 | Techno pressentie : Astro statique (détail dans `docs/decisions.md`, tâche S1) | Markdown simple, zéro JS par défaut, déploiement Pages officiel |
| 2026-10-05 | Sous-agents lancés via `general-purpose` + « lis `.claude/agents/<nom>.md` » si non chargés | Agents créés en cours de session |

## Blocages

Aucun.

## Reprise

- Prochaine action : lancer R1–R7 (chercheurs, branche `docs/research`) et S1–S2 (dev-site, branche `feat/site-skeleton`) en parallèle.
- Fichiers : `PROGRESS.md`, `research/*`.
- Branche active : `docs/research` (recherche) ; `feat/site-skeleton` (site, worktree). Si une fiche research/ manque ou est incomplète, relancer le chercheur correspondant.
