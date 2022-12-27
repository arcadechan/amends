import { client } from '../.tina/__generated__/client'

const getSiteMeta = async (): Promise<any|null> => {
  return await client.request({
    query: `
      query getSiteMeta {
        meta(relativePath: "meta.mdx") {
          navigationLinks { name, url }
          socialPlatforms { name, url }
        }
      }
    `
  })
  .then((res: any) => {
    return res?.data?.meta
  })
  .catch((e: any): null => {
    console.error(e)
    return null
  });
}

export default getSiteMeta;