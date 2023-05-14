import HomePage from './HomePage'
import { GetHomePageQueryQuery } from '.tina/__generated__/types'
import getPlaceholders from 'lib/getPlaceholder'
import { client } from '.tina/__generated__/client'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const metadata = ((): Metadata => {
  const title = 'Amends'
  const description = 'Writing nonsense one word at a time.'

  const metadataBase = new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL!
  )

  return {
    title,
    description,
    metadataBase,
    openGraph: {
      title: 'Amends',
      description,
      images: [`${metadataBase}/logo/amends-og.jpeg`]
    }
  }
})()

const getHome = async () => {
  const queryResponse = await client.queries.getHomePageQuery({
    relativePath: 'home.mdx'
  })
  const homePageDataWithPlaiceholders: GetHomePageQueryQuery =
    await getPlaceholders.forHomePage(queryResponse.data)

  return {
    query: queryResponse.query || null,
    variables: queryResponse.variables || null,
    data: homePageDataWithPlaiceholders || null
  }
}

const Page = async () => {
  const homeData = await getHome()

  return <HomePage {...homeData} />
}

export default Page
