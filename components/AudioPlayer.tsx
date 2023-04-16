'use client'

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components/AudioPlayer.module.scss'
import Link from 'next/link';
import { AddIcon } from 'tinacms';

const StreamIcon = ({ href, serviceName }: { href: string, serviceName: string }) =>
{
  return (
    <Link
      href={href}
      prefetch={false}
      target='_blank'
      title={'Listen to the song on'}
    >
      <Image
        className={styles.audioLinkIcon}
        src={`/icons/${serviceName}.png`}
        alt={`${serviceName} link to song.`}
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
  const progressRef: MutableRefObject<HTMLInputElement| null> = useRef(null)
  
  const restart = (): void =>
  {
    audio.pause();
    audio.fastSeek(0);
    if(isPlaying) {
      audio.play();
    }
  }

  const handleVolume = (e: any): void =>
  {
    console.log({e, 'typeof e': e})
    const volumeValue = e.target.valueAsNumber
    audio.volume = volumeValue
  }

  const seekTrack = (e: any): void =>
  {
    console.log({e});
    const seekPosition = e.target.valueAsNumber
    const seekCalc = Math.floor(audio.duration * seekPosition)
    console.log({seekPosition})
    audio.fastSeek(seekCalc)
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
        console.log({currentTime});
        const duration = audio?.duration;
        const progress = Math.floor((currentTime / duration) * 10000) / 10000;
        // setProgress(progress);
        console.log({current: progressRef.current, progress})
        progressRef.current.value = progress.toString()
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
            <div className={styles.imageContainer}>
              <Image
                src={props.albumArt}
                alt={`Album cover for ${props.albumName} by ${props.artistName}`}
                width={125}
                height={125}
              />  
            </div>
            <div className={styles.infoContainer}>
              <h4 className={styles.trackName} title={props.trackName}>{props.trackName}</h4>
              <h5 className={styles.artistName} title={props.artistName}>{props.artistName}</h5>
              <div className={styles.progressBarContainer}>
                <input
                  ref={progressRef}
                  className={styles.progressTrack}
                  type='range'
                  min='0'
                  max='1'
                  step='.01'
                  defaultValue='0'
                  onMouseUp={seekTrack}
                />
                <div className={styles.progressBarBackground}>
                  <div className={styles.progressBarForeground} style={{ width: `${progress}%` }}/>
                </div>
              </div>
              <div className={styles.controlsContainer}>
                <button
                  className={styles.restart}
                  type='button'
                  title='Restart playback'
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
                  title='Play button'
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Image
                    src={ isPlaying ? '/icons/pause.png' : '/icons/playButton.svg'}
                    alt=''
                    width={22}
                    height={35}
                  />
                </button>
                <input
                  className={styles.volume}
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  defaultValue='.5'
                  onChange={handleVolume}
                />
              </div>
            </div>
          </div>
          <div className={styles.audioLinks}>
              {props?.spotifyUrl && <StreamIcon href={props.spotifyUrl} serviceName='spotify'/>}
              {props?.youtubeUrl && <StreamIcon href={props.youtubeUrl} serviceName='youtubeMusic'/>}
              {props?.appleMusicUrl && <StreamIcon href={props.appleMusicUrl} serviceName='appleMusic'/>}
              {props?.deezerUrl && <StreamIcon href={props.deezerUrl} serviceName='deezer'/>}
              {props?.bandcampUrl && <StreamIcon href={props.bandcampUrl} serviceName='bandcamp'/>}
              {props?.soundcloudUrl && <StreamIcon href={props.soundcloudUrl} serviceName='soundcloud'/>}
          </div>
        </>
      )}
    </>
  )
}

export default AudioPlayer