'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/pages/standalonePages/DigitalSpellcraft.module.css'
import { Seaweed_Script } from 'next/font/google'

const rubikPuddles = Seaweed_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rubik'
})

const DigitalSpellcraft = (): JSX.Element => {
  return (
    <div className={`${rubikPuddles.variable} ${styles.container}`}>
      <video
        className={`${styles.video} fixed top-0 left-0 min-w-full min-h-full -z-1 pointer-events-none object-cover`}
        data-video='0'
        muted
        autoPlay
        playsInline
        loop
      >
        <source
          src='/pages/digitalSpellcraft/worldBackground.mp4'
          type='video/mp4'
        />
      </video>
      <section className='relative mx-auto my-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-[#090a0e] border-black border-[1px] w-80'>
        <div className='relative w-full h-80'>
          <Image
            src='/pages/digitalSpellcraft/cyberwitch.jpg'
            className={`${styles.necromancer} object-cover`}
            alt=''
            fill
          />
        </div>
        <div className='p-2 text-center'>
          <h1 className={`${styles.rubik} text-yellow text-2xl mb-3`}>
            Digital Spellcraft
          </h1>
          <p className='prose text-lace font-thin text-sm mb-3'>
            Programming is modern-day witchcraft/magick. Through the skillful use of
            various languages and their runes we can cast complex hexes and spells
            (scripts and functions), and ultimately conjure something out of nothing.
            Programming can even be seen as a form of modern-day necromancy, because that
            which is void of life, the 1s and 0s, when given structure or restructured by
            the hands of wizards and witches (programmers), allows the digital realm to
            come to life.
          </p>
          <Link
            href='/post/digital-spellcraft'
            className='text-yellow underline'
          >
            Read more about digital spellcraft.
          </Link>
        </div>
      </section>
      <section className='relative bg-[#090a0e] lg:bg-none inline-block lg:inline left-1/2 lg:left-[unset] -translate-x-1/2 lg:translate-x-0 lg:absolute lg:bottom-0 lg:right-0 text-lace px-2 text-center lg:text-center mb-3 lg:mb-0 border-black lg:border-none border-[1px]'>
        <small className='block py-2'>
          <Link
            href='https://www.pexels.com/@pressmaster/'
            className='underline'
            target='_blank'
          >
            Original world video by Pressmaster
          </Link>
        </small>
      </section>
    </div>
  )
}

export default DigitalSpellcraft
