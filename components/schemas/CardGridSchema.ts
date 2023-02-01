import { Template, wrapFieldsWithMeta } from 'tinacms'

const CardGridSchema: Template =
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
              name: 'imageBlurDataURL',
              label: 'Image Blur Data URL',
              description: 'base64',
              type: 'string',
              ui: {
                component: () => false
              }
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

export default CardGridSchema