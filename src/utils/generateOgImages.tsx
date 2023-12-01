import { renderToSvg, type SatoriOptions } from "solid-satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import { readFileSync } from 'node:fs'
import { URL } from 'node:url'

const fontBasePath = import.meta.env.DEV ? '../assets/fonts' : '../../../src/assets/fonts'

const fetchFonts = async () => {
  const fontRegular: ArrayBuffer = readFileSync(new URL(`${fontBasePath}/ibm-plex-mono.regular.ttf`, import.meta.url))
  const fontBold: ArrayBuffer = readFileSync(new URL(`${fontBasePath}/ibm-plex-mono.bold.ttf`, import.meta.url))

  const notoSansSCRegular: ArrayBuffer = readFileSync(new URL(`${fontBasePath}/noto-sans-sc.regular.ttf`, import.meta.url))
  const notoSansSCBold: ArrayBuffer = readFileSync(new URL(`${fontBasePath}/noto-sans-sc.bold.ttf`, import.meta.url))

  return { fontRegular, fontBold, notoSansSCRegular, notoSansSCBold };
};

const { fontRegular, fontBold, notoSansSCRegular, notoSansSCBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
    {
      name: 'Noto Sans SC',
      data: notoSansSCRegular,
      weight: 400,
      style: 'normal'
    },
    {
      name: 'Noto Sans SC',
      data: notoSansSCBold,
      weight: 600,
      style: 'normal'
    }
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await renderToSvg(() => postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await renderToSvg(() => siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
