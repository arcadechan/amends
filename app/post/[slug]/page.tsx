import BlogPost from './BlogPost'
import { client } from '../../../.tina/__generated__/client'
import { cache } from 'react'
import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 2628002 // Seconds in one month

type BlogPostProps = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: BlogPostProps): Promise<Metadata> =>
{
  const { data: { post: { title, description } } } = await client.queries.post({ relativePath: `${params.slug}.mdx` });

  return {
    title: `${title} | Amends`,
    description: description || ''
  }
}

const getBlogPost = cache(async (slug: string) =>
{
  const queryResponse = await client.queries.post({ relativePath: `${slug}.mdx` });

  return {
    query: queryResponse.query,
    variables: queryResponse.variables,
    data: queryResponse.data
}
})

export default async function Page({ params }: BlogPostProps)
{
  const post = await getBlogPost(params?.slug)

  return <BlogPost {...post}/>
}