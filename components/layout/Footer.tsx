import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/layout/Footer.module.scss'
import amendsLogo from '../../public/logo/logo-black.png'

interface footerProps {
    socialPlatforms: any|null
}

interface SocialIconProps {
    href: any;
    title: string;
    iconSrc: string;
}

const SocialIcon = ({href = '', title = '', iconSrc = ''}: SocialIconProps): JSX.Element => {
    return (
        <Link
            href={href}
            className='m-2 w-7 h-7'
            target='_blank'
            title={title}
        >
            <Image
                src={iconSrc}
                alt=''
                width={27}
                height={27}
            />
        </Link>
    )
}

const Footer = ({ socialPlatforms } : footerProps): JSX.Element => {
    const currentYear: number = new Date().getFullYear()

    return (
        <footer id={styles.footer} className='max-w-screen-2xl 2xl:mx-auto py-10 px-12 flex flex-col items-center'>
            <hr id={styles.footerLine}/>
            <Link
                href='/'
                id={styles.logo}
                className='mb-2 md:mb-0 my-5'
            >
                <Image
                    src={amendsLogo}
                    alt='Amends home'
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </Link>
            <p className='my-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {socialPlatforms && Object.keys(socialPlatforms).length > 0 && (
                <div id={styles.socialBar} className='flex justify-center flex-wrap my-5 rounded-3xl drop-shadow-sm'>
                    {socialPlatforms?.spotifyUrl && (
                        <SocialIcon href={socialPlatforms.spotifyUrl} title="Arcade's Spotify" iconSrc='/icons/spotify.png'/>
                    )}
                    {socialPlatforms?.githubUrl && (
                        <SocialIcon href={socialPlatforms.githubUrl} title="Arcade's GitHub" iconSrc='/icons/github.png'/>
                    )}
                </div>
            )}
            <small className='my-5'>&copy; {currentYear} Amends. All Rights Reserved</small>
        </footer>
    )
}

export default Footer