import { slugifyAll } from './slugify';
import type { CollectionEntry } from 'astro:content';

const getPostsByTag = (posts: CollectionEntry<'blog'>[], tag: string) =>
  posts.filter((post) => slugifyAll(post.data.labels).includes(tag));

export default getPostsByTag;
