# PROGRESS

## Statut global

- Phase en cours : **5 — finitions** (≈ 85 %)
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
- [x] R4 `sommeil.md` (compatible grossesse)
- [x] R5 `etre-seule.md`
- [x] R6 `signaux-precoces-et-trousse-de-crise.md` (journal, patterns, ancrage, respiration douce)
- [x] R7 `ressources-suisse.md` (numéros vérifiés) + `livres.md` (disponibles en Suisse, FR)
- [x] R8 Contrôle croisé grossesse sur toutes les fiches + vérifier liens non ouverts (R2 : PDF Russ Harris, Shortform, Lieberman 2007)

### Phase 2 — Livrable 1 (`docs/guide-direct.md`)
- [x] G1 Plan + trousse de crise + section aide
- [x] G2 Sections ruminations, boule au ventre, contraste nausées
- [x] G3 Sections nourriture/poids, sommeil, être seule
- [x] G4 Signaux précoces + journal + livres
- [x] G5 Relecture (relecteur) + corrections

### Phase 3 — Squelette du site (parallèle à phase 2)
- [x] S1 `docs/decisions.md` (techno, robots, alternatives)
- [x] S2 Astro init dans `site/`, layout, thème doux, mode sombre, noindex
- [x] S3 Bouton fixe + page trousse de crise
- [x] S4 Workflow GitHub Actions → Pages, premier déploiement vérifié
- [x] S5 Service worker + manifest (hors ligne)
- [x] S6 Journal des signaux (localStorage) + version imprimable

### Phase 4 — Modules (rédacteurs en parallèle + relecture)
- [x] M1 Comprendre tes crises
- [x] M2 Repérer les signaux précoces
- [x] M3 Pendant la crise
- [x] M4 Les ruminations
- [x] M5 La boule au ventre
- [x] M6 Le sommeil
- [x] M7 La nourriture, avec douceur
- [x] M8 Quand être seule est difficile
- [x] M9 Ta trousse de crise
- [x] M10 Lectures recommandées
- [x] M11 Quand demander de l'aide
- [x] M12 Relecture de tous les modules

### Phase 5 — Finitions
- [x] F1 Hors ligne testé (trousse au minimum)
- [x] F2 Accessibilité (contrastes, cibles, navigation clavier)
- [x] F3 Vérification des liens
- [x] F4 Rendu mobile testé (captures)
- [x] F5 README complet
- [x] F6 Vérification du site publié (noindex sur chaque page)
- [ ] F7 Rapport final

### Phase 6 — Recadrage demandé par l'utilisateur
- [x] C1 Règles + brief `research/cadrage-v2.md` (anxiété non liée à la grossesse ; crise = mode rumination en continuant à fonctionner)
- [x] C2 Réécriture guide + modules + trousse + aide (branche `docs/rumination-reframe`)
- [~] C3 Relecture du recadrage
- [~] C4 Thème clair « jour » par défaut, mode nuit optionnel (branche `fix/mobile-a11y-polish`)

## Décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-10-05 | Recadrage : grossesse = filtre de sécurité seulement ; crise = mode rumination, pas d'urgence ; Periparto et Bardacke retirés ; nouvelle trousse orientée « décrocher » | Retour de l'utilisateur |
| 2026-10-05 | Thème clair « jour » par défaut, sombre en option manuelle | Retour de l'utilisateur |
| 2026-10-05 | Attribution désactivée via `attribution` (commit/pr vides, sessionUrl false) + `includeCoAuthoredBy: false` | Forme compatible avec la version installée (doc settings-reference) |
| 2026-10-05 | Hook `.githooks/commit-msg` (format Angular + mots interdits), activé par `core.hooksPath` | Garde-fou local en plus de la config |
| 2026-10-05 | Techno pressentie : Astro statique (détail dans `docs/decisions.md`, tâche S1) | Markdown simple, zéro JS par défaut, déploiement Pages officiel |
| 2026-10-05 | Sous-agents lancés via `general-purpose` + « lis `.claude/agents/<nom>.md` » si non chargés | Agents créés en cours de session |
| 2026-10-05 | Aide rapide : « ne plus garder aliments ni liquides depuis environ une journée » (repère NHS grossesse) | Durée, pas quantité alimentaire ; plus sûr que « plusieurs jours » |
| 2026-10-05 | Pas de maternité nommée dans le contenu publié : « la maternité où tu es suivie » + numéro perso stockable en local sur le site | Vie privée (repo public), évite de révéler une région |

## Blocages

Aucun.

## Reprise

- Prochaine action : F1/F2/F4 (test hors ligne, accessibilité, captures mobiles) sur branche `fix/mobile-a11y-polish` (worktree dev-site), puis F7 rapport final. Si la branche n'existe pas : relancer dev-site pour ces tâches.
- Fichiers : `PROGRESS.md`, `research/*`.
- Branche active : `main` ; `fix/mobile-a11y-polish` pour F1/F2/F4.
