import HomePage from './HomePage'
import { HomeQuery } from '../.tina/__generated__/types'
import getPlaceholders from '../lib/getPlaceholder'
import { getHomePageQuery } from '../.tina/queries/getHomePage.graphql'
import { print } from 'graphql'

export const dynamic = 'force-static'

const getHome = async () =>
{
  const query = print(getHomePageQuery)
  const variables = { relativePath: 'home.mdx' }

  const queryResponse = await fetch('http://127.0.0.1:4001/graphql', {
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
  .catch(e => {
      console.error(e)
  })

  const homePageDataWithPlaiceholders: HomeQuery = await getPlaceholders.forHomePage(queryResponse.data)

  return {
    query: query || null,
    variables: variables || null,
    data: homePageDataWithPlaiceholders || null
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