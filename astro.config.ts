import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkCollapse from 'remark-collapse'
import remarkToc from 'remark-toc'
import UnoCSS from 'unocss/astro'

import githubLightTheme from './scripts/github-light'
import { SITE } from './src/config'

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  prefetch: {
    // 启用了<ViewTransitions />,默认prefetchAll: true
    defaultStrategy: 'viewport',
  },
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
            ariaLabel: 'Copy link',
            className: 'head-link',
          },
          content: {
            type: 'element',
            tagName: 'i',
            properties: {
              className: 'h-4 w-4 i-ri:links-fill inline-block v-mid',
              'aria-hidden': 'true',
            },
            children: [],
          },
        } as Parameters<typeof rehypeAutolinkHeadings>[0],
      ],
      [rehypeExternalLinks, { target: '_blank', rel: 'noreferrer' } as Parameters<typeof rehypeExternalLinks>[0]],
    ],
    shikiConfig: {
      wrap: true,
      themes: {
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
})
