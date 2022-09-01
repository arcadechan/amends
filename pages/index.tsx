import type { NextPage } from 'next'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { client } from '../.tina/__generated__/client'
import Spotify from '../components/spotify'

const components: any = {
  spotify: Spotify
}

const transformSpotifyTrackCodes = async (postResponseData: any) => {
  let data = postResponseData;
  // console.log('okay!');
  const { children } = postResponseData.post.body
  // console.log({children});
  if(!!children && children.length > 0)
  {
    // console.log('in child loop block')
    // Find ALL spotify codes
    const spotifyTrackCodes: Array<string> = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if(child?.type === 'mdxJsxFlowElement' && child?.name === 'spotify')
      {
        // console.log('in spotify check')
        if(child.props?.spotifyCode && child.props.spotifyCode.length > 0)
        {
          spotifyTrackCodes.push(child.props.spotifyCode)
        }
      }
    }
    // console.log({spotifyTrackCodes});
    // return data;

    // console.log({'spotifyTrackCodesToSendToSpotifyApi': spotifyTrackCodes})
    // Exit early if no spotifyTrackCodes
    if(spotifyTrackCodes.length === 0) return data;

    // HIT THE FUCKING API
    // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
    const spotifyApiResponse = await fetch(`${URL}/api/spotify`, 
    {
      method: 'POST',
      body: JSON.stringify({ spotifyTrackCodes })
    })
    .then(res => res.json())
    .catch(e => console.error(e))

    console.log({spotifyApiResponse});

    if(!spotifyApiResponse.hasOwnProperty('previewUrls'))
    {
      return data;
    }

    const previewUrls: any = spotifyApiResponse.previewUrls

    // Update
    data.post.body = children.map((child: any) =>
    {
      if(child.type === 'mdxJsxFlowElement' && child?.name === 'spotify')
      {
        return {
          type: child.type,
          name: child.name,
          children: child.children,
          props: {
            spotifyCode: child.props.spotifyCode,
            previewUrl: previewUrls[child.props.spotifyCode]
          }
        }
      }

      return child
    })

    return data
  }

  return data
}

export const getStaticProps = async (ctx: any) => {
  const postResponse = await client.queries.post({
    relativePath: 'music/my-first-post.mdx'
  });

  // console.log(JSON.stringify({'postResponse.data.post.body': postResponse.data.post.body},null,2))

  // console.log('something');
  const data = await transformSpotifyTrackCodes(postResponse.data)
  // console.log({data});

  return {
    props: {
      data: data,
      query: postResponse.query,
      variables: postResponse.variables
    }
  }
}

const Home: NextPage = (props: any) => {
  const { data, isLoading } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className='container my-5 m-auto'>
        <h1>Hello</h1>
        <TinaMarkdown components={components} content={data.post.body}></TinaMarkdown>
      </div>
    </>
  )
}

export default Home
