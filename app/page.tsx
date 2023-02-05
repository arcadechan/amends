import HomePage from './HomePage'
import { HomeQuery } from '../.tina/__generated__/types'
import getPlaceholders from '../lib/getPlaceholder'
import { getHomePageQuery } from '../.tina/queries/getHomePage.graphql'
import { print } from 'graphql'

const getHome = async () =>
{
  const query = print(getHomePageQuery)
  const variables = { relativePath: 'home.mdx' }

  const queryResponse = await fetch('http://localhost:4001/graphql', {
    method: 'POST',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then(res => res.json())

  const homePageDataWithPlaiceholders: HomeQuery = await getPlaceholders.forHomePage(queryResponse.data)

  return {
    query,
    variables,
    data: homePageDataWithPlaiceholders
  }
}

const Page = async () =>
{
  const homeData = await getHome()

  return (
    <HomePage {...homeData}/>
  )
}

export default Page