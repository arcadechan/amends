'use client'

import styles from '../../styles/pages/About.module.css'
import { LineBreak, PinkyPromise } from '../../components'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <section className='bg-yellow text-center relative'>
        <Image
          src='/logo/avatar-w-outline.png'
          className='mx-auto pt-10 z-10'
          width={316}
          height={414}
          alt='Cartoon image of the site author holding a warm cup of coffee with a perplexed empty stare off into the distance.'
        />
        <LineBreak className='my-20'>
          <h1 className={`${styles.aboutTitle} font-candy text-8xl lg:text-9xl`}>
            ARCADE
          </h1>
        </LineBreak>
      </section>
      <section className='px-12 py-4 max-w-screen-2xl, mx-auto font-inter text-xl'>
        <p>
          Hello there! Name&apos;s Arcade and I like wasting my time. I program, do
          photography, and listen to lots of music. Did I mention I waste my time? This is
          a small blog I&apos;ve set up to test Next.JS + TinaCMS, but will also serve as
          a personal log of things I find. I used to write a lot and do doodles here and
          there, and feel like I need something similar again. Hopefully there&apos;s
          stuff here you find worth your time.
        </p>
        <p>Stack details:</p>
        <ul>
          <li>Next.JS (13 App Beta) + Typescript</li>
          <li>Tina CMS</li>
          <li>Tailwind CSS + Sass</li>
          <li>Plaiceholder</li>
          <li>Vercel</li>
          <li>Spotify API</li>
        </ul>
        <p>
          <Link href='https://github.com/arcadechan/amends' target='_blank'>
            Or check out the repo at https://github.com/arcadechan/amends
          </Link>
          <br />
          <Link href='/credits'>Visit the credits page</Link> to get more info on the
          various assets used throughout the site.
          <br />
          <br />
          Thanks for stopping by!
        </p>
        <p>
          Yours,
          <br />
          Arcade
        </p>
        <br />
        <PinkyPromise />
      </section>
    </>
  )
}
