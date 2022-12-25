import type { NextPage } from 'next'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { client } from '../.tina/__generated__/client'
import { Head, Layout } from '../components/layout'
import Spotify from '../components/spotify'

const components: any = {
  spotify: Spotify
}

// export const getStaticProps = async (ctx: any) => {

// }

const Home: NextPage = (props: any) => {
  // const { data, isLoading } = useTina({
  //   query: props.query,
  //   variables: props.variables,
  //   data: props.data
  // })

  // if(isLoading){
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <Layout navRoutes={[{}]} siteMeta={{}} className={''}>
        <Head>
          <title>Test</title>
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
