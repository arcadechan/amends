'use client'

import styles from '../../styles/pages/About.module.scss'
import LineBreak from '../../components/LineBreak'
import Image from 'next/image'
import Link from 'next/link'

export default function About()
{
  return (
    <div className={styles.about}>
      <section className={styles.aboutHero}>
        <Image
          src='/logo/avatar-w-outline.png'
          width={316}
          height={414}
          alt='Cartoon image of the site author holding a warm cup of coffee with a perplexed empty stare off into the distance.'
          className={styles.aboutAvatar}
        />
        <LineBreak className={styles.aboutName}>
          <h1 className={styles.aboutTitle}>ARCADE</h1>
        </LineBreak>
      </section>
      <section className={styles.aboutContent}>
        <p>
          Hello there! Name's Arcade and I like wasting my time. I program, do photography, and listen to lots of music. Did I mention I waste my time?
          This is a small blog I've set up to test Next.JS + TinaCMS, but is also to serve as a personal log of things I find and want to keep track of.
          I used to do tons of stream of conscious writing with doodles here and there, and feel like I need something similar again. Hopefully there&apos;s
          stuff here you find worth your time.
        </p>
        <p>
          Stack details:
          <ul>
            <li>Next.JS + Typescript</li>
            <li>Tina CMS</li>
            <li>Netlify</li>
            <li>Spotify API</li>
          </ul>
          <br/>
          <Link href='https://github.com/arcadechan/amends' target='_blank'>Or checkout the repo</Link>
          <br/><br/>
          Thanks for stopping by!
        </p>
        <br/>
        <br/>
        <p>
          Yours,<br/>
          Arcade
        </p>
        <p style={{textAlign: 'center'}}>
          <small>
            Questions, comments, or concerns?<br/>
            <Link href='/contact' style={{textDecoration: 'underline'}}>
              Drop me a line by filling out the contact form'
            </Link>
          </small>
        </p>
      </section>
    </div>
  )
}