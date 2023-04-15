'use client'

import { useEffect, useState } from 'react';
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
  
  const restart = (): void => {
    audio.pause();
    audio.fastSeek(0);
    if(isPlaying) {
      audio.play();
    }
  }

  useEffect(() => {
    if(isPlaying){
      audio.play()
    } else {
      audio?.pause();
    }
  }, [isPlaying, audio, restart])

  useEffect(() => {
    const updateProgress = (e: any) => {
      if(audio !== null) {
        const currentTime = audio?.currentTime;
        const duration = audio?.duration;
        const progress = Math.floor((currentTime / duration) * 100);
        setProgress(progress);
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
                <div className={styles.progressBarBackground}>
                  <div className={styles.progressBarForeground} style={{ width: `${progress}%` }}/>
                </div>
              </div>
              <div className={styles.controlsContainer}>
                <button
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