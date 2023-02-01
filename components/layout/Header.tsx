import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/layout/Header.module.scss'
import amendsLogo from '../../public/logo/logo-black.png'
import accordionCollapsed from '../../public/accordion-collapsed.svg'
import accordionClose from '../../public/accordion-close.svg'
import { useEffect, useState } from 'react'

interface headerPropsI {
    navigationLinks: navigationLinksI[]|null
}

interface navigationLinksI {
    url: string
    name: string
}

const Header = ({ navigationLinks } : headerPropsI): JSX.Element => {

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);
    useEffect(() =>
    {
        const isDesktop = () =>  window.innerWidth >= 768
        const onResize = () => {
            if(isDesktop())
            {
                setMenuIsOpen(true)
            }
            else
            {
                setMenuIsOpen(false)
            }
        }
        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
    }, [])

    return (
        <header id={styles.header} className='bg-yellow'>
            <div className='max-w-screen-2xl m-auto w-full h-full md:flex justify-between items-center'>
                <div id={styles.headerInnerContainer} className='flex items-center justify-between px-12 py-l'>
                    <Link 
                        id={styles.logo}
                        href='/'
                        aria-label='Amends Logo. Link to home'
                    >
                        <Image
                            src={amendsLogo}
                            alt='Amends home'
                            layout='fill'
                            objectFit='contain'
                        />
                    </Link>
                    {navigationLinks && (
                        <>
                            <button
                                id='nav-menu-accordion'
                                className='d-block md:hidden flex items-center'
                                aria-expanded={menuIsOpen}
                                aria-controls={styles.navMenu}
                                aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
                                onClick={() => setMenuIsOpen(!menuIsOpen)}
                            >
                                <Image
                                    src={menuIsOpen ? accordionClose : accordionCollapsed}
                                    alt=''
                                    width={25}
                                    height={25}
                                    layout='fixed'
                                    aria-hidden='true'
                                />
                            </button>
                        </>
                    )}
                </div>
                <nav
                    id={styles.navMenu}
                    className={`hidden md:d-block md:pr-10 ${ menuIsOpen ? styles.navMenuOpen : styles.navMenuClosed }`}
                    aria-labelledby='nav-menu-accordion'
                    hidden={!menuIsOpen}
                >
                    {navigationLinks && navigationLinks.map(link => (
                        <Link
                            href={link.url || ''}
                            key={link.name}
                            className={styles.link}
                        >
                            {link.name || ''}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header;