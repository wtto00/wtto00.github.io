import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import { SITE } from './src/config';
import remarkToc from 'remark-toc';
import rehypeExternalLinks from 'rehype-external-links';
import remarkCollapse from 'remark-collapse';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import githubLightTheme from './scripts/github-light';

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  // Enable Solid to support Solid JSX components.
  integrations: [solid(), UnoCSS({ injectReset: true }), sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkToc, { tight: true, heading: 'contents', ordered: true } as Parameters<typeof remarkToc>[0]],
      [remarkCollapse, { test: 'Table of contents' } as Parameters<typeof remarkCollapse>[0]],
    ],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          headingProperties: {
            className: 'group break-all',
          },
          properties: {
            ariaHidden: 'true',
            tabIndex: -1,
            className: 'head-link',
          },
          content: {
            type: 'element',
            tagName: 'i',
            properties: {
              className: 'h-4 w-4 i-ri:links-fill inline-block',
            },
            children: [],
          },
        } as Parameters<typeof rehypeAutolinkHeadings>[0],
      ],
      rehypeAccessibleEmojis,
      [rehypeExternalLinks, { target: '_blank', rel: 'noreferrer' } as Parameters<typeof rehypeExternalLinks>[0]],
    ],
    shikiConfig: {
      wrap: true,
      experimentalThemes: {
        light: githubLightTheme,
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
