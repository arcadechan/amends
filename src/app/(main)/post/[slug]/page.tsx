import { client } from 'tina/__generated__/client'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPlaiceholder } from 'plaiceholder'
import dynamicComponent from 'next/dynamic'
import BlogPostLoading from './BlogPostLoading'
import getMetadataBase from '@/lib/metadata'
import path from 'node:path'
import fs from 'node:fs/promises'
import { cookies } from 'next/headers'

export const revalidate = 2628002 // Seconds in one month

type BlogPostProps = {
  params: {
    slug: string
  }
}

const fallbackBase64 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

const getPostData = cache(async (slug: string) => {
  return await client.queries.post({ relativePath: `${slug}.mdx` })
})

export const generateMetadata = async ({ params }: BlogPostProps): Promise<Metadata> => {
  const {
    data: { post }
  } = await getPostData(params.slug)

  const title = `${post.title} | Amends`
  const description = post.description || ''
  const metadataBase = getMetadataBase()

  return {
    title,
    description,
    metadataBase,
    openGraph: {
      type: 'article',
      title,
      url: metadataBase,
      description,
      publishedTime: post.publishDate,
      section: post.category,
      images: [`${metadataBase}/${post?.heroImage}`]
    }
  }
}

const getBlogPost = cache(async (slug: BlogPostProps['params']['slug']) => {
  const queryResponse = await getPostData(slug)

  let imageBlurDataURL = ''
  if (queryResponse.data?.post?.heroImage) {
    let buffer: Buffer | undefined = undefined

    const NEXT_PUBLIC_USE_LOCAL_CLIENT = process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || '0'

    if (NEXT_PUBLIC_USE_LOCAL_CLIENT === '0') {
      buffer = await fetch(queryResponse.data.post.heroImage).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      )
    } else {
      buffer = await fs.readFile(path.join('./public', queryResponse.data.post.heroImage))
    }

    if (buffer) {
      const { base64 } = await getPlaiceholder(buffer, { size: 10 }).catch(() => ({
        base64: fallbackBase64
      }))

      imageBlurDataURL = base64
    } else {
      imageBlurDataURL = fallbackBase64
    }
  }

  return {
    query: queryResponse.query,
    variables: queryResponse.variables,
    data: queryResponse.data,
    imageBlurDataURL
  }
})

const BlogPost = dynamicComponent(() => import('./BlogPost'), {
  ssr: false,
  loading: () => <BlogPostLoading />
})

export default async function Page({ params }: BlogPostProps) {
  const post = await getBlogPost(params?.slug)
  const theme = cookies().get('theme')

  return (
    <BlogPost
      {...post}
      {...{ theme: theme?.value || 'light' }}
    />
  )
}
