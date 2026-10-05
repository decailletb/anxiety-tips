// Questions du journal des signaux précoces (une seule source pour /journal/ et la grille papier).
// `value` est ce qui est enregistré (ne pas changer sans migrer les données déjà saisies).
// `tone` : 0 = plutôt calme, 1 = un peu, 2 = plus difficile, 'info' = simple information.
// Aucun chiffre, aucun score : seulement des mots.

export type Tone = 0 | 1 | 2 | 'info';

export interface Option {
  value: string;
  label: string;
  tone: Tone;
}

export interface Question {
  id: string;
  legend: string; // question affichée
  short: string; // nom court dans « Mes dernières semaines »
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 'sommeil',
    legend: 'Sommeil',
    short: 'Sommeil',
    options: [
      { value: 'bien', label: 'Bien', tone: 0 },
      { value: 'moyen', label: 'Moyen', tone: 1 },
      { value: 'difficile', label: 'Difficile', tone: 2 },
    ],
  },
  {
    id: 'ruminations',
    legend: 'Ruminations',
    short: 'Ruminations',
    options: [
      { value: 'aucune', label: 'Aucune', tone: 0 },
      { value: 'un-peu', label: 'Un peu', tone: 1 },
      { value: 'beaucoup', label: 'Beaucoup', tone: 2 },
    ],
  },
  {
    id: 'ventre',
    legend: 'Boule au ventre',
    short: 'Ventre',
    options: [
      { value: 'aucune', label: 'Aucune', tone: 0 },
      { value: 'un-peu', label: 'Un peu', tone: 1 },
      { value: 'beaucoup', label: 'Beaucoup', tone: 2 },
    ],
  },
  {
    id: 'appetit',
    legend: 'Appétit',
    short: 'Appétit',
    options: [
      { value: 'habituel', label: 'Comme d’habitude', tone: 0 },
      { value: 'moins', label: 'Moins', tone: 1 },
      { value: 'tres-peu', label: 'Très peu', tone: 2 },
    ],
  },
  {
    id: 'energie',
    legend: 'Énergie',
    short: 'Énergie',
    options: [
      { value: 'bonne', label: 'Bonne', tone: 0 },
      { value: 'moyenne', label: 'Moyenne', tone: 1 },
      { value: 'basse', label: 'Basse', tone: 2 },
    ],
  },
  {
    id: 'seule',
    legend: 'Seule aujourd’hui ?',
    short: 'Seule',
    options: [
      { value: 'non', label: 'Non', tone: 'info' },
      { value: 'oui', label: 'Oui', tone: 'info' },
    ],
  },
];

export const NOTE_MAX = 280;
