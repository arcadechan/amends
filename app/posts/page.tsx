import Posts from './Posts'
import { getPostsQuery } from '../../.tina/queries/getPosts.graphql'
import { print } from 'graphql'

const getPosts = async() =>
{
    const query = print(getPostsQuery)

    const queryResponse = await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    }).then(res => res.json())

    return {
        posts: queryResponse?.data?.postConnection
    }
}

const Page = async () =>
{
    const postsData: any = await getPosts()

    return <Posts {...postsData}/>
}

export default Page