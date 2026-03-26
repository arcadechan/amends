import { defineCollection } from 'astro/content/config';
import { glob, file } from 'astro/loaders'
import { z } from 'astro/zod';

const hero = z.object({
    src: z.url(),
    alt: z.string().optional(),
    fit: z.enum(['cover', 'contain']).optional(),
    overlay: z.object({
        color: z.string(),
        opacity: z.number().min(0).max(1).optional(),
        mix: z.enum([
            'color',
            'screen',
            'lighten',
            'color-dodge',
            'color-burn',
            'soft-light',
            'difference',
            'exclusion',
            'luminosity'
        ]).optional()
    }).optional(),
    attribution: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
    }).optional()
})

const title = z.object({
    title: z.string(),
    type: z.enum(['bars-below-text', 'bars-behind-text']),
    size: z.enum(['normal', 'large']),
})

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title,
        subtitle: z.string().optional(),
        slug: z.string().slugify(),
        hero,
    })
});

export const collections = { blog }