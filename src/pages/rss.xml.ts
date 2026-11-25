import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const cheatsheets = await getCollection('cheatsheets');
  const articles = await getCollection('articulos', ({ data }) => !data.draft);

  const items = [
    ...cheatsheets.map(cs => ({
      title: cs.data.title,
      description: cs.data.description,
      pubDate: cs.data.updated,
      link: `/recursos/${cs.id}/`,
    })),
    ...articles.map(a => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: `/articulos/${a.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items,
  });
}
