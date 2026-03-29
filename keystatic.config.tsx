import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Amends',
      mark: () => <img src='/apple-touch-icon.png' height={24}/>
    },
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        draft: fields.checkbox({ label: 'Draft Post', defaultValue: true }),
        title: fields.slug({ name: { label: 'Title' } }),
        titleSettings: fields.object({
            type: fields.select({
                label: 'Type',
                options: [
                    { label: 'Bars below text', value: 'bars-below-text' },
                    { label: 'Barse behind text', value: 'bars-behind-text' }
                ],
                defaultValue: 'bars-below-text'
            }),
            size: fields.select({
                label: 'Size',
                options: [
                    { label: 'Normal', value: 'normal' },
                    { label: 'Large', value: 'large' }
                ],
                defaultValue: 'normal'
            })
        }, {
          label: 'Title Settings'
        }),
        subtitle: fields.text({ label: 'Subtitle' }),
        publicationDate: fields.date({ label: 'Publication Date' }),
        hero: fields.object({
          image: fields.image({
            label: 'Image',
            directory: 'src/content/blog',
            publicPath: '@assets/blog/'
          }),
          alt: fields.text({ label: 'Alt text' }),
          fit: fields.select({
            label: 'Fit',
            options: [
              {label: 'Cover', value: 'cover'},
              {label: 'Contain', value: 'contain'}
            ],
            defaultValue: 'cover'
          }),
          overlay: fields.object({
            color: fields.text({ label: 'Color' }),
            mix: fields.select({
              label: 'Mix',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Color', value: 'color' },
                { label: 'Screen', value: 'screen' },
                { label: 'Lighten', value: 'lighten' },
                { label: 'Color Dodge', value: 'color-dodge' },
                { label: 'Color Burn', value: 'color-burn' },
                { label: 'Soft Light', value: 'soft-light' },
                { label: 'Difference', value: 'difference' },
                { label: 'Exclusion', value: 'exclusion' },
                { label: 'Luminosity', value: 'luminosity' },
              ],
              defaultValue: 'none'
            }),
            opacity: fields.number({
              label: 'Opacity',
              step: 0.01,
              validation: {
                min: 0,
                max: 1
              }
            })
          }, {
            label: 'Hero Overlay'
          }),
          attribution: fields.object({
            name: fields.text({ label: 'Name' }),
            url: fields.url({ label: 'URL' })
          }, {
            label: 'Hero Attribution'
          })
        }, {
          label: 'Hero'
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});