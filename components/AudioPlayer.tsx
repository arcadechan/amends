import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/components/AudioPlayer.module.scss'

const AudioPlayer = (props: any): JSX.Element =>
{
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioPlayerRef = useRef(null)

  useEffect(() => {
    if(isPlaying){
      audioPlayerRef?.current?.play();
    } else {
      audioPlayerRef?.current?.pause();
    }
  }, [isPlaying])

  useEffect(() => {
    const updateProgress = (e) => {
      const currentTime = audioPlayerRef?.current?.currentTime;
      const duration = audioPlayerRef?.current?.duration;
      const progress = Math.floor((currentTime / duration) * 100);
      setProgress(progress);
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audioPlayerRef?.current?.addEventListener('timeupdate', updateProgress)
    audioPlayerRef?.current?.addEventListener('ended', onEnded)

    return () => {
      audioPlayerRef?.current?.removeEventListener('timeupdate', updateProgress)
      audioPlayerRef?.current?.removeEventListener('ended', onEnded)
    }
  }, [isPlaying])

  return (
    <>
      {!!props.audioPreviewUrl && (
        <div className={styles.audioPlayer}>
          <div className={styles.imageContainer}>
            <Image
              src={props.albumArt}
              alt={`${props.artistName}`}
              width={125}
              height={125}
            />  
          </div>
          <div className={styles.infoContainer}>
            <h4 className={styles.trackName}>{props.trackName}</h4>
            <h5 className={styles.artistName}>{props.artistName}</h5>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarBackground}>
                <div className={styles.progressBarForeground} style={{ width: `${progress}%` }}/>
              </div>
            </div>
            <div className={styles.controlsContainer}>
              <button
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
            <audio ref={audioPlayerRef} controls src={props.audioPreviewUrl}></audio>
          </div>
        </div>
      )}
    </>
  )
}

export default AudioPlayer