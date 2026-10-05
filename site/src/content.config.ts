import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Modules de la formation : un fichier Markdown par module dans src/content/modules/.
// En-tête obligatoire : title, order (position dans la liste), summary (une phrase).
const modules = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    summary: z.string(),
  }),
});

// Pages fixes (trousse de crise, aide) : contenu éditable en Markdown dans src/content/pages/.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { modules, pages };
