import { getPlaiceholder } from 'plaiceholder'
import { GetHomePageQueryQuery, GetPostsQueryQuery } from 'tina/__generated__/types'
import path from 'node:path'
import fs from 'node:fs/promises'

const fallbackBase64 =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='

const getImage = async (src: string) => {
  let buffer: Buffer | undefined = undefined

  const NEXT_PUBLIC_USE_LOCAL_CLIENT = process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || '0'

  if (NEXT_PUBLIC_USE_LOCAL_CLIENT === '0') {
    buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))
  } else {
    buffer = await fs.readFile(path.join('./public', src))
  }

  if (buffer) {
    const { ...plaiceholder } = await getPlaiceholder(buffer, { size: 10 }).catch(() => ({
      base64: fallbackBase64
    }))

    return {
      ...plaiceholder
    }
  }

  return {
    base64: fallbackBase64
  }
}

const getPlaceholders = {
  forHomePage: async (
    homePageQueryData: GetHomePageQueryQuery
  ): Promise<GetHomePageQueryQuery> => {
    try {
      const { pageBlocks } = homePageQueryData?.home

      if (pageBlocks?.length) {
        const modifiedPageBlocks = await Promise.all(
          pageBlocks.map(async (block: any) => {
            const cards = block?.cards
            if (block && cards?.length) {
              const modifiedCards = await Promise.all(
                cards.map(async (card: any) => {
                  if (card?.manualCard?.image) {
                    const { base64 } = await getImage(card.manualCard.image)
                    card.manualCard = {
                      ...card.manualCard,
                      ...{ imageBlurDataURL: base64 }
                    }
                  }

                  if (card?.referenceCard?.heroImage) {
                    const { base64 } = await getImage(card.referenceCard.heroImage)
                    card.referenceCard = {
                      ...card.referenceCard,
                      ...{ imageBlurDataURL: base64 }
                    }
                  }

                  return card
                })
              )

              block.cards = modifiedCards
            }

            return block
          })
        )

        homePageQueryData.home.pageBlocks = modifiedPageBlocks
      }

      return homePageQueryData
    } catch (e) {
      console.error(e)
      return homePageQueryData
    }
  },
  forBlogPostList: async (
    postsQueryData: GetPostsQueryQuery
  ): Promise<GetPostsQueryQuery> => {
    try {
      const { edges } = postsQueryData?.postConnection

      if (edges?.length) {
        const modifiedEdges = await Promise.all(
          edges.map(async (edge: any) => {
            if (edge?.node?.heroImage?.length) {
              const { base64 } = await getImage(edge.node.heroImage)
              edge.node = { ...edge.node, ...{ imageBlurDataURL: base64 } }
            }

            return edge
          })
        )

        postsQueryData.postConnection.edges = modifiedEdges
      }
    } catch (e) {
      console.error(e)
      return postsQueryData
    }

    return postsQueryData
  }
}

export default getPlaceholders
