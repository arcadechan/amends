import { defineCollection } from 'astro/content/config';
import { glob } from 'astro/loaders'
import { z } from 'astro/zod';
import type { ImageFunction } from 'astro/content/config';

const settings = defineCollection({
    loader: glob({ base: './src/content/settings', pattern: '**/*.{yaml,md}' }),
    schema: z.object({
        motto: z.string().optional(),
        navigation: z.array(
            z.object({
                label: z.string(),
                path: z.string(),
                active: z.boolean().default(true)
            })
        ),
        socials: z.object({
            soundcloud: z.string().optional(),
            github: z.string().optional(),
            spotify: z.string().optional()
        })
    })
})

const hero = (image: ImageFunction) => z.object({
    image: image(),
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

const titleSettings = z.object({
    type: z.enum(['bars-below-text', 'bars-behind-text']),
    size: z.enum(['normal', 'large']),
})

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: ({ image }) => z.object({
        draft: z.boolean().default(false),
        title: z.string(),
        titleSettings,
        subtitle: z.string().optional(),
        publicationDate: z.coerce.date().optional(),
        hero: hero(image)
    })
});

export const collections = {
    settings,
    blog
}