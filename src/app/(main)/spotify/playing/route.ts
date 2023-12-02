import { baseUrl } from '../baseUrl'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // get refresh token
  const getAccessToken = await fetch(`${baseUrl}/spotify/auth`, {
    next: {
      revalidate: 3000
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
    })

  if (!getAccessToken?.access_token) {
    return Response.error()
  }

  const nowPlaying = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${getAccessToken.access_token}`
      },
      cache: 'no-cache'
    }
  )
    .then(async (res) => {
      if (res.status === 204) {
        return {
          status: 204,
          msg: 'Nothing is playing at the moment'
        }
      } else if (res.status === 200) {
        const response = await res.json()

        delete response?.actions
        delete response?.context

        return {
          status: 200,
          data: response
        }
      } else {
        return {
          status: res.status,
          msg: res.statusText
        }
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        status: 500,
        msg: 'Something went wrong'
      }
    })

  return Response.json(nowPlaying)
}
