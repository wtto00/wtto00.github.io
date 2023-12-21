import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      pubDatetime: z.date(),
      title: z.string(),
      postSlug: z.string().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      labels: z.array(z.string()).default(['others']),
      ogImage: image()
        .refine((img) => img.width >= 1200 && img.height >= 630, {
          message: 'OpenGraph image must be at least 1200 X 630 pixels!',
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().url().optional(),
    }),
});

export const collections = { blog };
