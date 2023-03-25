import { getPostsQuery } from '../../.tina/queries/getPosts.graphql'
import { print } from 'graphql'
import BlogPostList from './BlogPostList'

export const dynamic = 'force-dynamic'

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

    let API_URL = process.env.LOCAL_API_URL || 'http://localhost:4001/graphql'
    
    if(process.env.NODE_ENV === 'production')
    {
        API_URL = process.env.TINA_API_URL!
    }

    const query = print(getPostsQuery)
    const queryResponse = await fetch(API_URL, {
        method: 'POST',
        cache: 'force-cache',
        headers: {
            'X-API-KEY': process.env.TINA_TOKEN || '',
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({ query, variables }),
        next: {
            revalidate: 604800 // Total seconds in one week
        }
    }).then(res => res.json())
    .catch(e => {
        console.error(e)
    })

    return queryResponse?.data?.postConnection || null
}

const Page = async ({ searchParams }: PageSearchParamProps) =>
{   
    const posts = await getPosts(searchParams)

    return <BlogPostList componentProps={posts} searchParams={searchParams}/>
}

export default Page