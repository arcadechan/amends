import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/layout/Header.module.scss'
import amendsLogo from '../../public/logo/logo-black.png'

interface headerPropsI {
    navigationLinks: any[]|null
}

const Header = ({ navigationLinks } : headerPropsI): JSX.Element => {
    return (
        <header id={styles.header} className='bg-yellow px-12 sm:px-28 py-l flex items-center'>
            <div id={styles.headerInnerContainer} className='flex flex-col md:flex-row items-center md:justify-between max-w-screen-2xl m-auto'>
                <Link href='/' passHref>
                    <a id={styles.logo} className='mb-2 md:mb-0'>
                        <Image src={amendsLogo} alt='' layout='fill' objectFit='contain'/>
                    </a>
                </Link>
                {navigationLinks && (
                    <nav>
                        {navigationLinks.map(link => (
                            <Link href={link.url || ''} key={link.name} passHref>
                                <a className={`${styles.link} font-inter font-bold px-2 mx-2 uppercase`}>
                                    {link.name || ''}
                                </a>
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header;