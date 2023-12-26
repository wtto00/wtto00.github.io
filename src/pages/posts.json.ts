import { getCollection } from 'astro:content';
import Fuse from 'fuse.js';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).map((post) => post.data);

  const postsIndex = Fuse.createIndex(['title', 'description'], posts);

  return new Response(JSON.stringify({ posts, index: postsIndex.toJSON() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
