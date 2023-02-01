import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HomePageBlocksCardGrid, HomePageBlocksCardGridCards } from '../.tina/__generated__/types'
import styles from '../styles/components/CardGrid.module.scss'

interface CardImageProps {
  cardImage: {
    src: string | null | undefined
    imageBlurDataURL?: string | null | undefined
  }
  columnCount: string | null | undefined
}

const getCardUrl = (card: HomePageBlocksCardGridCards | null): string =>
{
  if(card?.manualCard?.url) return card.manualCard.url
  if(card?.referenceCard?.id) {
    return card.referenceCard.id.replace('content', '').replace('.mdx', '')
  }

  return ''
}

const getAriaLabel = (card: HomePageBlocksCardGridCards | null): string =>
{
  let title = card?.referenceCard?.title || card?.manualCard?.title
  let subtitle = card?.referenceCard?.subTitle || card?.manualCard?.subtitle

  if(title && subtitle) return `${title}: ${subtitle}`
  if(title && !subtitle) return title;
  if(!title && subtitle) return subtitle
  
  return ''
}

const CardImage = ({cardImage, columnCount}: CardImageProps): JSX.Element => 
{
  if(cardImage && cardImage.src) {
    let sizes = ''

    switch(columnCount)
    {
      case 'one':
        sizes = '100vw'
        break;
      case 'two':
        sizes = '100vw, (min-width: 768px) 50vw'
        break;
      case 'three':
        sizes = '100vw, (min-width: 768px) 50vw, (min-width: 1024px) 33vw'
        break;
      case 'four':
        sizes = '100vw, (min-width: 768px) 50vw, (min-width: 1024px) 25vw'
        break;
      default:
        sizes = '100vw, (min-width: 768px) 50vw'
        break;
    }

    return (
      <div className={styles.cardGridImageContainer}>
        <Image
          src={cardImage.src}
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          sizes={sizes}
          className={styles.cardGridImage}
          placeholder={ cardImage?.imageBlurDataURL ? 'blur' : 'empty' }
          blurDataURL={ cardImage?.imageBlurDataURL || undefined}
        />
      </div>
    )
  }else{
    return <div className={styles.cardGridNoImage}></div>
  }
}

const CardGrid = ({ componentProps }: { componentProps: HomePageBlocksCardGrid }): JSX.Element =>
{
  const { columnCount = 'one', sectionTitle, cards } = componentProps

  return (
    <section className={`${styles.cardGrid} px-12 py-4 max-w-screen-2xl 2xl:mx-auto`}>
      {sectionTitle && <h2 className={styles.cardGridTitle}>{sectionTitle}</h2>}
      <div className={`${styles.cardGridCardContainer} ${styles[`${columnCount}ColumnGrid`]}`}>
        {cards && cards?.length > 0 && cards.map((card, i: number) => {
          const cardImage = {
            src: card?.manualCard?.image || card?.referenceCard?.heroImage,
            imageBlurDataURL: card?.manualCard?.imageBlurDataURL || card?.referenceCard?.imageBlurDataURL
          }
          const cardTitle = card?.referenceCard?.title || card?.manualCard?.title
          const cardSubtitle = card?.referenceCard?.subTitle || card?.manualCard?.subtitle
          const showCtaButton = card?.manualCard?.showCtaButton

          return (
            <article className={`${styles.card} ${cardImage ? styles.cardHasImage : styles.cardHasNoImage }`} key={i}>
              <Link
                href={getCardUrl(card)}
                aria-label={getAriaLabel(card)}
                className={`${styles.cardAnchor} ${showCtaButton ? styles.cardAnchorWithCta : ''}`}
              >
                <CardImage cardImage={cardImage} columnCount={columnCount}/>
                <div className={styles.cardTextLabels}>
                  {cardTitle && (
                    <h2 className={showCtaButton ? styles.cardTitleCentered : styles.cardTitle} aria-hidden>{cardTitle}</h2>
                  )}
                  {cardSubtitle && (
                    <h3 className={styles.cardSubtitle} aria-hidden>{cardSubtitle}</h3>
                  )}
                  {showCtaButton && (
                    <span className={styles.cardCtaButton}>
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