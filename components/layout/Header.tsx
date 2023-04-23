'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/layout/Header.module.scss'
import amendsLogo from '../../public/logo/logo-black.png'
import accordionCollapsed from '../../public/accordion-collapsed.svg'
import accordionClose from '../../public/accordion-close.svg'
import { useEffect, useState, useRef, MutableRefObject } from 'react'
import { motion, useAnimate } from 'framer-motion'

interface headerPropsI {
    navigationLinks: navigationLinksI[]|null
}

interface navigationLinksI {
    url: string
    name: string
}

const Header = ({ navigationLinks } : headerPropsI): JSX.Element => {

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);
    const [ closeAnimationComplete, setCloseAnimationComplete ] = useState(false)
    const [ isDesktop, setIsDesktop ] = useState(false)
    const navRef: MutableRefObject<null | HTMLElement> = useRef(null)

    useEffect(() =>
    {
        setIsDesktop(window.innerWidth >= 768)

        if(isDesktop)
        {
            if(!menuIsOpen)
            {
                setMenuIsOpen(true)
            }
        }

        const onResize = (): void => {
            setIsDesktop(window.innerWidth >= 768)

            if(isDesktop)
            {
                if(!menuIsOpen)
                {
                    setMenuIsOpen(true)
                }
            }
            else
            {
                setMenuIsOpen(false)
            }
        }
        
        window.addEventListener('resize', onResize)

        return (): void => window.removeEventListener('resize', onResize)
    }, [ menuIsOpen, isDesktop])

    const variants = {
        navMenuClosed: {
            top: isDesktop ? '0px' : '-100%',
            display: isDesktop ? 'flex' : 'block',
            boxShadow: '0 0 0 0 rgb(0, 0, 0, 0), 0 0px 0px 0px rgb(0, 0, 0, 0)',
            transition: {
                duration: isDesktop ? 0 : .35,
            },
            transitionEnd: {
                display: 'none',
            }
        },
        navMenuOpen: {
            top: isDesktop ? '0px' : '75px',
            display: isDesktop ? 'flex' : 'block',
            boxShadow: isDesktop ? '0 0 0 0 rgb(0, 0, 0, 0), 0 0px 0px 0px rgb(0, 0, 0, 0)' : '0 20px 25px -5px rgb(0, 0, 0, .1), 0 8px 10px -6px rgb(0, 0, 0, .1)',
            transition: {
                type: 'tween',
                ease: 'easeInOut',
                duration: isDesktop ? 0 : .35,
                staggerChildren: isDesktop ? 0 : .08,
                delayChildren: isDesktop ? 0 : .15,
                staggerDirection: isDesktop ? 1 : -1
            },
            transitionEnd: {
                display: isDesktop ? 'flex' : 'block'
            }
        }
    }

    return (
        <header className='h-[75px] sticky top-0 z-50 bg-yellow'>
            <div className='max-w-screen-2xl m-auto w-full h-full md:flex justify-between items-center'>
                <div className='flex items-center justify-between px-12 py-l z-20 w-full h-full relative md:w-auto'>
                    <Link 
                        href='/'
                        className='h-[30px] w-[150px] relative'
                        aria-label='Amends Logo. Link to home'
                        onClick={() => setMenuIsOpen(false)}
                    >
                        <Image
                            src={amendsLogo}
                            alt='Amends home'
                            fill
                            sizes='25vw'
                            style={{ objectFit: 'contain' }}
                        />
                    </Link>
                    {navigationLinks && (
                        <button
                            id='nav-menu-accordion'
                            className='d-block md:hidden flex items-center p-4'
                            aria-expanded={menuIsOpen}
                            aria-controls='navMenu'
                            aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuIsOpen(!menuIsOpen)}
                        >
                            <Image
                                src={menuIsOpen ? accordionClose : accordionCollapsed}
                                alt=''
                                width={25}
                                aria-hidden='true'
                            />
                        </button>
                    )}
                </div>
                <motion.nav
                    id='navMenu'
                    ref={navRef}
                    className='bg-yellow w-full absolute left-1/2 -translate-x-1/2 z-10 md:pr-10 md:shadow-none md:flex md:relative md:top-0 md:left-0 md:translate-x-0 md:items-center md:justify-end'
                    aria-labelledby='nav-menu-accordion'
                    hidden={!menuIsOpen && closeAnimationComplete}
                    initial={false}
                    animate={ menuIsOpen ? 'navMenuOpen' : 'navMenuClosed'}
                    variants={variants}
                    onAnimationStart={(e) => {e === 'navMenuOpen' && setCloseAnimationComplete(false) }}
                    onAnimationComplete={(e) => {
                        if(e === 'navMenuOpen') setCloseAnimationComplete(false)
                        if(e === 'navMenuClosed') setCloseAnimationComplete(true)
                    }}
                >
                    <ul className='list-none ml-0 md:flex'>
                        {navigationLinks && navigationLinks.map(link => (                    
                            <motion.li
                                key={link.name}
                                variants={{
                                    navMenuClosed: {
                                        opacity: 0
                                    },
                                    navMenuOpen: {
                                        opacity: 1
                                    }
                                }}
                            >
                                <Link
                                    href={link.url || ''}
                                    className='font-inter font-bold uppercase text-black block p-3 my-2 text-center hover:underline hover:underline-offset-[3px] hover:decoration-2 md:inline-block md:p-3 md:ml-4'
                                    onClick={() => setMenuIsOpen(false)}
                                >
                                    {link.name || ''}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </motion.nav>
            </div>
        </header>
    )
}

export default Header;