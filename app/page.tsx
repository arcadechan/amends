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

  let API_URL = process.env.LOCAL_API_URL || 'http://localhost:4001/graphql'
    
  if(process.env.NODE_ENV === 'production')
  {
      API_URL = process.env.TINA_API_URL!
  }

  const queryResponse = await fetch(API_URL, {
    method: 'POST',
    cache: 'force-cache',
    headers: {
      'X-API-KEY': process.env.TINA_TOKEN || '',
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
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