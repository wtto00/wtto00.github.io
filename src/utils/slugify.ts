import type { CollectionEntry } from 'astro:content'
import { slug as slugger } from 'github-slugger'

export const slugifyStr = (str: string) => slugger(str || '')

export const slugify = (post: CollectionEntry<'blog'>['data']) =>
  post.postSlug ? slugger(post.postSlug || '') : slugger(post.title || '')

export const slugifyAll = (arr: string[]) => arr.map((str) => slugifyStr(str || ''))

export function str2unicode(input: string) {
  return input
    .split('')
    .map(function (value) {
      const temp = value.charCodeAt(0).toString(16).toUpperCase()
      if (temp.length > 2) {
        return `u_${temp}`
      }
      return value
    })
    .join('')
}

export const unicodeSlugify = (str: string) => str2unicode(slugifyStr(str))
