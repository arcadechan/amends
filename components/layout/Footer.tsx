import Link from 'next/link'
import styles from '../../styles/layout/Footer.module.scss'

interface footerPropsI {
    socialPlatforms: any[]|null
}

const Footer = ({ socialPlatforms } : footerPropsI): JSX.Element => {
    const originYear: number = 2022
    const currentYear: number = new Date().getFullYear()
    const copyRightYear: string = originYear !== currentYear ? `${originYear} - ${currentYear}` : `${originYear}`

    return (
        <footer id={styles.footer} className='max-w-screen-2xl m-auto mx-2 py-10 flex flex-col items-center'>
            <img id={styles.logo} src='/logo/logo-black.png' className='mb-2 md:mb-0 my-5'/>
            <p className='my-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {socialPlatforms && (
                <div id={styles.socialBar}>
                    {socialPlatforms.map(platform => (
                        <Link href={platform.url || ''} key={platform.name} passHref>
                            <a>{platform.name || ''}</a>
                        </Link>
                    ))}                    
                </div>
            )}
        </footer>
    )
}

export default Footer