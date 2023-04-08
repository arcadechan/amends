import BlogPostList from './BlogPostList'
import { client } from '../../.tina/__generated__/client'

export const dynamic = 'auto'
export const revalidate = 604800 // Total seconds in one week
export const metadata = {
    title: 'Posts | Amends',
    description: 'Just some stuff to read and stuffs.'
}

export type PageSearchParamProps = {
    searchParams: {
        startCursor?: string
        endCursor?: string
        prevCursor?: string
    }
}

const getPosts = async (searchParams: PageSearchParamProps['searchParams']) =>
{
    let variables: any = { last: 3 }

    if(searchParams)
    {
        const { endCursor, startCursor } = searchParams
        if(startCursor)
        {
            variables = { ...variables, ...{after: startCursor} }
        }

        if(endCursor?.length)
        {
            variables = { ...variables, ...{before: endCursor} }
        }
    }

    const queryResponse = await client.queries.getPostsQuery({...variables});

    return {
        query: queryResponse?.query || null,
        variables: queryResponse?.variables || null,
        data: queryResponse?.data?.postConnection || null
    }
}

const Page = async ({ searchParams }: PageSearchParamProps) =>
{   
    const posts = await getPosts(searchParams)

    return <BlogPostList componentProps={posts.data} searchParams={searchParams}/>
}

export default Page