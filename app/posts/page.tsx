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

    const query = print(getPostsQuery)
    const queryResponse = await fetch('http://127.0.0.1:4001/graphql', {
        method: 'POST',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json'
        },
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
    const posts = await getPosts(searchParams);
    // console.log(JSON.stringify({postsPageInfo: posts.pageInfo}, null,2));

    return <BlogPostList componentProps={posts} searchParams={searchParams}/>
}

export default Page