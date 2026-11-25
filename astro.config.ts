import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://dajomar.com';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: {
        name: 'dajomar',
        type: 'dark',
        settings: [
          { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8fd19e' } },
          { scope: ['string', 'string.quoted'], settings: { foreground: '#79c0ff' } },
          { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#ff7b72' } },
          { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#d2a8ff' } },
          { scope: ['variable', 'entity.name.variable'], settings: { foreground: '#f2f2f2' } },
          { scope: ['constant.numeric'], settings: { foreground: '#79c0ff' } },
          { scope: ['entity.name.tag'], settings: { foreground: '#7ee787' } },
          { scope: ['entity.other.attribute-name'], settings: { foreground: '#79c0ff' } },
        ],
        colors: {
          'editor.background': '#1b1d1f',
          'editor.foreground': '#f2f2f2',
        },
      },
    },
  },
});
