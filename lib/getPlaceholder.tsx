import { getPlaiceholder } from "plaiceholder";
import { HomeQuery } from "../.tina/__generated__/types";

const getPlaceholders = {
  forHomePage: async (homePageQueryData: HomeQuery): Promise<HomeQuery> =>
  {
    const { pageBlocks } = homePageQueryData?.home

    if(pageBlocks?.length)
    {
      const modifiedPageBlocks = await Promise.all(
        pageBlocks.map(async (block) =>
        {
          const cards = block?.cards
          if(block && cards?.length)
          {
            const modifiedCards = await Promise.all(
              cards.map(async (card) =>
              {
                if(card?.manualCard?.image)
                {
                  const { base64 } = await getPlaiceholder(card.manualCard.image)
                  card.manualCard = { ...card.manualCard, ...{imageBlurDataURL: base64} }
                }

                if(card?.referenceCard?.heroImage)
                {
                  const { base64 } = await getPlaiceholder(card.referenceCard.heroImage)
                  card.referenceCard = { ...card.referenceCard, ...{imageBlurDataURL: base64} }
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
  }
}

export default getPlaceholders