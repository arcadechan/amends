import HomePage from './HomePage'
import { HomeQuery } from '../.tina/__generated__/types'
import getPlaceholders from '../lib/getPlaceholder'
import { getHomePage } from '../.tina/queries/getHomePage.graphql'
import { print } from 'graphql'

const getHomeData = async () =>
{
  const query = print(getHomePage)
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
  const homeData = await getHomeData()

  return (
    <HomePage {...homeData}/>
  )
}

export default Page