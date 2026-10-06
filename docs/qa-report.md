# Rapport QA : mobile, accessibilité, hors ligne

Date : 2026-10-05. Branche : `fix/mobile-a11y-polish`.

## Méthode

- Playwright (Chromium 151), installé hors du repo. Aucun outil ajouté aux dépendances du site.
- Viewports : **390×844** (iPhone) et **360×780** (Android), `isMobile` + tactile.
- Thèmes testés : clair « jour » (par défaut) et mode nuit (option manuelle).
- 15 pages : accueil, trousse, aide, journal, grille papier, modules 01 à 10. Le journal et les contacts sont pré-remplis avec des données factices pour afficher les pastilles.
- Mesures automatiques :
  - `scrollWidth <= innerWidth` ;
  - espace entre la fin du pied de page et le bouton fixe, page défilée tout en bas ;
  - cibles tactiles < 48 px (hors liens dans le texte) ;
  - hiérarchie des titres, un seul `h1`, `lang` ;
  - axe-core (règles WCAG 2.0/2.1/2.2 A et AA + bonnes pratiques).
- Contrôle manuel : tabulation au clavier, `prefers-reduced-motion`, rendu de chaque capture.
- Deux passages :
  1. sur le site **publié**, avant les corrections ;
  2. sur le build local de la branche (`astro preview`), après les corrections.

## Résultats

### F4 : rendu mobile

**Avant** (site publié) :
- Aucun débordement horizontal.
- Bouton fixe : 65 px de marge sous le pied de page sur toutes les pages, il ne masque rien.
- Problèmes vus sur les captures :
  - le tableau du module 05 n'avait aucun style (colonnes collées, pas de bordures, peu lisible) ;
  - l'encadré « Pour la personne qui t'accompagne » (module 08) n'était pas visible comme encadré : simple retrait du navigateur, qui perdait 80 px de largeur ;
  - le texte du pied de page touchait le bord gauche de l'écran ;
  - des guillemets « » et des « : » se retrouvaient seuls en début de ligne, jusque sur la trousse.

**Après** : 60 mesures sur 60 OK (15 pages × 2 tailles × 2 thèmes).
- Pas de débordement.
- Marge sous le dernier contenu : 65 px.
- Corps du texte à 19 px.
- Tableau lisible à 360 px : colonnes égales, bordures, en-tête teinté, texte qui passe à la ligne.

### F2 : accessibilité

**Avant** :
- axe : `region` (modéré, le bouton trousse était hors de tout repère) sur toutes les pages.
- axe : `scrollable-region-focusable` (**sérieux**) sur la grille papier.
- Bouton « Hier » du journal : 46 px de large.

**Après** : **0 violation axe** sur les 15 pages, en clair et en nuit.
- Cibles tactiles : toutes ≥ 48 px. Le bouton trousse fait 64 px de haut, l'interrupteur « Mode nuit » 48 px.
- Focus : contour de 3 px visible sur chaque élément tabulé.
- Ordre de tabulation : lien d'évitement → accueil → Journal → **Trousse de crise** → contenu.
- `lang="fr"` présent ; titres sans saut de niveau, un seul `h1` par page.
- Contrastes AA vérifiés par axe et par calcul :
  - texte 12.9:1 ;
  - texte secondaire ≥ 5.8:1, y compris sur les pastilles du journal ;
  - liens 6.5:1 ;
  - bouton trousse 9.8:1, bordure 3.2:1 sur le fond.
- `prefers-reduced-motion` : défilement doux désactivé et animations coupées (vérifié).

### F1 : hors ligne (site publié)

- Service worker actif après la première visite : 20 fichiers en cache.
- Hors ligne, rechargement puis navigation : tout fonctionne (OK).
  - Pages testées : accueil, trousse, aide, journal, grille papier, modules 03, 05 et 08.
- Bouton trousse : visible dans l'écran sur chaque page (64 px de haut). Un tap depuis un module ouvre `/trousse/`, aussi hors ligne.
- Même test refait sur le build de la branche : OK.

### Thème « jour » (demande ajoutée en cours de lot)

- Clair par défaut, **même avec le téléphone en mode sombre** (vérifié).
- Interrupteur « Mode nuit » dans le pied de page : choix mémorisé, appliqué avant l'affichage, aucun flash.
- Sans JavaScript : thème clair, interrupteur masqué (vérifié).
- Détails dans `docs/decisions.md`, section 8.

## Corrections apportées (code et CSS uniquement, aucun fichier de contenu modifié)

1. Tableaux de modules stylés pour mobile. Encadrés (`>`) en carte pleine largeur. Marge latérale du pied de page rétablie. Bouton de jour du journal ≥ 48 px.
2. Bouton trousse placé dans un repère `<nav>`, juste après l'en-tête (atteint tôt au clavier, toujours affiché fixe en bas). Grille papier défilable rendue focalisable (`tabindex`, `role="region"`).
3. Espaces insécables de la typographie française ajoutées au build (`site/integrations/fr-spaces.mjs`, sans dépendance). Elles ne touchent ni les scripts, ni les styles, ni le code.
4. Légende des couleurs du journal : espace manquante rétablie.
5. Thème « jour » lumineux par défaut et mode nuit manuel. `theme-color` et manifeste mis à jour.

## Captures (`docs/screenshots/`)

Refaites le 2026-10-06 sur le **site publié** (https://decailletb.github.io/anxiety-tips/), contenu recadré (« mode rumination », thème jour par défaut, module 11). Chromium, service worker bloqué (contenu frais vérifié : la trousse contient « mode rumination »), écran visible (pas la page entière), facteur 2, PNG compressés (< 60 Ko chacun). Les anciennes captures ont été supprimées.

390 × 844 sauf mention contraire :
- **Jour** : `accueil-390-jour.png`, `accueil-390-jour-bas.png` (bas de la liste, module 11 visible), `trousse-390-jour.png`, `aide-390-jour.png`, `journal-390-jour.png`, `m01-390-jour.png`, `m03-390-jour.png`, `m04-390-jour.png`, `m05-390-jour.png` (tableau « Même sensation, autre sens »), `m07-390-jour.png`, `m11-390-jour.png`.
- **Nuit** (interrupteur manuel, `vague-theme=dark`) : `accueil-390-nuit.png`, `trousse-390-nuit.png`.
- **Jour à 360 × 780** : `trousse-360-jour.png`.

## Limites connues

- Chromium seulement : Safari iOS et Firefox Android n'ont pas été testés sur un vrai téléphone.
- axe ne remplace pas un test avec lecteur d'écran (VoiceOver, TalkBack).
- Captures du dossier `docs/screenshots/` : refaites le 2026-10-06 sur le site publié (contenu recadré, thème jour).
- Les icônes (`favicon.svg`, PNG) gardent le vert sauge de l'ancien thème.
- Les consignes de l'agent site (`.claude/agents/dev-site.md`) parlent encore de « mode sombre via `prefers-color-scheme` ». À aligner sur la décision de la section 8.
- Contenu : aucun problème de rendu lié au Markdown lui-même. Le tableau du module 05 et l'encadré du module 08 rendent bien avec le nouveau CSS, sans modification du texte.
