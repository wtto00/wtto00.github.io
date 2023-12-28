import { getCollection } from 'astro:content';
import Fuse from 'fuse.js';

import getSortedPosts from '@/utils/getSortedPosts';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = getSortedPosts(posts).map((post) => post.data);

  const postsIndex = Fuse.createIndex(['title', 'description'], sortedPosts);

  return new Response(JSON.stringify({ posts: sortedPosts, index: postsIndex.toJSON() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
