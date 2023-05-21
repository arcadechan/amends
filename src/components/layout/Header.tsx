'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import amendsLogoBlack from 'public/logo/logo-black.png'
import amendsLogoYellow from 'public/logo/logo-yellow.png'
import hamburgerIcon from 'public/icons/hamburger-menu-static.svg'
import { NavigationLink } from 'types/amends'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { AppContext } from '../layout/Layout'

type HeaderProps = {
  navigationLinks: NavigationLink[] | null
}

type ThemeSwitchProps = {
  switchTheme(): void
  prefersDark: boolean
}

const DynamicHamburger = dynamic(() => import('../HamburgerMenu'), {
  ssr: false,
  loading: () => (
    <div className='block md:hidden p-2'>
      <Image
        src={hamburgerIcon}
        alt=''
        width={55}
        height={55}
      />
    </div>
  )
})

const ThemeSwitchButton = ({ switchTheme, prefersDark }: ThemeSwitchProps) => (
  <div className='py-2 pl-5 pr-2'>
    <input
      id='checkbox'
      type='checkbox'
      className='opacity-0 absolute'
      checked={prefersDark}
      readOnly
    />
    <label
      htmlFor='checkbox'
      className='bg-black dark:bg-lightBlack  w-12 h-6 rounded-2xl relative p-1 cursor-pointer flex justify-between items-center'
      onClick={switchTheme}
    >
      <span className='text-xs select-none'>🔆</span>
      <span className='text-xs select-none'>🌙</span>
      <span
        className={`ball bg-lace dark:bg-yellow w-5 h-5 absolute left-[2px] top-[2px] rounded-full transition-transform duration-150 ease-in-out ${
          prefersDark ? 'translate-x-6' : ''
        }`}
      ></span>
    </label>
  </div>
)

const Header = ({ navigationLinks }: HeaderProps): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const variants = {
    navMenuClosed: {
      top: '-100%',
      boxShadow: '0 0 0 0 rgb(0, 0, 0, 0), 0 0px 0px 0px rgb(0, 0, 0, 0)',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
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
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.15,
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

  const { prefersDark, setPrefersDark } = useContext(AppContext)

  const switchTheme = () => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        setPrefersDark(false)
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        setPrefersDark(true)
      }
    }
  }

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
              src={prefersDark ? amendsLogoYellow : amendsLogoBlack}
              className='object-contain w-full min-w-[150px]'
              alt='Amends Logo'
              width={1019}
              height={193}
              sizes='25vw'
              priority
            />
          </Link>
          {!isDesktop && (
            <ThemeSwitchButton
              switchTheme={switchTheme}
              prefersDark={prefersDark}
            />
          )}
          <DynamicHamburger
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            prefersDark={prefersDark}
          />
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
        {isDesktop && (
          <ThemeSwitchButton
            switchTheme={switchTheme}
            prefersDark={prefersDark}
          />
        )}
      </div>
    </header>
  )
}

export default Header
