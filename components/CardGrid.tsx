'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  HomePageBlocksCardGrid,
  HomePageBlocksCardGridCards
} from '../.tina/__generated__/types'

interface CardImageProps {
  cardImage: {
    src: string | null | undefined
    imageBlurDataURL?: string | null | undefined
  }
  columnCount: string | null | undefined
}

const getCardUrl = (card: HomePageBlocksCardGridCards | null): string => {
  if (card?.manualCard?.url) return card.manualCard.url
  if (card?.referenceCard?.id) {
    return card.referenceCard.id.replace('content', '').replace('.mdx', '')
  }

  return ''
}

const getAriaLabel = (card: HomePageBlocksCardGridCards | null): string => {
  let title = card?.referenceCard?.title || card?.manualCard?.title
  let subtitle = card?.referenceCard?.subTitle || card?.manualCard?.subtitle

  if (title && subtitle) return `${title}: ${subtitle}`
  if (title && !subtitle) return title
  if (!title && subtitle) return subtitle

  return ''
}

const CardImage = ({ cardImage, columnCount }: CardImageProps): JSX.Element => {
  if (cardImage?.src !== undefined && cardImage.src?.length) {
    let sizes = ''

    switch (columnCount) {
      case 'one':
        sizes = '100vw'
        break
      case 'two':
        sizes = '100vw, (min-width: 768px) 50vw'
        break
      case 'three':
        sizes = '100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw'
        break
      case 'four':
        sizes = '100vw, (min-width: 768px) 50vw, (min-width: 1024px) 25vw'
        break
      default:
        sizes = '100vw, (min-width: 768px) 50vw'
        break
    }

    return (
      <div className='w-full h-auto min-h-[300px] max-h-[520px] max-w-[985px] mx-auto z-0'>
        <Image
          src={cardImage.src}
          className='rounded-3xl w-full h-auto min-h-[300px] max-h-[440px] max-w-[985px] object-cover'
          height={460}
          width={985}
          alt=''
          sizes={sizes}
          placeholder='blur'
          blurDataURL={cardImage?.imageBlurDataURL || ''}
        />
      </div>
    )
  } else {
    return <div className='h-full w-full absolute bg-gray left-0 top-0 z-0 rounded-3xl' />
  }
}

const CardGrid = ({
  componentProps
}: {
  componentProps: HomePageBlocksCardGrid
}): JSX.Element => {
  const { sectionTitle, cards } = componentProps
  const columnCount: string = componentProps?.columnCount || 'one'

  const columnClasses: { [key: string]: string } = {
    one: '',
    two: 'md:grid-cols-2',
    three: 'md:grid-cols-3',
    four: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className='max-w-screen-lg mx-auto pt-10 pb-4 px-12'>
      {sectionTitle && (
        <h2 className='font-candy text-3xl mb-3 text-center'>{sectionTitle}</h2>
      )}
      <div className={`grid gap-8 grid-cols-1 ${columnClasses[columnCount]}`}>
        {cards &&
          cards?.length > 0 &&
          cards.map((card, i: number) => {
            const cardImage = {
              src: card?.manualCard?.image || card?.referenceCard?.heroImage,
              imageBlurDataURL:
                card?.manualCard?.imageBlurDataURL ||
                card?.referenceCard?.imageBlurDataURL
            }
            const cardTitle = card?.referenceCard?.title || card?.manualCard?.title
            const cardSubtitle =
              card?.referenceCard?.subTitle || card?.manualCard?.subtitle
            const showCtaButton = card?.manualCard?.showCtaButton

            return (
              <article className='relative rounded-3xl w-full h-full' key={i}>
                <Link
                  href={getCardUrl(card)}
                  aria-label={getAriaLabel(card)}
                  className={`group block h-full focus:outline-black focus:outline-[5px] focus:rounded-3xl focus:outline focus:outline-offset-[-1px]`}
                  prefetch={false}
                >
                  <CardImage cardImage={cardImage} columnCount={columnCount} />
                  <div
                    className={`flex flex-col just-end p-6 absolute bottom-0 left-0 z-0 w-full text-white bg-gradient-to-r from-black rounded-b-3xl ${
                      !cardImage?.src && 'h-full rounded-t-3xl'
                    }`}
                  >
                    {cardTitle && (
                      <h2
                        className={`font-inter text-2xl font-bold ${
                          showCtaButton && 'text-center'
                        } ${!showCtaButton && 'group-hover:underline'}`}
                        aria-hidden
                      >
                        {cardTitle}
                      </h2>
                    )}
                    {cardSubtitle && (
                      <h3
                        className={`font-inter text-lg italic ${
                          showCtaButton && 'text-center'
                        } ${!showCtaButton && 'group-hover:underline'}`}
                        aria-hidden
                      >
                        {cardSubtitle}
                      </h3>
                    )}
                    {showCtaButton && (
                      <span className='bg-yellow text-black font-inter text-center p-[10px] mt-4 font-bold rounded-xl w-auto group-hover:underline'>
                        {card?.manualCard?.ctaText || ''}
                      </span>
                    )}
                  </div>
                </Link>
              </article>
            )
          })}
      </div>
    </section>
  )
}

export default CardGrid
