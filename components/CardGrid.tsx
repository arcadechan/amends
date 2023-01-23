import Image from 'next/image'
import Link from 'next/link'
import { Template } from 'tinacms'
import styles from '../styles/components/CardGrid.module.scss'

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

const CardImage = ({cardImage}: {cardImage: string | undefined }): JSX.Element => 
{
  if(cardImage) {
    return (
      <div className={styles.cardGridImageContainer}>
        <Image
          src={cardImage}
          alt=''
          layout='fill'
          objectFit='cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className={styles.cardGridImage}
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

  let classes = `${styles.cardGrid} px-12 py-6 max-w-screen-2xl 2xl:mx-auto`;

  return (
    <section className={classes}>
      {sectionTitle && <h2 className={styles.cardGridTitle}>{sectionTitle}</h2>}
      <div className={`${styles.cardGridCardContainer} ${styles[`${columnCount}ColumnGrid`]}`}>
        {cards && cards?.length > 0 && cards.map((card, i: number) => {
          const cardImage = card?.manualCard?.image || card?.referenceCard?.heroImage

          return (
            <article className={`${styles.card} ${cardImage ? styles.cardHasImage : styles.cardHasNoImage }`} key={i}>
              <Link href={getCardUrl(card)} passHref>
                <a aria-label={getAriaLabel(card)} className={styles.cardAnchor}>
                  <CardImage cardImage={cardImage}/>
                  <div className={styles.cardTextLabels}>
                    {(card?.referenceCard?.title || card?.manualCard?.title) && (
                      <h2 className={styles.cardTitle} aria-hidden>
                        {card?.referenceCard?.title || card?.manualCard?.title}
                      </h2>
                    )}
                    {(card?.referenceCard?.subtitle || card?.manualCard?.title) && (
                      <h3 className={styles.cardSubtitle} aria-hidden>
                        {card?.referenceCard?.subtitle || card?.manualCard?.subtitle}
                      </h3>
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

export default CardGrid