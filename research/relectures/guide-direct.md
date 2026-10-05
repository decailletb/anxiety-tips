# Relecture — `docs/guide-direct.md` (Livrable 1)

Date : 2026-10-05. Relecture selon `.claude/agents/relecteur.md` + `CLAUDE.md`, plus les décisions de l'orchestrateur.

**Verdict : VALIDÉ** (après les corrections ci-dessous ; points ouverts mineurs, sans blocage).

## Checklist

| # | Point | Statut | Détail |
|---|---|---|---|
| 1 | Ni psychothérapie ni médication | OK | Aucun « consulte un psy », « traitement ». Seuls renvois : sage-femme, gynéco, maternité, lignes d'aide. |
| 2 | Aucun chiffre alimentaire | OK | Pas de quantité, portion, pesée ni fréquence de repas. Le repère « environ une journée sans garder aliments ni liquides » est une durée, validé par l'orchestrateur. Journal : appétit en qualitatif seulement. |
| 3 | Compatibilité grossesse | Corrigé | Trousse : « eau fraîche sur les mains » retirée (évite toute ambiguïté avec le froid). Souffle sans pause partout ; bouillotte tiède, couverte, pas sur le ventre ; marche à rythme modéré ; glaçon, restriction de sommeil, rétention et respiration rapide signalés comme « à sauter ». Aucune tisane, plante, huile essentielle ni complément. |
| 4 | Ton | OK | Tutoiement, chaleureux, non culpabilisant, jamais alarmant. |
| 5 | Orientation action | OK | Chaque outil (h4) a Pourquoi / Comment / Quand. Partie théorique limitée à « Comprendre tes crises en 1 minute ». |
| 6 | Sources | OK | Section présente, classée par module. 11 liens ouverts : 143.ch, santepsy.ch/urgences, CHUV hygiène du sommeil, Atupri, Commission santé mentale Canada, Sana évitement, Équipe Nutrition, Planète Santé, Psycom, Pittsburgh OCD, mySleepButton. Tous répondent. |
| 7 | Droit d'auteur | Corrigé | Voir la comparaison ci-dessous : 2 passages reformulés. |
| 8 | Vie privée | OK | Aucun prénom, lieu, date ni récit personnel. Section 3 : formulation générale (« tu as peut-être remarqué… »), aucun détail personnel ajouté. CHUV/HUG non nommés comme lieu de suivi. |
| 9 | Lisibilité mobile | Corrigé | « Lectures recommandées » : chaque livre découpé en sous-puces (Pour / Commence par), paragraphe « À sauter » transformé en liste. Puce « inquiétude corps/grossesse » de la section d'aide raccourcie. |
| 10 | Section d'aide | Corrigé | Un seul bloc calme. Numéros conformes à `research/ressources-suisse.md` (144, 143 avec chat, maternité, sage-femme, médecins de garde par canton, Periparto « pas une ligne de crise »). Ligne ajoutée sur les urgences psychiatriques par canton. |

## Décisions de l'orchestrateur appliquées

1. **« à froid » → « un jour calme » / « quand ça va »** : 2 occurrences remplacées (« Ta carte moments seule », « À retenir » de la section Être seule). Plus aucune occurrence. Une tournure maladroite corrigée aussi dans les lectures (« quelques jours un jour calme » → « quelques jours, quand ça va »).
2. **Urgences psychiatriques cantonales** : une ligne calme ajoutée dans « Quand demander de l'aide rapidement » : « Pour des idées noires, en plus du 143 et du 144, tu peux appeler les urgences psychiatriques de ton canton (liste sur santepsy.ch) ». Le lien santepsy.ch/urgences répond et liste bien les numéros par canton (vérifié le 2026-10-05).
3. **Repère « environ une journée »** : conservé tel quel.
4. **Nausées en section 3** : formulation générale, aucun détail personnel. OK.
5. **Trousse de crise** : réécrite, chaque action en ≤ 8 mots, sans rétention de souffle, sans eau :
   1. Nomme la vague : « C'est l'anxiété. Elle redescend. »
   2. Inspire doux, souffle plus long, sans pause.
   3. Main sur le ventre : « Je connais cette sensation. »
   4. Nomme cinq choses que tu vois.
   5. Occupe tes mains, ou marche un peu.
   6. Écris à quelqu'un : « Tu peux m'appeler ? »
   7. Fais la prochaine petite chose. Une seule.
   + « Si la tête tourne, respire normalement. »
6. **Ancres internes** :
   - `#le-contraste-nausées--boule-au-ventre` (accent + double tiret) → remplacé par un renvoi textuel (« voir la section … plus haut »).
   - `#quand-demander-de-laide-rapidement` (apostrophe, slug variable selon le moteur) → remplacé par un renvoi textuel (« va à la section … tout en bas du guide »).
   - Ancres conservées, simples et sans accents : `#ta-trousse-de-crise` (×4), `#bouger-doucement`, `#les-ruminations`.
7. **Livres** : Ex Libris Harris (Pocket 2026, CHF 16.40), Ladouceur (Odile Jacob, CHF 14.40) et Putois/Chapoutot (CHF 41.70) répondent et correspondent. Bardacke : la 3e édition (2022, ISBN 9782702921456) existe, mais aucune fiche vérifiable n'a été trouvée (Ex Libris 404, Payot 403/429 aux robots). Le lien Payot de l'édition précédente est donc gardé, avec une note dans le guide : la 3e édition se commande en librairie avec l'ISBN.
8. **Anti-plagiat** : 10 passages comparés aux sources (voir ci-dessous).

## Comparaison anti-plagiat (10 passages)

| Passage du guide | Source comparée | Résultat |
|---|---|---|
| Intro Sommeil (« Plus on cherche à dormir… ») | CHUV, hygiène du sommeil | Paraphrase OK |
| Phrase de nuit « Je dors sûrement plus que je ne le crois » | CHUV (« L'on dort davantage qu'on ne le croit ») | **Trop proche → reformulé** : « J'ai sûrement dormi plus que je ne pense. » |
| Encadré « Pour la personne qui t'accompagne » : « Je ne vais pas répondre encore une fois, mais je reste avec toi » | Pittsburgh OCD (« I'm not going to answer that, but I can sit with you… ») | **Traduction trop proche → reformulé** : « Cette question, on l'a déjà vue. Moi, je reste là. » |
| Rendez-vous des soucis / « Est-ce que j'avance » | Atupri | Paraphrase OK |
| Trousse / « une vague monte et redescend » | Commission santé mentale Canada | Paraphrase OK (et leur respiration avec rétention n'est pas reprise) |
| Petits moments seule (« éviter… soulage sur le moment ») | Sana, évitement | Paraphrase OK |
| « Assez bien, pas parfait » | Équipe Nutrition | Paraphrase OK, pas de chiffre repris |
| Mélange de mots | mySleepButton (Beaudoin) | Paraphrase OK, exemple personnel (BALCON) |
| Comprendre tes crises en 1 minute | Planète Santé | Aucune reprise |
| Eau sur les poignets | Psycom (eau froide) | Retirée de la trousse |

## Points ouverts (non bloquants)

- Bardacke : remplacer le lien par la fiche de la 3e édition si Ex Libris ou Payot en publie une (à vérifier à la main dans un navigateur).
- Les liens d'ancre restants (`#ta-trousse-de-crise`, `#bouger-doucement`, `#les-ruminations`) dépendent du découpage du site en modules : à revérifier dans le build Astro (dev-site).
- Revérifier tous les numéros juste avant la mise en ligne (comme indiqué en fin de guide).
