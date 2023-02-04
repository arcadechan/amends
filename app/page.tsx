import HomePage from './HomePage'
import { client } from '../.tina/__generated__/client'
import { HomeQuery } from '../.tina/__generated__/types'
import getPlaceholders from '../lib/getPlaceholder'  
import { use } from 'react'

const getHomeData = async () =>
{
  // const homePageQuery = await client.queries.home({ relativePath: 'home.mdx' })

  let query = `query getHomePage($relativePath: String!) {
    home(relativePath: $relativePath){
      pageBlocks {
        ...on HomePageBlocksCardGrid {
          columnCount
          sectionTitle
          cards {
            referenceCard {
              ...on Page {
                _values
              }
              ...on Post {
                _values
              }
            }
            manualCard {
              image
              title
              subtitle
              url
              showCtaButton
              ctaText
            }
          }
        }
      }
    }
  }`;

  let variables = { relativePath: 'home.mdx' };

  const res = await fetch('http://localhost:4001/graphql', {
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

  const homePageDataWithPlaiceholders: HomeQuery = await getPlaceholders.forHomePage(res.data)

  // console.log(JSON.stringify({res, homePageDataWithPlaiceholders},null,2));

  return {
    query,
    variables,
    data: homePageDataWithPlaiceholders
  }
}

const Page = async () =>
{
  const homeData = await getHomeData()
  console.log(JSON.stringify({homeData},null,2))

  return (
    <HomePage {...homeData}/>
  )
}

export default Page