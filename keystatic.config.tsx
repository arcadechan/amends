import { config, fields, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

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
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/',
      schema: {
        blocks: fields.blocks({
          postCardGrid: {
            label: 'Post Card Grid',
            schema: fields.object({
              mobileColumns: fields.integer({
                label: 'Mobile Column Count',
                validation: { min: 1, max: 4 }
              }),
              desktopColumns: fields.integer({
                label: 'Desktop Column Count',
                validation: { min: 1, max: 4 }
              }),
              posts: fields.array(
                fields.relationship({
                  label: 'Post',
                  collection: 'blog'
                }), {
                  label: 'Posts',
                  itemLabel: (props) => props.value ?? 'Post'
                }
              )
            }),
            itemLabel: (props) => {
              const posts = props.fields.posts.elements
                .map(element => element.value)
                .join(', ')

              return `Post Card Grid: ${posts}`
            }
          },
          heading: {
            label: 'Heading',
            schema: fields.object({
              text: fields.text({ label: 'Heading' }),
              type: fields.select({
                label: 'Type',
                options: [
                  { label: 'H1', value: 'h1' },
                  { label: 'H2', value: 'h2' },
                  { label: 'H3', value: 'h3' },
                  { label: 'H4', value: 'h4' },
                  { label: 'H5', value: 'h5' },
                  { label: 'H6', value: 'h6' }
                ],
                defaultValue: 'h1'
              })
            }),
            itemLabel: (props) => {
              return `Heading: ${props.fields.text.value}`
            }
          }
        }, {
          label: 'Blocks'
        })
      }
    }),
    settings: singleton({
      label: 'Settings',
      path: 'src/content/settings/',
      schema: {
        motto: fields.text({
          label: 'Site Motto',
        }),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            path: fields.text({ label: 'Path' }),
            active: fields.checkbox({ label: 'Active', defaultValue: true }),
          }, {
            label: 'Nav Item'
          }),
          {
            label: 'Nav Items',
            itemLabel: (props) => props.fields.label.value
          }
        ),
        socials: fields.object({
          soundcloud: fields.url({ label: 'Soundcloud' }),
          github: fields.url({ label: 'Github' }),
          spotify: fields.url({ label: 'Spotify' })
        }, {
          label: 'Socials'
        })
      }
    })
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
        content: fields.markdoc({
          label: 'Content',
          components: {
            Player: block({
              label: 'Player',
              schema: {
                trackId: fields.text({ label: 'Spotify Track ID' }),
                trackArtist: fields.text({ label: 'Artist(s) Name' }),
                trackName: fields.text({ label: 'Track Name' }),
                trackAlbumArt: fields.relationship({
                  label: 'Album Art',
                  collection: 'media'
                }),
                platformLinks: fields.object({
                  spotify: fields.url({ label: 'Spotify' }),
                  youtube: fields.url({ label: 'YouTube' }),
                  appleMusic: fields.url({ label: 'Apple Music' }),
                  deezer: fields.url({ label: 'Deezer' }),
                  bandcamp: fields.url({ label: 'Bandcamp'}),
                  soundcloud: fields.url({ label: 'Soundcloud' })
                }, {
                  label: 'Platform Links',
                  layout: [6,6,6,6,6,6]
                })
              }
            }),
            Iframe: block({
              label: 'Iframe',
              schema: {
                code: fields.text({ label: 'Code', multiline: true })
              }
            })
          }
        }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        draft: fields.checkbox({ label: 'Draft Page', defaultValue: true }),
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
      }
    }),
    media: collection({
      label: 'Media',
      slugField: 'title',
      path: 'src/content/media/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        asset: fields.image({
          label: 'Asset',
          directory: 'src/content/media',
          publicPath: '@assets/media'
        })
      }
    })
  },
});