'use client'

import Image from 'next/image'
import Link from 'next/link'
import { NavigationLink } from '@/types/amends'
import handleThemeSwitch from '@/actions/ThemeSwitch'
import logos from '@/lib/logos'

type FooterProps = {
  socialPlatforms: any | null
  navigationLinks: NavigationLink[] | null
  theme: string
}

type SocialIconProps = {
  href: any
  alt: string
  title: string
  iconSrc: string
  className?: string
}

const SocialIcon = ({
  href = '',
  title = '',
  iconSrc = '',
  alt = '',
  className = ''
}: SocialIconProps): JSX.Element => {
  return (
    <Link
      href={href}
      className={`m-2 w-7 h-7 ${className}`}
      target='_blank'
      title={title}
      prefetch={false}
    >
      <Image
        src={iconSrc}
        alt={alt}
        width={27}
        height={27}
      />
    </Link>
  )
}

const Footer = ({
  socialPlatforms,
  navigationLinks,
  theme
}: FooterProps): JSX.Element => {
  const handleThemeFormSubmit = async (event: any) => {
    event.target?.form?.requestSubmit()
  }

  return (
    <footer className='max-w-screen-2xl 2xl:mx-auto py-10 px-12 flex flex-col items-center'>
      <hr className='bg-black border-black h-[3px] w-full' />
      <Link
        href='/'
        className='mb-2 md:mb-0 my-5 h-6 w-full relative'
      >
        <Image
          src={logos[theme] || logos['light']}
          alt='Amends home'
          fill
          sizes='25vw'
          style={{ objectFit: 'contain' }}
        />
      </Link>
      {navigationLinks && navigationLinks.length && (
        <ul className='list-none ml-0 mt-3 flex gap-5'>
          {navigationLinks.map((link: NavigationLink, i: number) => (
            <li key={i}>
              <Link
                href={link.url}
                prefetch={false}
                className='inline-block'
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href='/credits'
              prefetch={false}
              className='inline-block'
            >
              Credits
            </Link>
          </li>
        </ul>
      )}
      <p style={{ textAlign: 'center' }}>
        <small>
          Questions, comments, or concerns?{' '}
          <Link href='/contact'>Drop me a line by filling out the contact form.</Link>
        </small>
      </p>
      <div>
        <form
          id='theme-switch-form'
          action={handleThemeSwitch}
        >
          <label htmlFor='theme'>Select theme: </label>
          <select
            onChange={handleThemeFormSubmit}
            name='theme'
            defaultValue={theme}
            className='bg-white dark:bg-black text-black dark:text-yellow px-2 py-1 shadow-md rounded-full cursor-pointer'
          >
            <option value='light'>Light</option>
            <option value='dark'>Dark</option>
          </select>
        </form>
      </div>
      {socialPlatforms && Object.keys(socialPlatforms).length > 0 && (
        <div className='flex justify-center flex-wrap my-5 rounded-3xl drop-shadow-sm bg-white dark:bg-black'>
          {socialPlatforms?.spotifyUrl && (
            <SocialIcon
              href={socialPlatforms.spotifyUrl}
              title="Arcade's Spotify"
              iconSrc='/icons/spotify.png'
              alt="Go to Arcade's Spotify"
            />
          )}
          {socialPlatforms?.githubUrl && (
            <SocialIcon
              href={socialPlatforms.githubUrl}
              title="Arcade's GitHub"
              iconSrc='/icons/github.png'
              className='dark:invert'
              alt="Go to Arcade's Github"
            />
          )}
        </div>
      )}
    </footer>
  )
}

export default Footer
