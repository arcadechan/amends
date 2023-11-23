'use client'

import { createContext, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import hamburgerIconBlack from 'public/icons/hamburger-menu-black.svg'
import hamburgerIconYellow from 'public/icons/hamburger-menu-yellow.svg'
import { NavigationLink } from '@/types/amends'
import { motion, AnimatePresence } from 'framer-motion'
import logos from '@/lib/logos'

type HeaderProps = {
  navigationLinks: NavigationLink[] | null
  theme: string
}

const HamburgerMenuContext = createContext('light')

const DynamicHamburger = dynamic(() => import('../HamburgerMenu'), {
  ssr: false,
  loading: () => {
    const theme = useContext(HamburgerMenuContext)
    let menuIconStatic = hamburgerIconBlack

    switch (theme) {
      case 'dark':
        menuIconStatic = hamburgerIconYellow
        break
      case 'light':
      default:
        menuIconStatic = hamburgerIconBlack
        break
    }

    return (
      <div className='block md:hidden p-2'>
        <Image
          src={menuIconStatic}
          alt=''
          width={55}
          height={55}
          priority={true}
        />
      </div>
    )
  }
})

const Header = ({ navigationLinks, theme }: HeaderProps): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const variants = {
    navMenuClosed: {
      top: '-100%',
      boxShadow: '0 0 0 0 rgb(0, 0, 0, 0), 0 0px 0px 0px rgb(0, 0, 0, 0)',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.1
      },
      transitionEnd: {
        display: 'none'
      }
    },
    navMenuOpen: {
      top: '75px',
      boxShadow: '0 20px 25px -5px rgb(0, 0, 0, .1), 0 8px 10px -6px rgb(0, 0, 0, .1)',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.1,
        staggerChildren: 0.08,
        delayChildren: 0.1,
        staggerDirection: -1
      },
      transitionEnd: {
        display: 'block'
      }
    }
  }

  useEffect(() => {
    const handleResize = async () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isDesktop])

  useEffect(() => {
    const desktopWidth = window.innerWidth >= 768

    if (desktopWidth) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  }, [isDesktop])

  return (
    <header
      className='bg-yellow dark:bg-black h-[75px] sticky top-0 z-[999]'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget) && menuIsOpen) {
          setMenuIsOpen(false)
        }
      }}
    >
      <div className='max-w-screen-2xl m-auto w-full h-full md:flex justify-between items-center'>
        <div className='bg-yellow dark:bg-black flex items-center justify-between px-12 py-1 w-full h-full relative md:w-auto z-[999]'>
          <Link
            href='/'
            id='amends-logo'
            className='h-[30px] w-[150px] relative justify-self-start'
            aria-label='Link to home'
          >
            <Image
              src={logos[theme]}
              className='object-contain w-full min-w-[150px]'
              alt='Amends Logo'
              width={1019}
              height={193}
              sizes='25vw'
              priority
            />
          </Link>
          <HamburgerMenuContext.Provider value={theme}>
            <DynamicHamburger
              menuIsOpen={menuIsOpen}
              setMenuIsOpen={setMenuIsOpen}
              theme={theme}
            />
          </HamburgerMenuContext.Provider>
        </div>
        {isDesktop ? (
          <nav
            id='navMenu'
            className='hidden md:flex bg-yellow dark:bg-black w-full pr-10 shadow-none relative top-0 left-0 items-center justify-end'
            aria-labelledby='navMenuAccordion'
          >
            <ul className='list-none ml-0 flex'>
              {navigationLinks &&
                navigationLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url || ''}
                      className='font-inter font-bold uppercase text-black dark:text-yellow my-2 text-center hover:underline hover:underline-offset-[3px] hover:decoration-2 inline-block p-3 ml-4'
                    >
                      {link.name || ''}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        ) : (
          <AnimatePresence initial={false}>
            <motion.nav
              id='navMenu'
              className='block md:hidden bg-yellow dark:bg-black w-full absolute left-1/2 -translate-x-1/2 z-[998]'
              aria-labelledby='navMenuAccordion'
              animate={menuIsOpen ? 'navMenuOpen' : 'navMenuClosed'}
              variants={variants}
            >
              <ul className='list-none ml-0'>
                {navigationLinks &&
                  navigationLinks.map((link: any, i: number) => (
                    <motion.li
                      key={i}
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
                        className='font-inter font-bold uppercase text-black dark:text-yellow block p-3 my-2 text-center hover:underline hover:underline-offset-[3px] hover:decoration-2'
                        onMouseUp={() => setMenuIsOpen(false)}
                      >
                        {link.name || ''}
                      </Link>
                    </motion.li>
                  ))}
              </ul>
            </motion.nav>
          </AnimatePresence>
        )}
      </div>
    </header>
  )
}

export default Header
