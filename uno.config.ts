import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss'
import type { Theme } from '@unocss/preset-uno'
import presetTheme from 'unocss-preset-theme'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import transformerCompileClass from '@unocss/transformer-compile-class'

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      cdn: 'https://esm.sh/',
      customizations: {
        iconCustomizer(collection, icon, props) {
          if (collection === 'custom') {
            props.fill = 'currentColor'
          }
        }
      },
      collections: {
        custom: {
          search: '<svg viewBox="0 0 24 24"><path d="M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>'
        }
      }
    }),
    presetTheme({
      selectors: { dark: ':root.dark' },
      theme: {
        dark: {
          colors: {
            fill: 'rgb(33, 39, 55)',
            base: 'rgb(234, 237, 243)',
            accent: 'rgb(255, 107, 1)',
            card: 'rgb(52, 63, 960)',
            'card-muted': 'rgb(138, 51, 2)',
            border: '171, 75, 8'
          }
        }
      }
    })
  ],
  content: { filesystem: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"] },
  theme: {
    breakpoints: {
      sm: '640px'
    },
    fontFamily: {
      mono: "IBM Plex Mono, monospace"
    },
    colors: {
      fill: 'rgb(251, 254, 251)',
      base: 'rgb(40, 39, 40)',
      accent: 'rgb(0, 108, 172)',
      card: 'rgb(230, 230, 230)',
      'card-muted': 'rgb(205, 205, 205)',
      border: 'rgb(236, 233, 233)',
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
        }`
      },
      durations: {
        'wave-hands': '2.5s',
        'blink-text-cursor': '0.8s'
      },
      timingFns: {
        'wave-hands': 'linear',
        'blink-text-cursor': 'linear'
      },
      counts: {
        'wave-hands': 'infinite',
        'blink-text-cursor': 'infinite'
      }
    }
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass()
  ],
})