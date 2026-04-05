import { defineCollection } from 'astro/content/config';
import { glob } from 'astro/loaders'
import { z } from 'astro/zod';
import type { ImageFunction } from 'astro/content/config';

const homepage = defineCollection({
    loader: glob({ base: './src/content/homepage', pattern: '**/*.{yaml,md}' }),
    schema: z.object({
        blocks: z.array(
            z.discriminatedUnion('discriminant', [
                // Post Card Grid
                z.object({
                    discriminant: z.literal('postCardGrid'),
                    value: z.object({
                        mobileColumns: z.number().min(1).max(4),
                        desktopColumns: z.number().min(1).max(4),
                        posts: z.array(z.string())
                    })
                }),

                // Heading
                z.object({
                    discriminant: z.literal('heading'),
                    value: z.object({
                        text: z.string(),
                        type: z.enum(['h1', 'h2', 'h2', 'h3', 'h4', 'h5', 'h6'])
                    })
                })
            ])
        ).optional()
    })
})

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
        color: z.string().optional(),
        opacity: z.number().min(0).max(1).optional(),
        mix: z.enum([
            'none',
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

const pages = defineCollection({
    loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx,mdoc}' }),
    schema: ({ image }) => z.object({
        draft: z.boolean().default(false),
        title: z.string(),
        titleSettings,
        hero: hero(image)
    })
});

const media = defineCollection({
    loader: glob({ base: './src/content/media', pattern: '**/*.{yaml,yml}' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        asset: image()
    })
})

export const collections = {
    homepage,
    settings,
    blog,
    pages,
    media
}