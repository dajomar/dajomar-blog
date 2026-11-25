import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cheatsheets' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    label: z.string(),
    category: z.enum(['fundamentos', 'devsecops', 'soporte-ti']),
    tags: z.array(z.string()),
    icon: z.string(),
    pdf: z.string(),
    updated: z.coerce.date(),
    order: z.number(),
  }),
});

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cheatsheets, articulos };
