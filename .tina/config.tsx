import React from 'react'
import { defineConfig, wrapFieldsWithMeta } from 'tinacms'
import { theme } from "../tailwind.config";

const URLWithIconContainer = ({ serviceName, input } : { serviceName: string, input: any}) : JSX.Element => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ display: 'flex', height: '100%', width: '50px', padding: '0 .5rem' }}>
      <img src={`/icons/${serviceName}.png`} style={{ maxHeight: '30px', margin: '0 auto' }}/>
    </div>
    <input
      id={`${serviceName}Url`}
      type='text'
      style={{width: '100%', padding: '.5rem', border: '1px solid #e1ddec', borderRadius: '6px'}}
      {...input}
    />
  </div>
)

const brandColors: string[] = [ '#1a1d27', '#ffdc8b', '#faf4eb', '#e06363', '#77bfe8', '#63c67e' ];

const schema = {
  collections: [
    {
      label: 'Home',
      name: 'home',
      path: 'content/home',
      format: 'mdx',
      ui: {
        allowedActions: {
          create: false,
          delete: false,
        },
        defaultItem: {
          categories: [
            {
              cta: {
                label: 'Explore'
              }
            }
          ]
        }
      },
      fields: [
        {
          label: 'Featured Article',
          name: 'featured',
          type: 'reference',
          collections: [ 'post' ]
        },
        {
          label: 'Featured (Other)',
          name: 'featuredOther',
          type: 'reference',
          collections: [ 'post' ]
        },
        {
          label: 'Categories',
          name: 'categories',
          type: 'object',
          list: true,
          fields: [
            {
              label: 'Category Image',
              name: 'image',
              type: 'image'
            },
            {
              label: 'Category Name',
              name: 'name',
              type: 'string',
              required: true
            },
            {
              label: 'Category Name Color',
              name: 'nameColor',
              type: 'string',
              ui: {
                name: 'nameColor',
                component: 'color',
                colorFormat: 'hex',
                widget: 'sketch',
                colors: brandColors
              }
            },
            {
              label: 'CTA',
              name: 'cta',
              type: 'object',
              fields: [
                {
                  label: 'CTA Label',
                  name: 'label',
                  type: 'string'
                },
                {
                  label: 'CTA Color',
                  name: 'nameColor',
                  type: 'string',
                  ui: {
                    name: 'nameColor',
                    component: 'color',
                    colorFormat: 'hex',
                    widget: 'block',
                    colors: brandColors
                  }
                },
                {
                  label: 'CTA URL',
                  name: 'url',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Pages',
      name: 'page',
      path: 'content/pages',
      format: 'mdx',
      fields: [
        {
          label: 'Draft?',
          name: 'draft',
          type: 'boolean'
        },
        {
          label: 'Publish Date',
          name: 'publishDate',
          type: 'datetime',
          required: true
        },
        {
          label: 'Hero Image',
          name: 'heroImage',
          type: 'image'
        },
        {
          label: 'Title',
          name: 'title',
          type: 'string',
          required: true,
          isTitle: true
        },
        {
          label: 'Secondary Title',
          name: 'secondaryTitle',
          type: 'string',
        },
        {
          label: 'Description',
          name: 'description',
          type: 'string',
          description: 'Max character count: 160',
          ui: {
            component: wrapFieldsWithMeta(({ field, input, meta, ...props}): JSX.Element => {
              return (
                <div>
                  <textarea
                    id="pageDescription"
                    rows={3}
                    style={{width: '100%', padding: '.5rem', border: '1px solid #e1ddec', borderRadius: '6px'}}
                    maxLength={160}
                    {...input}
                  />
                  <br/>
                  Character Count: {input.value.length } { input.value.length === 160 ? <small style={{color: 'red'}}>Max!</small>: ''}
                </div>
              );
            })
          }
        }
      ]
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      ui: {
        filename: {
          readonly: false,
          slugify: (values: any) => {
            let category: string = ''
            let title: string = ''

            if(!!values?.category) {
              category = `${values.category}/`
            }

            if(!!values?.title && values.title.length > 0) {
              title = values.title.toLowerCase().replaceAll(/ /g, '-')
            }
            
            return `${category}${title}`
          }
        }
      },
      defaultItem: {
        draft: true
      },
      fields: [
        {
          label: 'Draft?',
          name: 'draft',
          type: 'boolean'
        },
        {
          label: 'Publish Date',
          name: 'publishDate',
          type: 'datetime',
          required: true
        },
        {
          label: 'Category',
          name: 'category',
          type: 'string',
          required: true,
          options: [
            {
              label: 'Music',
              value: 'music',
            },
            {
              label: 'Technology',
              value: 'technology',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Film',
              value: 'film',
            },
            {
              label: 'Writing',
              value: 'writing',
            },
            {
              label: 'Misc.',
              value: 'misc',
            }
          ]
        },
        {
          label: 'Hero Image',
          name: 'heroImage',
          type: 'image'
        },
        {
          label: 'Title',
          name: 'title',
          type: 'string',
          required: true,
          isTitle: true
        },
        {
          label: 'Secondary Title',
          name: 'secondaryTitle',
          type: 'string',
        },
        {
          label: 'Description',
          name: 'description',
          type: 'string',
          description: 'Max character count: 160',
          ui: {
            component: wrapFieldsWithMeta(({ field, input, meta, ...props}): JSX.Element => {
              return (
                <div>
                  <textarea
                    id="pageDescription"
                    rows={3}
                    style={{width: '100%', padding: '.5rem', border: '1px solid #e1ddec', borderRadius: '6px'}}
                    maxLength={160}
                    {...input}
                  />
                  <br/>
                  Character Count: {input.value.length } { input.value.length === 160 ? <small style={{color: 'red'}}>Max!</small>: ''}
                </div>
              );
            })
          }
        },
        {
          type: 'rich-text',
          label: 'Blog Post Body',
          name: 'body',
          isBody: true,
          templates: [
            {
              name: 'songEmbed',
              label: 'Song Embed',
              fields: [
                {
                  label: 'Audio Preview URL',
                  name: 'audioPreviewUrl',
                  type: 'string'
                },
                {
                  label: 'Spotify URL',
                  name: 'spotifyUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='spotify' input={input}/>
                    })
                  }
                },
                {
                  label: 'Youtube URL',
                  name: 'youtubeUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='youtubeMusic' input={input}/>
                    })
                  }
                },
                {
                  label: 'Apple Music URL',
                  name: 'appleMusicUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='appleMusic' input={input}/>
                    })
                  }
                },
                {
                  label: 'Deezer URL',
                  name: 'deezerUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='deezer' input={input}/>
                    })
                  }
                },
                {
                  label: 'Bandcamp URL',
                  name: 'bandcampUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='bandcamp' input={input}/>
                    })
                  }
                },
                {
                  label: 'Soundcloud URL',
                  name: 'soundcloudUrl',
                  type: 'string',
                  ui: {
                    component: wrapFieldsWithMeta(({field, input, meta, ...props}): JSX.Element => {
                      return <URLWithIconContainer serviceName='soundcloud' input={input}/>
                    })
                  }
                }
              ],
            },
          ],
        },
        {
          label: 'Tags',
          name: 'tags',
          type: 'string',
          list: true,
          component: 'tags'
        }
      ],
    },
  ],
}

const config = defineConfig({
  schema,
  clientId: process.env.TINA_CLIENT_ID!,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || 'main',
  token: process.env.TINA_TOKEN!,
  build: {
    publicFolder: 'public',
    outputFolder: 'admin'
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads'
    }
  },
  cmsCallback: (cms) => {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import('tinacms').then(({ RouteMappingPlugin }) => {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        return undefined
      })
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping)
    })

    return cms
  },
})

export default config;