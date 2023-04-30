'use client'

import Image from 'next/image'
import Link from 'next/link'
import { navigationLink } from '../../@types/amends'
import amendsLogo from '../../public/logo/logo-black.png'

type footerProps = {
  socialPlatforms: any | null
  navigationLinks: navigationLink[] | null
}

type SocialIconProps = {
  href: any
  alt: string
  title: string
  iconSrc: string
}

const SocialIcon = ({
  href = '',
  title = '',
  iconSrc = '',
  alt = ''
}: SocialIconProps): JSX.Element => {
  return (
    <Link
      href={href}
      className='m-2 w-7 h-7'
      target='_blank'
      title={title}
      prefetch={false}
    >
      <Image src={iconSrc} alt={alt} width={27} height={27} />
    </Link>
  )
}

const Footer = ({ socialPlatforms, navigationLinks }: footerProps): JSX.Element => {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className='max-w-screen-2xl 2xl:mx-auto py-10 px-12 flex flex-col items-center'>
      <hr className='bg-black h-[3px] w-full' />
      <Link href='/' className='mb-2 md:mb-0 my-5 h-6 w-full relative'>
        <Image
          src={amendsLogo}
          alt='Amends home'
          fill
          sizes='25vw'
          style={{ objectFit: 'contain' }}
        />
      </Link>
      {navigationLinks && navigationLinks.length && (
        <ul className='list-none ml-0 mt-3 flex gap-5'>
          {navigationLinks.map((link: navigationLink, i: number) => (
            <li key={i}>
              <Link href={link.url} prefetch={false} className='inline-block'>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href='/credits' prefetch={false} className='inline-block'>
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
      {socialPlatforms && Object.keys(socialPlatforms).length > 0 && (
        <div className='flex justify-center flex-wrap my-5 rounded-3xl drop-shadow-sm bg-white'>
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
              alt="Go to Arcade's Github"
            />
          )}
        </div>
      )}
      <small className='my-5'>&copy; {currentYear} Amends. All Rights Reserved</small>
    </footer>
  )
}

export default Footer
