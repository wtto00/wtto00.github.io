import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import { SITE } from './src/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
export default defineConfig({
	site: SITE.website,
	base: SITE.base,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		solid(),
		sitemap()
	],
	markdown: {
		// @ts-ignore
		remarkPlugins: [remarkToc, [remarkCollapse, { test: 'Table of contents' }]],
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
	scopedStyleStrategy: 'where'
});
