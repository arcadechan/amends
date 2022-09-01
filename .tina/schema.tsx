
import { defineSchema, defineConfig, wrapFieldsWithMeta } from '../node_modules/tinacms'
import { client } from './__generated__/client'

const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: process.env.TINA_TOKEN,
    clientId: process.env.TINA_CLIENT_ID,
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH ||
      process.env.HEAD ||
      'main'
  },
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
          description: 'Max character count: 160',
          ui: {
            component: wrapFieldsWithMeta(({ field, input, meta, ...props}) => {
              return (
                <div>
                  <textarea
                    name="pageDescription"
                    id="pageDescription"
                    rows={3}
                    style={{width: '100%', padding: '.5rem'}}
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
              name: 'spotify',
              label: 'Spotify Song Embed',
              fields: [
                {
                  name: 'spotifyCode',
                  label: 'Spotify Code',
                  type: 'string'
                }
              ],
            },
          ],
        },
      ],
    },
  ],
})

export default schema

// Your tina config

export const tinaConfig = defineConfig({
  client,
  schema,
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

