'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components/AudioPlayer.module.scss'
import Link from 'next/link';

const StreamIcon = ({ href, serviceName }: { href: string, serviceName: string }) =>
{
  return (
    <Link
      href={href}
      prefetch={false}
      target='_blank'
      title={`Listen to the song on ${serviceName}`}
    >
      <Image
        className={styles.audioLinkIcon}
        src={`/icons/${serviceName.toLowerCase().split(' ').join('-')}.png`}
        aria-label={`${serviceName} link to song.`}
        alt=''
        width={25}
        height={25}
      />
    </Link>
  )
}

const AudioPlayer = (props: any): JSX.Element =>
{
  const [audio] = useState(new Audio(props.audioPreviewUrl || ''));
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [storedVolumeLevel, setStoredVolumeLevel] = useState(50)
  const progressRef: MutableRefObject<HTMLProgressElement| null> = useRef(null)
  const volumeRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  
  const restart = (): void =>
  {
    audio.pause();
    audio.currentTime = 0;
    if(isPlaying) {
      audio.play();
    }
  }

  const handleVolume = (e: any, mute: boolean = false): void =>
  {
    if(!mute){
      const volumeValue = e.target.valueAsNumber
      audio.volume = (volumeValue / 100)

      if(volumeRef?.current)
      {
        volumeRef.current.style.setProperty('--volume-level', `${volumeValue}%`)
      }
    } else {
      if(volumeRef?.current?.value)
      {
        const currentVolumeValue = parseInt(volumeRef.current.value)

        if(currentVolumeValue > 0)
        {
          // console.log('audio.volume', audio.volume)
          setStoredVolumeLevel(currentVolumeValue / 100)
          audio.volume = 0
          volumeRef.current.value = '0';
          volumeRef.current.style.setProperty('--volume-level', `0%`)
        } else {
          audio.volume = storedVolumeLevel
          volumeRef.current.value = `${(storedVolumeLevel * 100)}%`
          volumeRef.current.style.setProperty('--volume-level', `${storedVolumeLevel * 100}%`)
        }
      }
    }
  }

  useEffect(() => {
    if(isPlaying){
      audio.play();
    } else {
      audio?.pause();
    }
  }, [isPlaying, audio, restart])

  useEffect(() => {
    const updateProgress = (e: any) => {
      if(audio !== null && progressRef?.current !== null) {
        const currentTime = audio?.currentTime;
        const duration = audio?.duration;

        const progress = Math.floor((currentTime / duration) * 100);

        progressRef.current.value = progress
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio?.addEventListener('timeupdate', updateProgress)
    audio?.addEventListener('ended', onEnded)

    return () => {
      audio?.removeEventListener('timeupdate', updateProgress)
      audio?.removeEventListener('ended', onEnded)
    }
  }, [isPlaying, audio, restart])

  return (
    <>
      {!!props.audioPreviewUrl && (
        <>
          <div className={styles.audioPlayer}>
            {props?.albumArt?.length && (
              <div className={styles.imageContainer}>
                <Image
                  src={props.albumArt}
                  alt={`Album cover for ${props.albumName} by ${props.artistName}`}
                  width={125}
                  height={125}
                />
              </div>
            )}
            <div className={props?.albumArt?.length ? styles.infoContainer : styles.infoContainerNoAlbum}>
              <h4 className={styles.trackName} title={props.trackName}>{props.trackName}</h4>
              <h5 className={styles.artistName} title={props.artistName}>{props.artistName}</h5>
              <div className={styles.progressBarContainer}>
                <progress
                  ref={progressRef}
                  className={styles.progressTrack}
                  value='0'
                  max='100'
                />
                <div className={styles.progressBarBackground}>
                  <div className={styles.progressBarForeground} style={{ width: `${progress}%` }}/>
                </div>
              </div>
              <div className={styles.controlsContainer}>
                <button
                  className={styles.restart}
                  type='button'
                  aria-label='Restart playback'
                  onClick={() => restart()}
                >
                  <Image
                    src='/icons/reload.png'
                    alt=''
                    width={25}
                    height={25}
                  />
                </button>
                <button
                  className={styles.play}
                  type='button'
                  aria-label='Play button'
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Image
                    src={ isPlaying ? '/icons/pause.png' : '/icons/playButton.svg'}
                    alt=''
                    width={22}
                    height={35}
                  />
                </button>
                <button
                  className={styles.volumeIcon}
                  type='button'
                  aria-label='Volume control'
                  onClick={(e) => handleVolume(e, true)}
                >
                  <Image
                    src={ audio.volume === 0 ? '/icons/volume-muted.png' : '/icons/volume-on.png'}
                    alt=''
                    width={22}
                    height={35}
                  />
                </button>
                <input
                  ref={volumeRef}
                  className={styles.volume}
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
          <div className={styles.audioLinksContainer}>
            <div className={styles.audioLinks}>
                {props?.spotifyUrl && <StreamIcon href={props.spotifyUrl} serviceName='Spotify'/>}
                {props?.youtubeUrl && <StreamIcon href={props.youtubeUrl} serviceName='Youtube Music'/>}
                {props?.appleMusicUrl && <StreamIcon href={props.appleMusicUrl} serviceName='Apple Music'/>}
                {props?.deezerUrl && <StreamIcon href={props.deezerUrl} serviceName='Deezer'/>}
                {props?.bandcampUrl && <StreamIcon href={props.bandcampUrl} serviceName='Bandcamp'/>}
                {props?.soundcloudUrl && <StreamIcon href={props.soundcloudUrl} serviceName='Soundcloud'/>}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AudioPlayer