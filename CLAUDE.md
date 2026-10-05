# Règles permanentes du projet

Projet : guide Markdown (`docs/guide-direct.md`) + petit site « formation » personnel (GitHub Pages, non indexé) pour aider **une personne** à mieux **traverser** ses crises d'anxiété (ruminations, boule au ventre, sommeil, nourriture, difficulté à rester seule). La personne est enceinte, mais son anxiété **n'a rien à voir avec la grossesse** (elle existait avant) : la grossesse n'est qu'un filtre de sécurité sur les techniques, jamais un thème. Pays : **Suisse**. Langue du contenu : **français**, tutoiement.

Ce fichier suffit à un agent neuf pour reprendre le travail. Lire ensuite `PROGRESS.md`.

## 1. Procédure de reprise (à suivre à chaque nouvelle session)

1. Lire ce fichier, puis `PROGRESS.md` (sections « Statut », « Tâches », « Reprise »).
2. `git status`, `git log --oneline -15`, `git branch -a`, `git fetch`.
3. Se placer sur la branche active indiquée dans « Reprise » (sinon `main`).
4. Vérifier la config locale : `git config core.hooksPath .githooks` et `git config push.autoSetupRemote true` (sinon un `git push` sans upstream échoue).
5. Terminer ou refaire la tâche marquée « en cours ». Puis continuer le plan **sans poser de question** à l'utilisateur (sauf blocage réel : accès, permission, décision irréversible).

## 2. Gestion des sessions (coupure possible à tout moment)

- Tâches de 20–30 min max, chacune laissant le repo cohérent.
- Avant une tâche : la marquer « en cours » dans `PROGRESS.md`, commit.
- Après une tâche : commit + push immédiat, `PROGRESS.md` à jour (fait, décisions, prochaine étape exacte).
- Jamais de travail important non commité. Les sous-agents écrivent leurs résultats dans des fichiers, jamais seulement dans la conversation.
- Session longue / limite proche : finir ou mettre en pause proprement, mettre à jour « Reprise », push, s'arrêter.

## 3. Conventions Git (strictes)

- Commits Angular, en anglais, impératif : `type(scope): description`. Types : feat, fix, docs, test, chore, refactor, style, ci, build, perf.
- Branches : `type/description-kebab-case` (ex. `docs/sleep-module`).
- Une branche par lot cohérent ; fusion dans `main` par l'agent une fois relu et build vert, avec `git merge --no-ff -m "<message conventionnel>"`. Si fusion impossible : PR + note dans `PROGRESS.md`.
- **INTERDIT** dans commits, PR, noms de branches : toute attribution (`Co-Authored-By`, « Generated with … »), toute mention de l'outil ou de son éditeur. Pour parler de ce fichier dans un message de commit, écrire « agent instructions » ; pour le dossier de config, « agent config ».
- Garde-fous : `.claude/settings.json` (attribution vide) + hook `.githooks/commit-msg` (format Angular + mots interdits). Activer avec `git config core.hooksPath .githooks`. Vérifier `git log` après chaque lot. Ne jamais réécrire l'historique déjà poussé sur `main`.

## 4. Contraintes de contenu (non négociables)

1. **Ni psychothérapie ni médication** proposées (déjà essayées, hors sujet).
2. **Pas de cours théorique.** Techniques actives, concrètes, utilisables **pendant** la crise quand la logique ne marche plus. Pour chaque outil : **pourquoi** (adapté à ce profil), **comment** (étapes courtes), **quand** (avant / pendant / après).
3. **Nourriture et poids** : qualitatif et bienveillant uniquement. **Aucun** chiffre, calorie, pesée, plan alimentaire, règle de quantité.
4. **Grossesse = filtre de sécurité silencieux, pas un thème.** Ne pas présenter l'anxiété comme liée à la grossesse ; pas de liste de symptômes de grossesse, pas de ressources périnatales, pas de livre sur la naissance ; mentionner la grossesse le moins possible (une ligne quand c'est utile). Tout doit être compatible. Exclure ou signaler : respiration avec rétention prolongée, hyperventilation, froid/chaleur intenses (eau glacée, sauna, bain très chaud), efforts intenses, compléments, plantes, tisanes « calmantes », huiles essentielles. Pour corps / appétit / poids : renvoyer en une ligne à la **sage-femme ou au/à la gynécologue** (suivi de grossesse, pas de la thérapie).
5. **Filet de sécurité** : une seule section courte et calme « Quand demander de l'aide rapidement », numéros suisses **vérifiés en ligne** (voir `research/ressources-suisse.md`).
6. **Droit d'auteur** : paraphrase uniquement, aucune reproduction de passage protégé, sources (liens) en fin de module.
7. **Vie privée (repo PUBLIC)** : aucun prénom, aucune donnée identifiante, aucun détail médical personnel. On s'adresse à « toi » sans raconter d'histoire personnelle. Ne jamais copier le brief initial dans le repo.

Ton : tutoiement, chaleureux, direct, rassurant, **jamais alarmant**. Phrases courtes. Langage du quotidien.

**Ce qu'est une « crise » ici (essentiel)** : pas un état aigu ni une incapacité. C'est un **mode** dans lequel elle se retrouve **bloquée à ruminer**, pendant une phase, **tout en continuant à fonctionner** (travail, quotidien). Les outils visent donc à **décrocher de la boucle** au fil de la journée et à continuer de vivre pendant la phase, pas à gérer une urgence. Ton calme et quotidien, pas de vocabulaire d'urgence (« si la tête tourne », « en pleine crise tu ne peux plus rien faire »…).

Profil à garder en tête (formulé sans détail identifiant) : anxiété ancienne, par phases, centrée sur les ruminations ; fonctionnement déjà compris rationnellement, mais en crise « la logique ne marche plus » ; boule au ventre ; difficulté à être seule ; tension autour du sommeil et de la nourriture (peur de ne pas manger sans faim, peur de perdre du poids) ; pas d'anxiété sociale ni de crise de panique ; déclencheur de début de crise inconnu. Piste clé (un exemple, pas le cœur du sujet) : une sensation digestive inquiète beaucoup alors que des nausées de grossesse n'ont pas inquiété → travailler le **sens attribué** à la sensation (connue/expliquée vs inconnue, attendue vs menaçante, contrôle), étiquetage, « je connais cette sensation ».

## 5. Structure du repo

- `docs/guide-direct.md` — Livrable 1 (base de contenu du site).
- `docs/decisions.md` — choix techniques et alternatives écartées.
- `research/` — fiches de synthèse sourcées (paraphrase + liens), une par thème.
- `site/` — site Astro (voir `README.md`). Contenu des modules en Markdown dans `site/src/content/modules/`.
- `.claude/agents/` — sous-agents : `chercheur`, `redacteur`, `dev-site`, `relecteur`.
- `.github/workflows/` — déploiement GitHub Pages.

## 6. Sous-agents

Si les types d'agents personnalisés ne sont pas chargés dans la session (créés en cours de session), lancer un agent `general-purpose` avec la consigne : « Lis `.claude/agents/<nom>.md` et applique-le strictement » + la tâche bornée (entrées, sorties, fichiers).

## 7. Non-indexation du site

`<meta name="robots" content="noindex, nofollow">` sur toutes les pages, pas de sitemap, pas d'analytics/traqueurs, pas de polices externes. `robots.txt` **sans** `Disallow` (sinon les robots ne voient pas le noindex) — justification dans `docs/decisions.md`.
