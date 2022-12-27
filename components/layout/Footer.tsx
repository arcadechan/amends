import Link from 'next/link'
import styles from '../../styles/layout/Footer.module.scss'

interface footerPropsI {
    socialPlatforms: any[]|null
}

const getSocialIcon = (platformName: string|null): JSX.Element|string => {
    switch(platformName?.toLowerCase()){
        case 'spotify':
            return ( <img src='/icons/spotify.png' alt=''/> )
        default:
            return platformName || ''
    }
}

const Footer = ({ socialPlatforms } : footerPropsI): JSX.Element => {
    const originYear: number = 2022
    const currentYear: number = new Date().getFullYear()
    const copyRightYear: string = originYear !== currentYear ? `${originYear} - ${currentYear}` : `${originYear}`

    return (
        <footer id={styles.footer} className='max-w-screen-2xl mx-2 2xl:mx-auto py-10 flex flex-col items-center'>
            <img id={styles.logo} src='/logo/logo-black.png' className='mb-2 md:mb-0 my-5'/>
            <p className='my-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {socialPlatforms && (
                <div id={styles.socialBar} className='my-5 py-1.5 rounded-3xl drop-shadow-sm'>
                    {socialPlatforms.map(platform => (
                        <Link href={platform.url || ''} key={platform.name} passHref>
                            <a className='m-3' aria-label={platform.url}>
                                {getSocialIcon(platform.name)}
                            </a>
                        </Link>
                    ))}                    
                </div>
            )}
            <small className='my-5'>&copy; {currentYear} Amends. All Rights Reserved</small>
        </footer>
    )
}

export default Footer