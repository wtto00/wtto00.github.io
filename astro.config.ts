import { defineConfig } from 'astro/config';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import solid from '@astrojs/solid-js';
import sitemap from "@astrojs/sitemap";
import UnoCSS from 'unocss/astro'
import { SITE } from './src/config'
import remarkToc from 'remark-toc';
import remarkCollapse from "remark-collapse";
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
		// @ts-expect-error type error
		remarkPlugins: [rehypeHeadingIds, [remarkToc, { tight: true, ordered: true }], [remarkCollapse, { test: 'Table of contents' }]],
		rehypePlugins: [
			// @ts-expect-error type error
			rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }], rehypeAccessibleEmojis
		],
		shikiConfig: {
			theme: 'one-dark-pro',
			wrap: true
		}
	},
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
