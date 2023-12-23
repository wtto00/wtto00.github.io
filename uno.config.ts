import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss';
import type { Theme } from '@unocss/preset-uno';
import presetTheme from 'unocss-preset-theme';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import { colorAddOpacity } from './scripts/uno-utils';

export default defineConfig<Theme>({
  presets: [
    presetUno({ preflight: false }),
    presetTypography(),
    presetIcons({
      cdn: 'https://esm.sh/',
      customizations: {
        iconCustomizer(collection, _icon, props) {
          if (collection === 'custom') {
            props.fill = 'currentColor';
          }
        },
      },
      collections: {
        custom: {
          search:
            '<svg viewBox="0 0 24 24"><path d="M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>',
          topic:
            '<svg viewBox="0 0 24 24"><path d="M16.018 3.815L15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"/></svg>',
          back: '<svg viewBox="0 0 24 24"><path d="M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"/></svg>',
          rss: '<svg viewBox="0 0 24 24"><path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z"/><path d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z"/><circle cx="6" cy="18" r="2"/></svg>',
          'arrow-left':
            '<svg viewBox="0 0 24 24"><path d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"/></svg>',
          'arrow-right':
            '<svg viewBox="0 0 24 24"><path d="M11.293 17.293l1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"/></svg>',
          github:
            '<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>',
          email:
            '<svg viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5l-8-5h16m0 12H4V8l8 5l8-5v10Z"/></svg>',
          calendar:
            '<svg viewBox="0 0 24 24"><path d="M9 10v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2m2-7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2h1m0 16V8H5v11h14M9 14v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2Z"/></svg>',
        },
      },
    }),
    presetTheme<Theme>({
      selectors: { dark: ':root.dark' },
      theme: {
        dark: {
          colors: {
            fill: 'rgb(33, 39, 55)',
            base: 'rgb(234, 237, 243)',
            accent: 'rgb(255, 107, 1)',
            card: 'rgb(52, 63, 96)',
            'card-muted': 'rgb(138, 51, 2)',
            brd: 'rgb(171, 75, 8)',
          },
        },
      },
    }),
  ],
  content: {
    filesystem: ['./**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  },
  theme: {
    breakpoints: {
      xs: '320px',
      ds: '375px',
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1536px',
    },
    colors: {
      fill: 'rgb(251, 254, 251)',
      base: 'rgb(40, 39, 40)',
      accent: 'rgb(0, 108, 172)',
      card: 'rgb(230, 230, 230)',
      'card-muted': 'rgb(205, 205, 205)',
      brd: 'rgb(236, 233, 233)',
    },
    animation: {
      keyframes: {
        'wave-hands': `{
          0%, 60%, 100% { transform: rotate(0); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }`,
        'blink-text-cursor': `{
          0% { border-right-color: currentColor; }
          100% { border-right-color: transparent; }
        }`,
      },
      durations: {
        'wave-hands': '2.5s',
        'blink-text-cursor': '0.8s',
      },
      timingFns: {
        'wave-hands': 'linear',
        'blink-text-cursor': 'linear',
      },
      counts: {
        'wave-hands': 'infinite',
        'blink-text-cursor': 'infinite',
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
  preflights: [
    {
      layer: 'root',
      getCSS: () => `:root {
        --un-translate-x: 0;
        --un-translate-y: 0;
        --un-translate-z: 0;
        --un-rotate: 0;
        --un-rotate-x: 0;
        --un-rotate-y: 0;
        --un-rotate-z: 0;
        --un-skew-x: 0;
        --un-skew-y: 0;
        --un-scale-x: 1;
        --un-scale-y: 1;
        --un-scale-z: 1;
      }`,
    },
    {
      layer: 'typography',
      getCSS: ({ theme }) => `.prose-wtto {
        --un-prose-body: ${theme.colors?.base};
        --un-prose-headings: ${theme.colors?.base};
        --un-prose-links: ${theme.colors?.base};
        --un-prose-lists: ${theme.colors?.base};
        --un-prose-hr: ${colorAddOpacity(theme.colors?.base, 0.2)};
        --un-prose-captions: ${theme.colors?.base};
        --un-prose-code: ${theme.colors?.base};
        --un-prose-borders: ${theme.colors?.brd};
        --un-prose-bg-soft: ${theme.colors?.fill};
      }`,
    },
  ],
});
