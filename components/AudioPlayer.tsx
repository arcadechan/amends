import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components/AudioPlayer.module.scss'

const AudioPlayer = (props: any): JSX.Element =>
{
  const [audio] = useState(new Audio(props.audioPreviewUrl || ''));
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const restart = (): void => {
    audio.pause();
    audio.fastSeek(0);
    audio.play();
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
                onClick={() => restart()}
              >
                Replay
              </button>
              <button
                type='button'
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
            {/* <audio ref={audioPlayerRef} src={props.audioPreviewUrl}></audio> */}
          </div>
        </div>
      )}
    </>
  )
}

export default AudioPlayer