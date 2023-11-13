import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import { SITE } from './src/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: SITE.website,
	integrations: [tailwind({
		applyBaseStyles: false,
	}), solid(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'one-dark-pro',
			wrap: true
		}
	},
	scopedStyleStrategy: 'where'
});
