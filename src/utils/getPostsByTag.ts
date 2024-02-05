import type { CollectionEntry } from 'astro:content'

import { slugifyAll } from './slugify'

const getPostsByTag = (posts: CollectionEntry<'blog'>[], tag: string) =>
  posts.filter((post) => slugifyAll(post.data.tags).includes(tag))

export default getPostsByTag
