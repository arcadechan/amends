import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import styles from '../styles/components/CardGrid.module.scss'
import { getPlaiceholder } from 'plaiceholder'

interface CardGridProps {
  columnCount: string
  sectionTitle?: string
  cards?: Card[] | null
}

interface Card {
  referenceCard: ReferenceCard | null
  manualCard: ManualCard | null
}

interface ReferenceCard { 
  id?: string
  title: string
  subtitle?: string
  heroImage?: string
}

interface ManualCard {
  image?: string
  title?: string
  subtitle?: string
  url?: string
  showCtaButton: boolean
  ctaText: string
}

interface CardImageProps {
  cardImage: string | undefined
  columnCount: string | undefined
}

const getCardUrl = (card: Card): string =>
{
  if(card?.manualCard?.url) return card.manualCard.url
  if(card?.referenceCard?.id) {
    return card.referenceCard.id.replace('content', '').replace('.mdx', '')
  }

  return ''
}

const getAriaLabel = (card: Card): string =>
{
  let title = card?.referenceCard?.title || card?.manualCard?.title
  let subtitle = card?.referenceCard?.subtitle || card?.manualCard?.subtitle

  if(title && subtitle) return `${title}: ${subtitle}`
  if(title && !subtitle) return title;
  if(!title && subtitle) return subtitle
  
  return ''
}

const CardImage = ({cardImage, columnCount}: CardImageProps): JSX.Element => 
{
  if(cardImage) {
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
          src={cardImage}
          alt=''
          layout='fill'
          objectFit='cover'
          sizes={sizes}
          className={styles.cardGridImage}
          placeholder='empty'
        />
      </div>
    )
  }else{
    return <div className={styles.cardGridNoImage}></div>
  }
}

const CardGrid = ({ componentProps }: { componentProps:  CardGridProps}): JSX.Element =>
{
  const { columnCount = 'one', sectionTitle, cards } = componentProps

  const [ imagePlaiceholders, setImagePlaiceholders ] = useState([{}])

  useEffect(() => {
    const plaiceholders: any[] = []
    const getImagePlaiceholders = async (): Promise<void> =>
    {
      if(cards?.length)
      {
        for(let i = 0; i < cards.length; i++)
        {
          const card = cards[i]
          const cardImage = card?.referenceCard?.heroImage || card?.manualCard?.image
          if(cardImage)
          {
            const base64 = await getPlaiceholder(cardImage).then(({ base64 }) => base64);
            console.log({base64});
            if(base64)
            {
              plaiceholders.push({
                src: cardImage,
                base64
              })
            }
          }
        }

        setImagePlaiceholders(plaiceholders)
      }
    }

    // getImagePlaiceholders().then(data =>
    // {
    //   console.log({data})
    // })
  }, [])
  

  if(imagePlaiceholders?.length)
  {
    return (
      <section className={`${styles.cardGrid} px-12 py-4 max-w-screen-2xl 2xl:mx-auto`}>
        {sectionTitle && <h2 className={styles.cardGridTitle}>{sectionTitle}</h2>}
        <div className={`${styles.cardGridCardContainer} ${styles[`${columnCount}ColumnGrid`]}`}>
          {cards && cards?.length > 0 && cards.map((card, i: number) => {
            const cardImage = card?.manualCard?.image || card?.referenceCard?.heroImage
            const cardTitle = card?.referenceCard?.title || card?.manualCard?.title
            const cardSubtitle = card?.referenceCard?.subtitle || card?.manualCard?.subtitle
            const showCtaButton = card?.manualCard?.showCtaButton

            return (
              <article className={`${styles.card} ${cardImage ? styles.cardHasImage : styles.cardHasNoImage }`} key={i}>
                <Link href={getCardUrl(card)} passHref>
                  <a aria-label={getAriaLabel(card)} className={`${styles.cardAnchor} ${showCtaButton ? styles.cardAnchorWithCta : ''}`}>
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
                  </a>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
  else
  {
    return <></>
  }
}

export default CardGrid