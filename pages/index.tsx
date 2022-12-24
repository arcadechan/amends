import type { NextPage } from 'next'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { client } from '../.tina/__generated__/client'
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
      <div className='container my-5 m-auto'>
        <h1>Hello</h1>
        {/* <TinaMarkdown components={components} content={data.post.body}></TinaMarkdown> */}
      </div>
    </>
  )
}

export default Home
