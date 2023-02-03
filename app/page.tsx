import HomePage from './HomePage'
import { client } from '../.tina/__generated__/client'
import { HomeQuery } from '../.tina/__generated__/types'
import getPlaceholders from '../lib/getPlaceholder'  
import { use } from 'react'

const getHomeData = async () =>
{
  const homePageQuery = await client.queries.home({ relativePath: 'home.mdx' })
  const homePageDataWithPlaiceholders: HomeQuery = await getPlaceholders.forHomePage(homePageQuery.data)

  return {
    query: homePageQuery.query,
    variables: homePageQuery.variables,
    data: homePageDataWithPlaiceholders
  }
}

const Page = async () =>
{
  const homeData = await getHomeData()

  return (
    <HomePage {...homeData}/>
  )
}

export default Page