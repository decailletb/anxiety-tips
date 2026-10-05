# Relecture : modules 01 à 05 + page trousse

Fichiers relus : `site/src/content/modules/01-comprendre.md`, `02-signaux-precoces.md`, `03-pendant-la-crise.md`, `04-ruminations.md`, `05-boule-au-ventre.md`, `site/src/content/pages/trousse.md`.
Références : `docs/guide-direct.md`, `research/*.md`, `site/src/lib/journal.ts`.

## Verdict : VALIDÉ (après corrections)

Les six fichiers respectent les contraintes du projet. Les problèmes trouvés étaient simples et ont été corrigés directement. Deux points restent ouverts (voir en bas), aucun ne bloque.

## Checklist (10 points)

| # | Point | 01 | 02 | 03 | 04 | 05 | trousse |
|---|---|---|---|---|---|---|---|
| 1 | Ni psychothérapie ni médication | OK | OK | OK | OK | OK | OK |
| 2 | Aucun chiffre alimentaire | OK | OK (appétit en mots seulement) | OK | OK | OK | OK |
| 3 | Grossesse | OK | OK | OK (souffle sans pause, marche modérée, chaleur évitée) | OK | corrigé (filet de sécurité incomplet, voir plus bas) | OK |
| 4 | Ton | OK | OK | OK | OK | OK | OK |
| 5 | Pourquoi / Comment / Quand | OK | OK | OK | OK | OK | n/a |
| 6 | Sources | OK | OK | OK | OK | OK | n/a |
| 7 | Droit d'auteur | corrigé (léger) | OK | OK | corrigé (léger) | OK | OK |
| 8 | Vie privée | OK | OK | OK | OK | OK | OK |
| 9 | Lisibilité mobile | corrigé | corrigé | OK | OK | corrigé | OK |
| 10 | Section d'aide | OK (lien `../../aide/`) | n/a | OK | n/a | OK (un seul bloc de sécurité, renvoi vers l'aide) | OK (lien d'aide ajouté par `trousse.astro`) |

### Format des modules

Tous les modules ont : un frontmatter `title`/`order`/`summary`, puis `## En bref` → `## Exercices` (un `###` par exercice, avec Pourquoi / Comment / Quand) → `## À retenir` (3 à 5 puces) → `## Sources`.
- Nombre de puces dans « À retenir » : 01 = 4, 02 = 4, 03 = 4, 04 = 3, 05 = 4.
- La section `## Même sensation, autre sens` du module 05 est à sa place, entre « En bref » et « Exercices ».
- 05 : il manquait une ligne vide avant `## Sources`. Corrigé.

### Trousse

Les 7 actions de `trousse.md` sont identiques mot pour mot à la section « Ta trousse de crise » du guide. La ligne « Si la tête tourne, respire normalement. » est présente. La ligne « Si rien ne t'apaise depuis longtemps » du guide est remplacée par le lien d'aide de `trousse.astro`, ce qui est cohérent.

### Liens internes

Les modules sont servis à `/anxiety-tips/modules/<slug>/` (config : `base: '/anxiety-tips'`, `trailingSlash: 'always'`). Liens trouvés :
- `../../trousse/` (5 fois)
- `../../aide/` (2 fois)
- `../../journal/` (2 fois)
- `../../journal/imprimer/` (1 fois)

Toutes ces pages existent (`src/pages/trousse.astro`, `aide.astro`, `journal/index.astro`, `journal/imprimer.astro`). Les modules 01 à 05 ne contiennent aucun lien vers un autre module, donc il n'y a aucun slug à vérifier. Les dix slugs, de `01-comprendre` à `10-lectures`, existent bien.

### Journal (module 02) comparé à `journal.ts`

Avant la correction, le module annonçait pour l'appétit « comme d'habitude, moins, plus ». Les vraies réponses sont « Comme d'habitude / Moins / Très peu ». La liste reprend maintenant les vrais libellés des six questions :
- Sommeil : bien / moyen / difficile
- Ruminations : aucune / un peu / beaucoup
- Boule au ventre : aucune / un peu / beaucoup
- Appétit : comme d'habitude / moins / très peu
- Énergie : bonne / moyenne / basse
- « Seule aujourd'hui ? » : oui / non

Le champ de note s'appelle maintenant « Une note », comme dans le formulaire. L'expression « vue des 4 dernières semaines » est remplacée par « Mes dernières semaines », le titre réel de la vue. Celle-ci affiche bien 28 jours (`DAYS_SHOWN = 28` dans `public/local.js`).

## Corrections faites

1. **01, « En bref »** : les deux paragraphes signalés comme trop longs (phrases de 25 à 27 mots) sont découpés en phrases courtes, sur 4 petits paragraphes. « en un tap » est retiré (anglicisme).
2. **01, « Pourquoi » de « Nommer la vague »** : la phrase reprenait mot pour mot celle du module 05 et de la fiche research (« une phrase toute faite marche quand le raisonnement ne marche plus »). Elle est reformulée et découpée.
3. **02, étape 3 du journal** : la liste est alignée sur `journal.ts` (voir ci-dessus). « note » devient « Une note ».
4. **02, coup d'œil hebdomadaire** : la vue s'appelle « Mes dernières semaines », comme dans le journal.
5. **03, summary** : il annonçait « quatre outils » mais en citait cinq. Il suit maintenant les quatre exercices réels.
6. **04, « À retenir »** : la puce était identique à la fiche `research/ruminations.md`. Reformulée : « Chaque fois que tu reviens, ça compte. Même si la pensée repart. »
7. **05, filet de sécurité** : le texte avait perdu « forte, ou accompagnée d'autres signes », qui figure dans le guide validé. Ces critères de sécurité sont rétablis, en phrases courtes.
8. **05, « Quand » de « Main sur le ventre »** : la phrase sur la bouillotte (34 mots) est découpée en un court paragraphe. Ajout de « En cas de doute, demande à ta sage-femme », comme dans le guide et la fiche.
9. **05** : une ligne vide est ajoutée avant `## Sources`.

## Anti-plagiat (4 passages par module)

Les passages ont été comparés aux fiches `research/` et, pour les sources francophones, aux pages elles-mêmes. Les sources anglophones ne peuvent pas être recopiées telles quelles dans un texte français.

- **01** : 1) la phrase « C'est une vague. Elle monte, elle redescend. » est identique à la fiche. C'est une formule de crise très courte, gardée exprès pour rester cohérente avec la trousse : acceptable. 2) Le « Pourquoi » de « Nommer la vague » était identique au module 05 : reformulé. 3) Le passage sur la vague, comparé à la Commission de la santé mentale du Canada (« L'anxiété arrive par vagues… eaux plus calmes ») : idée commune, formulation différente. 4) Le passage sur l'alarme, comparé à Planète Santé (« système d'alarme… déréglé ») : formulation différente.
- **02** : 1) le plan « mes signaux → mes actions » suit la structure du guide et de la fiche (WRAP / mon GPS). Les intitulés reprennent les rubriques, ce qui relève d'une structure, pas d'une citation. 2) « Pourquoi » du journal : reformulé par rapport à la fiche. 3) La phrase « tu passes de "ça arrive sans prévenir" à "je reconnais quand ça commence" » est identique au guide validé, et c'est un texte interne : OK. 4) Le passage « observer, pas surveiller » est original.
- **03** : 1) « Revenir aux sens » comparé à la Commission de la santé mentale du Canada (« repérer au moins une chose que vous pouvez voir… ») : différent. 2) « Les sens n'existent qu'au présent » est une paraphrase de la fiche (« n'existent que maintenant »). 3) Le souffle doux est reformulé. La source canadienne propose une rétention de souffle, qui n'a pas été reprise : conforme à la contrainte grossesse. 4) « Écrire à quelqu'un » est reformulé par rapport à la fiche.
- **04** : 1) Une puce de « À retenir » était identique à la fiche : reformulée. 2) « Le rendez-vous des soucis », comparé à Atupri (« Notez brièvement… reportez consciemment… à 17 h 00, 20 minutes maximum ») : différent, et sans chiffre d'horaire. 3) La question « J'avance, ou je tourne ? » est une paraphrase très courte de la fiche ; Atupri formule trois questions différentes. 4) Le « Pourquoi » de « J'ai la pensée que… » est proche de la fiche dans l'idée, mais reformulé.
- **05** : 1) Les étapes de la « Carte d'identité » sont presque identiques à la fiche et au guide validé : ce sont des formules internes, sans source externe recopiée. 2) « Je connais cette sensation », comparé à Sana (« une sensation banale est lue comme un danger, l'alarme monte… ») : différent. 3) Le tableau est reformulé par rapport à la fiche. 4) « Surfer la vague » : la source est en anglais (Therapist Aid), aucune traduction littérale.

Les liens suivants ont été ouverts et répondent : Planète Santé, Commission de la santé mentale du Canada, Atupri, Sana. Toutes les autres sources des modules figurent dans le guide validé ou dans les fiches research.

## Points ouverts (à signaler, non bloquants)

1. **Guide et journal ne disent pas la même chose pour l'appétit.** `docs/guide-direct.md` (section « Repérer les signaux précoces ») et `research/signaux-precoces-et-trousse-de-crise.md` disent « comme d'habitude / moins / plus ». `journal.ts` dit « comme d'habitude / moins / très peu ». Le guide décrit aussi d'autres échelles, par exemple « tension ou ventre (calme / un peu / beaucoup) » et « ruminations (peu / moyen / beaucoup) ». Le module suit le code, qui est la référence demandée. À l'orchestrateur de décider s'il faut aligner le guide sur le code, ou l'inverse.
2. **Contacts dans le module 03 (vérifié, OK).** Le module dit : « prépare tes contacts sur la page trousse ». C'est exact : `trousse.astro` affiche `<MyContacts editable />`.
