'use client'

import { useTina } from 'tinacms/dist/react'
import { HomePageBlocks } from '../.tina/__generated__/types'
import CardGrid from '../components/CardGrid'
// import { Head } from '../components/layout'
import Head from 'next/head'

const Home = (props: any): JSX.Element =>
{
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  const pageBlocks: HomePageBlocks[] = data?.home.pageBlocks

  return (
    <>
      {/* <Head>
        <title>Amends</title>
        <meta name='description' content=''/>
      </Head> */}
      {pageBlocks && pageBlocks?.length > 0 && pageBlocks.map((block , i: number) => {
        switch(block?.__typename)
        {
          case 'HomePageBlocksCardGrid':
            return <CardGrid componentProps={block} key={i}/> 
          default:
            return;
        }
      })}
    </>
  )
}

export default Home
