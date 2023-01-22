import { Template } from 'tinacms'

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
  title: string
}

interface ManualCard {
  image?: string
  title?: string
  subtitle?: string
  url?: string
  showCtaButton: boolean
  ctaText: string
}

const ReferenceCard = ({ componentProps }: any): JSX.Element =>
{

  const { title } = componentProps

  return <div>{title}</div>
}

const ManualCard = ({ componentProps }: any): JSX.Element =>
{
  const { title } = componentProps
  return <div>{title}</div>
}

const CardGrid = ({ componentProps }: { componentProps:  CardGridProps}): JSX.Element =>
{
  const { columnCount, sectionTitle, cards } = componentProps

  return (
    <section>
      {sectionTitle && <h2>{sectionTitle}</h2>}
      <div>
        {cards && cards?.length > 0 && cards.map((card, i) => {
          if(!!card?.referenceCard){
            return <ReferenceCard componentProps={card.referenceCard} key={i}/>
          } else {
            return <ManualCard componentProps={card.manualCard} key={i}/>
          }
        })}
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