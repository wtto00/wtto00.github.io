/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * document.startViewTransition 新特性，ts暂不包括
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
 */
interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition: (callback: () => void) => ViewTransition
}

declare module "remark-collapse" {
  import type { RemarkPlugin } from "@astrojs/markdown-remark"
  const remarkCollapse: RemarkPlugin
  export default remarkCollapse
}
