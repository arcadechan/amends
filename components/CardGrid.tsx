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
  if(!title && !subtitle) return ''
}

const CardImage = ({card}: {card: Card}): JSX.Element => 
{
  let src: string = ''

  if(card?.referenceCard?.heroImage?.length) {
    src = card.referenceCard.heroImage;
  }

  if(card?.manualCard?.image?.length) {
    src = card.manualCard.image;
  }

  if(src.length) {
    return (
      <div className={styles.cardGridImageContainer}>
        <Image
          src={src}
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
        {cards && cards?.length > 0 && cards.map((card, i: number) => (
          <article className={styles.card}>
            <Link href={getCardUrl(card)} key={i} passHref>
              <a aria-label={getAriaLabel(card)} className={styles.cardAnchor}>
                <CardImage card={card}/>
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
        ))}
      </div>
    </section>
  )
}

export default CardGrid

export const cardGridSchema: Template =
{
  name: 'cardGrid',
  label: 'Card Grid',
  ui: {
    defaultItem: {
      columnCount: 'one',
    }
  },
  fields: [
    {
      name: 'columnCount',
      label: 'Column Count',
      type: 'string',
      ui: {
        name: 'columnCount',
        component: 'radio-group',
        direction: 'horizontal',
        variant: 'button',
        options: [
          { label: '1', value: 'one' },
          { label: '2', value: 'two' },
          { label: '3', value: 'three' },
          { label: '4', value: 'four' }
        ]
      }
    },
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'string'
    },
    {
      name: 'cards',
      label: 'Cards',
      type: 'object',
      list: true,
      fields: [
        {
          name: 'referenceCard',
          label: 'Reference Card',
          type: 'reference',
          description: 'Manual Card settings take precedence over references.',
          collections: [ 'post', 'page' ]
        },
        {
          name: 'manualCard',
          label: 'Manual Card',
          type: 'object',
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'image'
            },
            {
              name: 'title',
              label: 'Title',
              type: 'string'
            },
            {
              name: 'subtitle',
              label: 'Subtitle',
              type: 'string'
            },
            {
              name: 'url',
              label: 'Card URL',
              type: 'string'
            },
            {
              name: 'showCtaButton',
              label: 'Show CTA Button?',
              type: 'boolean',
              ui: {
                component: 'toggle',
              }
            },
            {
              name: 'ctaText',
              label: 'CTA Button Text',
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
}