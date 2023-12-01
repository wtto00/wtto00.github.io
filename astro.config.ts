import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import { SITE } from './src/config';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  // Enable Solid to support Solid JSX components.
  integrations: [solid(), UnoCSS({ injectReset: true }), sitemap()],
  markdown: {
    remarkPlugins: [
      rehypeHeadingIds,
      [remarkToc, { tight: true, ordered: true }],
      [remarkCollapse, { test: 'Table of contents' }],
    ],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }], rehypeAccessibleEmojis],
    shikiConfig: {
      wrap: true,
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
