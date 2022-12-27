import type { NextPage } from 'next'
// import { useTina } from 'tinacms/dist/react'
// import { TinaMarkdown } from 'tinacms/dist/rich-text'
// import { client } from '../.tina/__generated__/client'
import { Head, Layout } from '../components/layout'
// import Spotify from '../components/spotify'
import getSiteMeta from '../lib/getSiteMeta';

export const getStaticProps = async (ctx: any) => {
  const siteMeta = await getSiteMeta();

  return {
    props: {
      siteMeta: siteMeta
    }
  }
}

const Home: NextPage = (props: any) => {
  // const { data, isLoading } = useTina({
  //   query: props.query,
  //   variables: props.variables,
  //   data: props.data
  // })

  // if(isLoading){
  //   return <h1>Loading...</h1>
  // }

  const { siteMeta } = props
  

  return (
    <>
      <Layout siteMeta={siteMeta} className={''}>
        <Head>
          <title>Amends</title>
          <meta name='description' content=''/>
        </Head>
        <section>
          <h1>hello</h1>
        </section>
      </Layout>
    </>
  )
}

export default Home
