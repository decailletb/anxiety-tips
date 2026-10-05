# PROGRESS

## Statut global

- Phase en cours : **terminé** (100 %) — recadrage v2 et thème jour en ligne ; seules les captures restent à rafraîchir (F8)
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
- [x] F7 Rapport final
- [~] F8 Rafraîchir `docs/screenshots/` avec le contenu recadré (les captures actuelles montrent l'ancien contenu)

### Phase 6 — Recadrage demandé par l'utilisateur
- [x] C1 Règles + brief `research/cadrage-v2.md` (anxiété non liée à la grossesse ; crise = mode rumination en continuant à fonctionner)
- [x] C2 Réécriture guide + modules + trousse + aide (branche `docs/rumination-reframe`)
- [x] C3 Relecture du recadrage
- [~] C4 Thème clair « jour » par défaut, mode nuit optionnel (branche `fix/mobile-a11y-polish`)

## Décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-10-05 | Runs de déploiement bloqués (job `deploy` sans runner ~40 min) : annulés puis relancés via `gh workflow run deploy.yml --ref main` → OK | Incident côté runners GitHub, aucune règle bloquante dans l'environnement `github-pages` |
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

- Prochaine action : F8 — refaire les captures mobiles (390 px, thème jour + 1–2 en mode nuit) du site publié avec le contenu recadré, remplacer `docs/screenshots/*`, mettre à jour la liste dans `docs/qa-report.md`. Ensuite : rien d'obligatoire (voir « Idées d'amélioration »).
- Fichiers : `docs/screenshots/`, `docs/qa-report.md`.
- Branche active : `main`.

## Rapport final

**Site :** https://decailletb.github.io/anxiety-tips/ (non indexé : `noindex, nofollow` vérifié sur les 15 pages publiées + 404, pas de sitemap).
**Guide :** [docs/guide-direct.md](docs/guide-direct.md).

### Ce qui a été fait
- Recherche FR + EN : 7 fiches sourcées dans `research/` (ruminations, sensations / boule au ventre, nourriture, sommeil, être seule, signaux précoces, ressources suisses + livres), contrôle croisé sécurité et liens.
- Livrable 1 : guide complet, relu deux fois, recadré selon le retour de l'utilisateur (`research/cadrage-v2.md`) : l'anxiété n'est pas liée à la grossesse ; une « crise » = un mode où l'on reste bloquée à ruminer en continuant à fonctionner. Trousse de 7 actions orientées « décrocher de la boucle ».
- Site Astro 7 statique : 10 modules (format En bref / Exercices Pourquoi-Comment-Quand / À retenir / Sources), page Trousse en un tap (bouton fixe sur chaque page), page Aide (numéros suisses vérifiés le 5 octobre 2026), Journal des signaux 100 % local (export/import, vue 4 semaines, grille imprimable), jusqu'à 3 contacts personnels stockés uniquement sur le téléphone.
- Hors ligne : service worker qui met en cache toutes les pages ; testé sur le site publié.
- Thème clair « jour » par défaut, mode nuit optionnel ; accessibilité (0 violation axe, cibles ≥ 48 px, contrastes AA) ; espaces insécables françaises.
- CI : build + vérifications bloquantes (noindex, pas de sitemap, aucune ressource externe, liste hors ligne, liens internes et ancres) avant chaque déploiement.
- Conventions : commits Angular, aucune attribution (config + hook `commit-msg`), branches par lot fusionnées dans `main`.

### Limites connues
- Si un déploiement reste « queued » longtemps : `gh run cancel <id>` puis `gh workflow run deploy.yml --ref main`.
- Tests navigateur faits avec Chromium uniquement (pas de Safari iOS réel ni de lecteur d'écran).
- Le journal et les contacts vivent dans le navigateur : effacés si les données du site sont effacées ou en navigation privée (export fichier + grille papier proposés).
- Un `robots.txt` de site de projet n'est pas lu par les robots ; la non-indexation repose sur la balise meta (voir `docs/decisions.md`). Le repo étant public, son contenu reste lisible sur GitHub.
- Numéros d'aide vérifiés le 5 octobre 2026 : à revérifier de temps en temps.
- Quelques sources scientifiques sont citées via résumé (pages éditeur bloquées) ; signalé dans les fiches.
- Les icônes gardent l'ancien vert sauge.
- Durée typique d'une phase inconnue : le module « Vivre pendant une phase » reste formulé pour quelques jours comme pour plusieurs semaines.

### Idées d'amélioration
- Laisser l'utilisatrice réécrire sa trousse directement sur le site (stockage local), en plus de la version par défaut.
- Rappel doux optionnel pour le « rendez-vous soucis » (notification locale de la PWA).
- Petit minuteur pour le rendez-vous soucis et pour « laisser passer la vague ».
- Test sur un vrai iPhone et ajustements Safari si besoin.
- Icônes aux couleurs du thème jour.
- Version audio courte de 2–3 exercices (enregistrée par une voix familière).
