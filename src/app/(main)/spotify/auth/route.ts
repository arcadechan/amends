export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env

  const base64EncodedAuth = Buffer.from(
    `${SPOTIFY_CLIENT_ID!}:${SPOTIFY_CLIENT_SECRET!}`,
    'utf-8'
  ).toString('base64')

  // console.log({base64EncodedAuth})

  const getAccessToken = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64EncodedAuth}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN!
    }),
    next: {
      revalidate: 3000 // Spotify access tokens last one hour
    }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
    })

  return Response.json(getAccessToken)
}
