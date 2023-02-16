import Posts from './Posts'
import { getPostsQuery } from '../../../.tina/queries/getPosts.graphql'
import { print } from 'graphql'

const getPosts = async(startCursor: string | undefined, endCursor: string | undefined) =>
{
    const variables = {
        before: endCursor || '',
        after: startCursor || ''
    }
    const query = print(getPostsQuery)
    const queryResponse = await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        }),
        next: {
            revalidate: 604800 // Total seconds in one week
        }
    }).then(res => res.json())

    return {
        posts: queryResponse?.data?.postConnection
    }
}

const Page = async ({searchParams}: {searchParams: { startCursor?: string, endCursor?: string }}) =>
{
    const { startCursor, endCursor } = searchParams;
    const postsData: any = await getPosts(startCursor, endCursor)

    return <Posts {...postsData} searchParams={searchParams}/>
}

export default Page