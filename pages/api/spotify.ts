import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method?.toLowerCase() !== 'post') res.status(405)
  
  try
  {
    const reqBody = JSON.parse(req.body);
    const { spotifyTrackCodes } = reqBody;

    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env
    const authCode = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`, 'utf-8').toString('base64')

    const formParams = new URLSearchParams()
    formParams.append('grant_type', 'client_credentials');

    const spotifyTokenResponse = await fetch('https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authCode}`
      },
      body: formParams
    })
    .then(response => response.json())
    .catch(e => console.error(e));
    if(spotifyTokenResponse.hasOwnProperty('access_token'))
    {
      const spotifyTrackResponse = await fetch(`https://api.spotify.com/v1/tracks?ids=${spotifyTrackCodes.join(',')}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${spotifyTokenResponse.access_token}` 
        }
      })
      .then(response => response.json())
      .catch(e => console.error(e));

      if(spotifyTrackResponse.hasOwnProperty('tracks') && spotifyTrackResponse.tracks.length > 0)
      {
        let previewUrls: any = {}

        for(let i = 0; i < spotifyTrackResponse.tracks.length; i++)
        {
          let trackData = spotifyTrackResponse.tracks[i];
          previewUrls[trackData.id] = trackData.preview_url
        }

        res.status(200).json({ previewUrls })
      } else {
        throw Error('Failed to retrieve track data')
      }
    } else {
      throw Error('No Access Token')
    }

    
  }
  catch(e)
  {
    res.status(500).json({ error: 'Something went wrong' })
  }
}