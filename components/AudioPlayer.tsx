'use client'

import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/components/AudioPlayer.module.css'
import Link from 'next/link'
import { BlogPostContext } from '../app/post/[slug]/BlogPost'

const StreamIcon = ({ href, serviceName }: { href: string; serviceName: string }) => {
  return (
    <Link
      href={href}
      prefetch={false}
      target='_blank'
      title={`Listen to the song on ${serviceName}`}
    >
      <Image
        className='m-2 inline-block relative'
        src={`/icons/${serviceName.toLowerCase().split(' ').join('-')}.png`}
        aria-label={`${serviceName} link to song.`}
        alt=''
        width={25}
        height={25}
      />
    </Link>
  )
}

const AudioPlayer = (props: any): JSX.Element => {
  const [audio] = useState(
    typeof Audio !== 'undefined' && new Audio(props.audioPreviewUrl || '')
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [storedVolumeLevel, setStoredVolumeLevel] = useState(50)
  const progressRef: MutableRefObject<HTMLProgressElement | null> = useRef(null)
  const volumeRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const { playingTrack, setPlayingTrack } = useContext(BlogPostContext)

  const restart = (): void => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      if (isPlaying) {
        audio.play()
      }
    }
  }

  const handleVolume = (e: any, mute: boolean = false): void => {
    if (audio) {
      if (!mute) {
        const volumeValue = e.target.valueAsNumber
        audio.volume = volumeValue / 100

        if (volumeRef?.current) {
          volumeRef.current.style.setProperty('--volume-level', `${volumeValue}%`)
        }
      } else {
        if (volumeRef?.current?.value) {
          const currentVolumeValue = parseInt(volumeRef.current.value)

          if (currentVolumeValue > 0) {
            setStoredVolumeLevel(currentVolumeValue / 100)
            audio.volume = 0
            volumeRef.current.value = '0'
            volumeRef.current.style.setProperty('--volume-level', `0%`)
          } else {
            audio.volume = storedVolumeLevel
            volumeRef.current.value = `${storedVolumeLevel * 100}%`
            volumeRef.current.style.setProperty(
              '--volume-level',
              `${storedVolumeLevel * 100}%`
            )
          }
        }
      }
    }
  }

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        if (playingTrack === props.trackName) {
          audio.play()
        } else {
          setIsPlaying(false)
          audio.pause()
        }
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio, playingTrack, props.trackName])

  useEffect(() => {
    const updateProgress = (e: any) => {
      if (audio && audio !== null && progressRef?.current !== null) {
        const currentTime = audio?.currentTime
        const duration = audio?.duration

        const progress = Math.floor((currentTime / duration) * 100)

        progressRef.current.value = progress
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    if (audio) {
      audio?.addEventListener('timeupdate', updateProgress)
      audio?.addEventListener('ended', onEnded)
    }

    return () => {
      if (audio) {
        audio?.removeEventListener('timeupdate', updateProgress)
        audio?.removeEventListener('ended', onEnded)
      }
    }
  }, [isPlaying, audio])

  return (
    <BlogPostContext.Consumer>
      {() => (
        <>
          {!!props.audioPreviewUrl && (
            <>
              <div className='flex flex-col flex-nowrap bg-white rounded-2xl max-w-[311px] mx-auto overflow-hidden shadow-lg md:flex-row md:max-w-[400px] md:h-[125px] not-prose'>
                {props?.albumArt?.length && (
                  <div className='w-full md:min-w-[125px] md:min-h-[125px] md:w-[125px] md:h-[125px]'>
                    <Image
                      src={props.albumArt}
                      className='w-full rounded-2xl shadow-lg'
                      alt={`Album cover for ${props.albumName} by ${props.artistName}`}
                      width={125}
                      height={125}
                    />
                  </div>
                )}
                <div
                  className={`p-3 w-full md:w-full md:flex md:flex-col md:justify-between ${
                    props?.albumArt?.length
                      ? styles.infoContainer
                      : styles.infoContainerNoAlbum
                  }`}
                >
                  <h4
                    className={`font-inter text-black whitespace-nowrap text-ellipsis overflow-hidden text-base font-bold md:text-2xl md:font-bold ${
                      props?.albumArt?.length ? 'md:w-[250px]' : 'md:w-full'
                    }`}
                  >
                    {props.trackName}
                  </h4>
                  <h5
                    className={`font-inter text-black whitespace-nowrap text-ellipsis overflow-hidden text-xs md:text-sm ${
                      props?.albumArt?.length ? 'md:w-[250px]' : 'md:w-full'
                    }`}
                  >
                    {props.artistName}
                  </h5>
                  <div className='my-3 h-[6px] md:my-2'>
                    <progress
                      ref={progressRef}
                      className={`${styles.progressTrack} w-full appearance-none bg-transparent rounded-xl`}
                      value='0'
                      max='100'
                    />
                  </div>
                  <div className='flex items-center justify-center gap-7 md:gap-5'>
                    <button
                      className='my-2 md:my-0 md:w-9'
                      type='button'
                      aria-label='Restart playback'
                      onClick={() => restart()}
                    >
                      <Image src='/icons/reload.png' alt='' width={25} height={25} />
                    </button>
                    <button
                      className='my-2 md:my-0 w-7'
                      type='button'
                      aria-label='Play button'
                      onClick={() => {
                        setPlayingTrack(props.trackName)
                        setIsPlaying(!isPlaying)
                      }}
                    >
                      <Image
                        src={isPlaying ? '/icons/pause.png' : '/icons/playButton.svg'}
                        alt=''
                        width={22}
                        height={35}
                      />
                    </button>
                    <button
                      className='my-2 md:my-0 w-10'
                      type='button'
                      aria-label='Volume control'
                      onClick={(e) => handleVolume(e, true)}
                    >
                      <Image
                        src={
                          audio && audio.volume === 0
                            ? '/icons/volume-muted.png'
                            : '/icons/volume-on.png'
                        }
                        alt=''
                        width={22}
                        height={35}
                      />
                    </button>
                    <label
                      htmlFor={`volume-control-${props.trackName
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                      className='sr-only'
                    >
                      Volume
                    </label>
                    <input
                      id={`volume-control-${props.trackName
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                      name={`volume-control-${props.trackName
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                      ref={volumeRef}
                      className={`${styles.volume} bg-transparent cursor-pointer md:w-full`}
                      type='range'
                      min='0'
                      max='100'
                      step='1'
                      defaultValue='50'
                      onChange={handleVolume}
                    />
                  </div>
                </div>
              </div>
              <div className='text-center not-prose'>
                <div className='w-auto bg-white inline-flex max-w-[311px] mx-auto justify-around rounded-full flex-wrap mt-3 relative shadow-lg'>
                  {props?.spotifyUrl && (
                    <StreamIcon href={props.spotifyUrl} serviceName='Spotify' />
                  )}
                  {props?.youtubeUrl && (
                    <StreamIcon href={props.youtubeUrl} serviceName='Youtube Music' />
                  )}
                  {props?.appleMusicUrl && (
                    <StreamIcon href={props.appleMusicUrl} serviceName='Apple Music' />
                  )}
                  {props?.deezerUrl && (
                    <StreamIcon href={props.deezerUrl} serviceName='Deezer' />
                  )}
                  {props?.bandcampUrl && (
                    <StreamIcon href={props.bandcampUrl} serviceName='Bandcamp' />
                  )}
                  {props?.soundcloudUrl && (
                    <StreamIcon href={props.soundcloudUrl} serviceName='Soundcloud' />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </BlogPostContext.Consumer>
  )
}

export default AudioPlayer
