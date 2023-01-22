import type { NextPage } from 'next'
import { useTina } from 'tinacms/dist/react'
import { client } from '../.tina/__generated__/client'
import CardGrid from '../components/CardGrid'
import { Head, Layout } from '../components/layout'

export const getStaticProps = async (ctx: any) =>
{
  const siteMetaQuery = await client.queries.meta({ relativePath: 'meta.mdx' })
  const siteMeta = siteMetaQuery?.data?.meta || null

  const homePageQuery = await client.queries.home({ relativePath: 'home.mdx' })
  
  return {
    props: {
      siteMeta: siteMeta,
      query: homePageQuery.query,
      variables: homePageQuery.variables,
      data: homePageQuery.data
    }
  }
}

const Home: NextPage = (props: any): JSX.Element =>
{
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  const { siteMeta } = props
  const { pageBlocks } = data?.home

  return (
    <>
      <Layout siteMeta={siteMeta} className={''}>
        <Head>
          <title>Amends</title>
          <meta name='description' content=''/>
        </Head>
        {pageBlocks?.length > 0 && pageBlocks.map((block: any, i: number) => {
          switch(block.__typename)
          {
            case 'HomePageBlocksCardGrid':
              return <CardGrid componentProps={block} key={i}/> 
            default:
              return;
          }
        })}
      </Layout>
    </>
  )
}

export default Home
