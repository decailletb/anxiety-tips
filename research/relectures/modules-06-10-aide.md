# Relecture : modules 06 à 10 et page aide

Date : 2026-10-05. Relecteur : agent `relecteur`.
Fichiers : `site/src/content/modules/06-sommeil.md`, `07-nourriture.md`, `08-etre-seule.md`, `09-trousse-de-crise.md`, `10-lectures.md`, `site/src/content/pages/aide.md`.
Références : `docs/guide-direct.md`, `research/sommeil.md`, `nourriture-et-poids.md`, `etre-seule.md`, `signaux-precoces-et-trousse-de-crise.md`, `livres.md`, `ressources-suisse.md`.

## Verdict : VALIDÉ (après corrections)

Aucun point bloquant ne reste. Deux points ouverts sont signalés plus bas, hors des fichiers relus.

## Checklist

| # | Point | 06 | 07 | 08 | 09 | 10 | aide |
|---|---|---|---|---|---|---|---|
| 1 | Ni psychothérapie ni médication | OK | OK | OK | OK | OK | OK |
| 2 | Aucun chiffre alimentaire | OK | corrigé (balance : renvoi au suivi, sans chiffre) | OK | OK | OK | OK (« environ une journée » = durée, validé dans ressources-suisse) |
| 3 | Compatibilité grossesse | OK (pas de restriction de sommeil, pas de produit) | OK | OK | OK | OK (glaçon, rétention et restriction du temps au lit écartés) | OK |
| 4 | Ton | OK | OK | OK | OK | OK | corrigé (144 réservé au danger) |
| 5 | Pourquoi / Comment / Quand | OK | OK | OK | OK | n/a (`## Les livres`, validé) | n/a |
| 6 | Sources (liens testés) | OK | OK | OK | OK (Beck : 403 anti-robot) | OK (Payot : 429 anti-robot, connu) | OK |
| 7 | Droit d'auteur | corrigé (reformulations) | corrigé | corrigé | OK | OK | OK |
| 8 | Vie privée | OK | OK | OK | OK | OK | OK (aucun hôpital nommé) |
| 9 | Lisibilité mobile (≤ ~25 mots) | corrigé | OK | corrigé | OK | OK | corrigé |
| 10 | Section d'aide conforme | n/a | n/a | n/a | n/a | n/a | corrigé |

Format module (frontmatter, En bref → Exercices → À retenir 3–5 puces → Sources) : conforme pour les cinq modules. Pour 10-lectures, `## Les livres` remplace `## Exercices`, comme validé.

Liens internes : tous corrects. Autre module : `../04-ruminations/`, `../05-boule-au-ventre/`, `../02-signaux-precoces/` (ids issus des noms de fichiers, module présent). Trousse : `../../trousse/`. Aide : `../../aide/`. Sur la page aide, `../trousse/` est correct (`trailingSlash: 'always'`).

Liens externes : 46 URL testées. 43 répondent 200. Beck Institute répond 403 et payot.ch 429 : ce sont des blocages anti-robot, déjà notés dans `research/livres.md`.

## Vérification en ligne (2026-10-05)

- **143** (143.ch/fr) : « de jour comme de nuit », anonyme et confidentiel, avec téléphone, chat et e-mail. Aucun horaire de chat affiché, donc la page aide ne promet pas de chat 24 h/24. Conforme.
- **144** (CHUV, Centrale 144) : mission « 24/24H », pour les urgences vitales. santepsy.ch confirme le 144 dans toute la Suisse et donne les numéros psy cantonaux, identiques à la fiche. Conforme.

## Corrections faites

**06-sommeil**
- Trois passages reformulés car trop proches de la fiche `research/sommeil.md` : carnet étape 1, mélange de mots étapes 2–3, intention paradoxale étape 3.
- Encadré final coupé en deux phrases courtes (le lendemain / confort physique → sage-femme ou gynéco).

**07-nourriture**
- « Lâcher la vérification », selon la décision de l'orchestrateur. « Monter sur la balance » est ajouté parmi les vérifications à lâcher. Une phrase suit : « Tu n'as pas à te peser toi-même : le suivi du poids pendant la grossesse, c'est le rôle de ta sage-femme ou de ton/ta gynécologue. » Aucun chiffre.
- Le « Quand » reprend le guide : « Avant : si ça t'aide, range ce qui facilite la vérification. »
- L'encadré reprend les deux pensées du guide : « perdre du poids » / « nuire au bébé ».
- Le texte du lien est aligné sur le titre de la page : « Quand demander de l'aide ».
- « Assez bien » : le « Pourquoi » est reformulé, car il était identique à la fiche.

**08-etre-seule**
- Encadré « Pour la personne qui t'accompagne » : le `###` est remplacé par une ligne en gras, pour qu'il n'apparaisse plus dans le sommaire. L'encadré est déplacé en fin de `## Exercices`, après le dernier exercice. `## À retenir` est donc de nouveau suivi directement de `## Sources`.
- Une ligne vide est ajoutée entre « **Comment :** » et chaque liste, comme dans les autres modules.
- Carte étape 1 coupée (28 mots → deux phrases).
- « Présence à distance » : le « Pourquoi » est reformulé, car il était trop proche de la fiche.

**09-trousse-de-crise**
- Contacts : le composant `MyContacts` accepte 3 contacts au maximum. Le texte proposait « deux ou trois personnes + sage-femme + maternité », soit jusqu'à 5. Il devient « jusqu'à trois contacts : une proche, ta sage-femme, ta maternité ».
- Écran d'accueil : la consigne est simplifiée. « Ajouter à l'écran d'accueil » (sur iPhone : bouton de partage, puis « Sur l'écran d'accueil ») ; la page s'ouvre alors en un tap, même sans connexion.
- Le lien vers `../02-signaux-precoces/` est vérifié. Son texte devient « le module Repérer les signaux précoces ».
- Mention « stockés seulement sur ton téléphone » : conforme au composant (« Enregistrés seulement sur ce téléphone »).

**10-lectures** : aucune correction. Le contenu est conforme à `research/livres.md` et au guide.

**aide.md**
- « Si tu ne peux plus tenir » est réorganisé selon `research/ressources-suisse.md`. Idées noires ou impression de ne plus tenir → 143 (jour et nuit) ou urgences psychiatriques du canton. Danger pour la vie ou la santé, ou idée de passer à l'acte → 144. Avant, tout était regroupé sous le 144, ce qui était plus alarmant et moins fidèle à la fiche.
- Deux puces « Ton corps ou ta grossesse » coupées en phrases courtes (35 mots → moins de 25).
- Periparto : ajout de « certains jours de la semaine » (horaires réels : mardi, mercredi et vendredi). La mention « ce n'est pas une ligne de crise » est conservée.
- Aucun hôpital nommé. Numéros et horaires conformes à la fiche. Page courte, ton calme.

## Anti-plagiat (4 passages par module comparés aux fiches research)

- 06 : carnet, mélange, intention paradoxale, se lever. Trois étaient quasi identiques à la fiche, ils sont reformulés. « Se lever » est assez différent.
- 07 : étiquetage faim, assez bien, aliments refuge, vérification. Deux sont reformulés (assez bien, vérification). Les autres sont des phrases courtes et génériques.
- 08 : carte, présence à distance, rituel, encadré proche. Présence à distance est reformulée. L'encadré paraphrase des sources en anglais (Pittsburgh, Psychology Today), sans reprise littérale.
- 09 : réécrire, sous la main, contacts, principes de la carte. Paraphrase de principes généraux (WRAP, mon GPS, Beck), sans reprise littérale.
- 10 : fiches livres. Descriptions courtes et originales, sans citation des ouvrages.

Les fiches research sont elles-mêmes des paraphrases. Aucun passage ne reproduit une source protégée.

## Points ouverts (hors fichiers relus)

1. **`docs/guide-direct.md`, section « Quand demander de l'aide rapidement »** : elle regroupe toujours idées noires, impression de ne plus tenir et danger sous le 144. Il faut la synchroniser avec la nouvelle version de `aide.md` (143 / urgences psy du canton d'un côté, 144 pour le danger de l'autre). Le guide n'a pas été modifié ici, car il ne fait pas partie des fichiers listés.
2. **`site/src/pages/aide.astro`** : le composant `<MyContacts />` est rendu après tout le Markdown, donc après les sources. Son titre « Mes contacts » fait aussi doublon avec la section « Tes contacts » du Markdown. À voir avec `dev-site` : soit supprimer la section « Tes contacts » du Markdown, soit placer le composant à cet endroit.
