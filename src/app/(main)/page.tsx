import HomePage from './HomePage'
import { GetHomePageQueryQuery } from 'tina/__generated__/types'
import getPlaceholders from '@/lib/getPlaceholder'
import { client } from 'tina/__generated__/client'
import { Metadata } from 'next'
import getMetadataBase from '@/lib/metadata'

export const generateMetadata = (): Metadata => {
  const title = 'Amends'
  const description = 'Writing nonsense one word at a time.'

  const metadataBase = getMetadataBase()

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
}

export default async function Page() {
  const queryResponse = await client.queries.getHomePageQuery({
    relativePath: 'home.mdx'
  })

  const homePageDataWithPlaiceholders: GetHomePageQueryQuery =
    await getPlaceholders.forHomePage(queryResponse.data)

  const homeData = {
    query: queryResponse.query,
    variables: queryResponse.variables,
    data: homePageDataWithPlaiceholders
  }

  return <HomePage {...homeData} />
}
