# Relecture : recadrage v2 (cohérence guide + modules + pages)

Date : 2026-10-05. Fichiers relus : `docs/guide-direct.md`, `site/src/content/modules/01` à `10`, `site/src/content/pages/trousse.md`, `aide.md`.
Référence prioritaire : `research/cadrage-v2.md`.

## Verdict : VALIDÉ

Les corrections ci-dessous ont été faites directement. Il ne reste aucun point bloquant.

## Checklist

| Point | Statut |
|---|---|
| 1. Pas de thérapie ni de médicament | OK |
| 2. Aucun chiffre alimentaire | OK (« environ une journée » sans manger ni boire, dans la section aide : seuil de sécurité, pas une règle alimentaire) |
| 3. Compatibilité grossesse | OK (souffle sans rétention, bouillotte tiède, marche douce, pas de plantes, tisanes ni somnifères) |
| 4. Ton | OK. Vocabulaire d'état aigu retiré (voir plus bas) |
| 5. Pourquoi / Comment / Quand | OK partout |
| 6. Sources | OK, une section par module |
| 7. Droit d'auteur | OK, uniquement de la paraphrase |
| 8. Vie privée | OK |
| 9. Lisibilité mobile | Corrigée (phrases longues coupées) |
| 10. Section d'aide | OK. Guide et `aide.md` cohérents (143, 144, urgences psy du canton, médecins de garde, sage-femme) |
| Cadrage v2 : crise = mode rumination | OK après corrections |
| Grossesse | OK : uniquement des lignes « sage-femme » ; aucun symptôme ; aucune ressource périnatale |
| Trousse identique | OK : guide, `pages/trousse.md` et sous-liste du module 09 (sans gras) reprennent le texte mot pour mot. Phrase finale présente dans le guide et dans la page, et dans « À retenir » du module 09 |
| Format des modules | OK : En bref → Exercices → À retenir → Sources ; 10 : Les livres ; 05 : « Même sensation, autre sens » |
| Liens internes | OK : `../<slug>/`, `../../trousse/`, `../../aide/`, `../../journal/` (et `../../journal/imprimer/`). `aide.md` ne contient pas de lien vers la trousse : rien à corriger |

## Corrections faites

### Guide (`docs/guide-direct.md`)
- **Ancres fragiles** : les liens `#quand-être-seule-est-difficile` (×2) et `#une-sensation-deux-sens--nausées-et-boule-au-ventre` sont remplacés par des renvois textuels (« voir la section … »). Les ancres ASCII sont gardées : `#ta-trousse`, `#les-ruminations`, `#le-rendez-vous-soucis`, `#bouger-doucement`.
- **Faim** : « C'est la tension qui met la faim en veille » devient « L'anxiété met la faim en pause ». Les étapes deviennent : « Je connais cette sensation. L'anxiété met la faim en pause. » puis « C'est temporaire. Ça revient quand ça se calme. ». L'introduction et « À retenir » sont harmonisés de la même façon.
- **Sage-femme** : l'étape redondante « C'est ma sage-femme qui suit ça » est retirée de « Lâcher la vérification ». Restent l'encadré d'ouverture et « À retenir ».
- **Journal des deux minutes** : les cases suivent maintenant celles du journal du site (ruminations et boule au ventre : aucune, un peu, beaucoup). « Quand : en dehors des crises » devient « chaque jour, au même moment. Pendant une phase, garde-le court » (comme le module 02).
- **Vocabulaire** : « Si la peur de ne pas dormir monte » devient « revient ».
- **Lisibilité** : l'encadré « Deux habitudes… » (plus de 45 mots) est découpé en liste. La phrase de renvoi de « La boule au ventre » et l'étape 1 de la carte « moments seule » sont raccourcies.

### Modules
- **01** : « la boule au ventre qui monte » devient « qui revient ».
- **02, 07** : « rendez-vous des soucis » devient « rendez-vous soucis », le même nom partout.
- **03** : « pas maintenant, à 18 h » devient « Pas maintenant. À mon rendez-vous. », la même phrase que dans le guide et le module 04. Le `summary` est raccourci.
- **05** : le vocabulaire « alarme » est aligné sur le guide (« tension »). Changements :
  - « Ma boule de tension » ;
  - « Quand je rumine, mon corps se tend et la digestion ralentit » ;
  - « C'est de la tension, pas un danger » ;
  - « Elle va et vient » ;
  - « Surfer la vague » devient « Laisser passer la vague », avec « Elle est passée. » à la fin.
- **07** : le titre et les phrases suivent le guide (« L'anxiété met la faim en pause » / « C'est temporaire »). Le lien vers l'aide (« garder ce que tu manges ») devient « Si tu n'arrives plus à manger ni boire ». Cela correspond à `aide.md` et ne sous-entend plus de symptôme.
- **08** : « Je suis dans un moment » devient « Je suis dans une phase » (comme le guide).

## Doublons (vérifiés)
- Le rendez-vous soucis est complet dans 03 et 04. Ailleurs, il n'y a que des renvois courts (02, 07). Les formulations sont cohérentes.
- « J'ai la pensée que… » est un exercice complet dans 01 et 04. Dans 07, ce n'est qu'une application courte avec un renvoi. Acceptable.
- Repérer le mode et « J'avance, ou je tourne en rond ? » : dans 01 et 04, avec des étapes cohérentes.

## Points ouverts (non bloquants)
- Les sources « Leeds Teaching Hospitals NHS – Pregnancy FAQs » (guide, module 05) et « NHS – Exercise in pregnancy » (guide) restent. Ce sont des justifications de sécurité (chaleur, marche), pas des ressources proposées à la lectrice. On peut les retirer si l'on veut zéro mention visible de la grossesse.
- La vague (« Elle monte, puis elle redescend ») garde le verbe « monter ». C'est la métaphore de la vague, pas du vocabulaire d'urgence.
- Aucune opération git n'a été faite.
