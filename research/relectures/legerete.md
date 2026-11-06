# Relecture : légèreté et évitement

Périmètre : `site/src/content/modules/12-quand-ca-revient.md`, section « Ton message pour toi » de `09-trousse-de-crise.md`, section « Quand ça revient, avec légèreté » de `docs/guide-direct.md` (+ sources), texte visible de `site/src/components/MyMessage.astro`. Source de vérité : `research/legerete-et-evitement.md`.

## Checklist

| # | Point | Statut |
|---|---|---|
| 1 | Ni psychothérapie ni médication | OK |
| 2 | Aucun chiffre alimentaire | OK (rien sur la nourriture) |
| 3 | Compatibilité grossesse | OK (aucune respiration retenue, rien d'intense ; grossesse non mentionnée) |
| 4 | Ton | corrigé (voir plus bas) |
| 5 | Pourquoi / Comment / Quand | OK sur chaque outil |
| 6 | Sources | OK ; liens ouverts : UniDistance, Archive ouverte UNIGE (Samson & Gross), JCU (Wang et al.), Patient.info — tous répondent et correspondent |
| 7 | Droit d'auteur | OK (paraphrase de la fiche, aucune citation longue) |
| 8 | Vie privée | OK (aucun récit, aucun détail identifiant ; message stocké en local seulement) |
| 9 | Lisibilité mobile | corrigé (deux paragraphes trop longs découpés) |
| 10 | Section d'aide | non concerné (aucun bloc d'aide ajouté ; pas de doublon) |

## Corrections faites

Module 12 :
- « En bref » : premier paragraphe découpé en deux.
- « repenser à une phase ou en parler ne la déclenche pas » → « … ce n'est pas la déclencher » ; « la garde menaçante » → « garde le sujet menaçant » (référent ambigu).
- « Salut, toi. Je t'ai reconnu. » → « Je te reconnais. » (2 occurrences) : évite le conflit d'accord boucle (féminin) / surnom (masculin ou féminin selon le choix).
- Surnom : ajout de la précaution de la fiche (« S'il commence à sonner moqueur, change-le pour un nom plus doux ») pour limiter le risque d'invalidation.
- Message de toi à toi : « Ils font reproche » → « Ils sonnent comme un reproche » ; paragraphe « Quand » découpé.
- « C'est de vérifier… » → « C'est de constater… » (cohérence : ailleurs, vérifier = comportement de la boucle).
- À retenir : « Repenser à une phase n'en déclenche pas une » (affirmation absolue, en tension avec « coïncidence possible ») → « Penser n'est pas déclencher. Tes notes « prédiction contre réalité » te le montrent, petit à petit. »

Guide direct :
- Intro découpée ; « la boucle prend la place pour raisonner » → « prend la place qui sert à raisonner ».
- « Je t'ai reconnu » → « Je te reconnais » ; ajout « S'il sonne moqueur, change-le. »
- Escalier : ajout « du plus facile au moins facile » et « Refais une marche plusieurs fois avant la suivante » (manquait par rapport au module).
- « jamais pendant une phase » → « pas pendant une phase » (ton moins catégorique, aligné sur le module) ; ajout « Si une marche est trop haute, redescends d'une marche. »

MyMessage.astro :
- « Tu les retrouveras quand la boucle revient » → « … reviendra » (concordance des temps).

Trousse (section « Ton message pour toi ») : rien à corriger. Placement « sous les sept lignes » vérifié dans `trousse.astro` ; « en grand » cohérent avec le CSS `.message-phrase`.

## Points laissés

- `research/legerete-et-evitement.md` garde « Je t'ai reconnu » (fiche de recherche, non modifiée) ; à aligner si on veut une cohérence totale.
- « Garde ces notes ensemble […] dans la case « Une note » de ton journal » : la note du journal est par jour (280 caractères max), donc les prédictions seront dispersées par date. Acceptable, mais un carnet papier ou une note téléphone pourrait être cité en premier.
- Sources du module : Samson et al. 2014 et l'extrait ACT Made Simple (cités par la fiche pour la bande-son et la limite de la défusion ludique) ne sont pas listés. Non bloquant.
- Pas de build lancé (relecture de contenu uniquement).

## Verdict

VALIDÉ (après corrections).
