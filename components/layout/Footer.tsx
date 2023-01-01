import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/layout/Footer.module.scss'

interface footerPropsI {
    socialPlatforms: any|null
}

const SocialIcon = (href: any = '', title: string = '', iconSrc: string = ''): JSX.Element => {
    return (
        <Link href={href} passHref>
            <a className='m-2 w-7' target='_blank' title={title}>
                <Image
                    src={iconSrc}
                    alt=''
                    width={27}
                    height={27}
                />
            </a>
        </Link>
    )
}

const Footer = ({ socialPlatforms } : footerPropsI): JSX.Element => {
    const originYear: number = 2022
    const currentYear: number = new Date().getFullYear()
    const copyRightYear: string = originYear !== currentYear ? `${originYear} - ${currentYear}` : `${originYear}`

    return (
        <footer id={styles.footer} className='max-w-screen-2xl mx-2 2xl:mx-auto py-10 flex flex-col items-center'>
            <img id={styles.logo} src='/logo/logo-black.png' className='mb-2 md:mb-0 my-5'/>
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