import BlogPostList from './BlogPostList'
import { client } from '../../../.tina/__generated__/client'
import path from 'path'
import { promises as fs } from 'fs'
import { cache } from 'react'

const POSTS_PER_PAGE = 3

export const dynamic = 'auto'
export const revalidate = 604800 // Total seconds in one week
export const dynamicParams = true
export const metadata = {
    title: 'Posts | Amends',
    description: 'Just some stuff to read and stuffs.'
}

export const generateStaticParams = cache(async (): Promise<{ pageNumber: string }[]> => {
    let pages = [{ pageNumber: '1' }]
    const allPostCursors = await client.queries.getAllPostCursorsQuery({ last: 99999 })

    // Split into groups of 3 for testing
    if(
        allPostCursors &&
        allPostCursors?.data &&
        allPostCursors.data?.postConnection &&
        allPostCursors.data.postConnection?.edges &&
        allPostCursors?.data?.postConnection?.edges?.length > 0
    ){
        const { edges, totalCount } = allPostCursors.data.postConnection

        if(totalCount > 0) {
            const cursors = edges.map((edge: any) => edge.cursor)
            const pageCount = Math.floor(totalCount / POSTS_PER_PAGE)
            
            // Convert to chunks
            const chunks = cursors.reduce((all: any, one: any, i: number) => {
                const ch = Math.floor(i/POSTS_PER_PAGE); 
                all[ch] = [].concat((all[ch]||[]),one); 
                return all
             }, [])
     
            const jsonDirectory = path.join(process.cwd(), 'json')
            
            // let dirExists = false;
            await fs.stat(jsonDirectory)
            .catch(async(err) => {
                console.error(err)

                if(err.code === 'ENOENT'){
                    await fs.mkdir(jsonDirectory)
                    .catch(err => console.error(err))
                }
            })

            await fs.writeFile(jsonDirectory + '/pages.json', JSON.stringify(chunks), 'utf-8')
            
            const generatedPages = Array.apply(null, Array(pageCount)).map((x,i) => ({pageNumber: (i + 1).toString()}))
            pages = [...pages, ...generatedPages]
        }
    }

    return pages
})

export type PageSearchParamProps = {
    searchParams: {
        startCursor?: string
        endCursor?: string
        prevCursor?: string
    },
    params: any
}

const getPosts = cache(async (pageNumber: string ) =>
{
    let variables: any = { last: POSTS_PER_PAGE }

    const jsonDirectory = path.join(process.cwd(), 'json')
    let fileExists: boolean = false;
    
    await fs.stat(`${jsonDirectory}/pages.json`)
    .then(() =>
    {
        fileExists = true
    })
    .catch(err => console.error(err));

    if(fileExists)
    {
        const pageJson = await fs.readFile(jsonDirectory + '/pages.json', { encoding: 'utf-8' })
        const parsedJson = JSON.parse(pageJson)
        const currentPageIndex = parseInt(pageNumber) - 1
        
        if(currentPageIndex !== 0)
        {
            const prevPage = currentPageIndex - 1
            const lastCursor = parsedJson[prevPage].slice(-1)[0]
            variables = { ...variables, before: lastCursor }
        }
    }

    const queryResponse = await client.queries.getPostsQuery(variables)

    return {
        query: queryResponse?.query || null,
        variables: queryResponse?.variables || null,
        data: queryResponse?.data?.postConnection || null
    }
})

const Page = async ({ params }: any) =>
{   
    const posts = await getPosts(params?.pageNumber)

    return <BlogPostList componentProps={posts.data} params={params}/>
}

export default Page