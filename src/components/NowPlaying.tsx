'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type TrackInfo = {
  progress_ms: number
  is_playing: boolean
  item: {
    album: {
      album_type: string
      total_tracks: number
      available_markets: string[]
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: {
        url: string
        height?: number
        width?: number
      }[]
      name: string
      release_date: string
      release_date_precision: string
      restrictions: {
        reason: string
      }
      type: string
      uri: string
      artists: {
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }[]
    }
    artists: {
      external_urls: {
        spotify: string
      }
      followers: {
        href?: string
        total: number
      }
      genres: string[]
      href: string
      id: string
      images: {
        url: string
        height?: number
        width?: number
      }[]
      name: string
      popularity: number
      type: string
      uri: string
    }[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
      isrc: string
      ean: string
      upc: string
    }
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    is_playable: boolean
    linked_from: {}
    restrictions: {
      reason: string
    }
    name: string
    popularity: number
    preview_url?: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
  }
}

export default function NowPlaying() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
  const [progress, setProgress] = useState(0)

  const getNowPlaying = async (): Promise<any> => {
    const nowPlaying = await fetch('/spotify/playing')
      .then((res) => res.json())
      .catch((error) => {
        console.error(error)
      })

    if (nowPlaying.status === 200) {
      const { data }: { data: TrackInfo } = nowPlaying

      if (data.is_playing) {
        setIsPlaying(true)
        setTrackInfo({
          progress_ms: data.progress_ms,
          is_playing: data.is_playing,
          item: data.item
        })
      }
    } else {
      setIsPlaying(false)
      setTrackInfo(null)
    }
  }

  // Initial hook for first call
  useEffect(() => {
    getNowPlaying()
  }, [])

  // Second hook for recursive checks
  useEffect(() => {
    if (isPlaying && trackInfo) {
      // If the song is already more 2 seconds in set progress to what spotify reports
      // otherwise just set to 0
      let progress = trackInfo.progress_ms > 2000 ? trackInfo.progress_ms : 0
      setProgress(progress)

      const interval = setInterval(() => {
        // Check if song progress and duration match
        if (progress < trackInfo.item.duration_ms) {
          // Increase the progress by one second
          progress += 1000
          setProgress(progress)
        } else {
          // Else clear interval and refetch new track stuff
          clearInterval(interval)
          getNowPlaying()
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }

    return () => {}
  }, [isPlaying, trackInfo])

  let percent = 0
  if (trackInfo) {
    percent = Math.floor((progress / trackInfo?.item.duration_ms) * 100)

    if (percent > 100) {
      percent = 100
    }
  }

  if (isPlaying && trackInfo) {
    return (
      <section className='sticky top-[75px] z-[998]'>
        <div className='relative bg-yellow dark:bg-black h-[3px] w-full'>
          <div
            className='absolute top-0 left-0 bg-black dark:bg-yellow h-[3px] transition-width ease-in-out duration-150'
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className='p-2 bg-yellow dark:bg-black text-black dark:text-yellow flex justify-between'>
          <div className='flex items-center gap-2'>
            <Link
              className='m-0 text-sm'
              href={trackInfo.item.external_urls.spotify}
              target='_blank'
              aria-label={`Listen to ${trackInfo.item.name} by ${trackInfo.item.artists[0].name} on Spotify.`}
            >
              <Image
                className='w-10 rounded-md inline-block mr-3'
                src={trackInfo?.item.album?.images[0].url || ''}
                alt=''
                height={150}
                width={150}
                style={{ objectFit: 'contain' }}
              />
              <span className='font-bold'>{trackInfo.item.name}</span>
              <span className='font-bold'> - </span>
              <span className='font-normal'>{trackInfo.item.artists[0].name}</span>
            </Link>
          </div>
          <div className='flex items-end'>
            <h3 className='italic text-xs'>Now Playing on Spotify</h3>
          </div>
        </div>
      </section>
    )
  } else {
    return null
  }
}
