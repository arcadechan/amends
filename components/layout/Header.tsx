'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import amendsLogo from '../../public/logo/logo-black.png'
import { navigationLink } from '../../@types/amends'
import { motion, AnimatePresence } from 'framer-motion'

type HeaderProps = {
  navigationLinks: navigationLink[] | null
}

const DynamicHamburger = dynamic(() => import('../HamburgerMenu'), {
  ssr: false,
  loading: () => (
    <div className='block md:hidden p-2'>
      <Image src='/icons/hamburger-menu-static.svg' alt='' width={55} height={55} />
    </div>
  )
})

const Header = ({ navigationLinks }: HeaderProps): JSX.Element => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

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

  return (
    <header
      className='bg-yellow h-[75px] sticky top-0 z-[999]'
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget) && menuIsOpen) {
          setMenuIsOpen(false)
        }
      }}
    >
      <div className='max-w-screen-2xl m-auto w-full h-full md:flex justify-between items-center'>
        <div className='bg-yellow flex items-center justify-between px-12 py-1 w-full h-full relative md:w-auto z-[999]'>
          <Link
            href='/'
            id='amends-logo'
            className='h-[30px] w-[150px] relative'
            aria-label='Link to home'
          >
            <Image
              src={amendsLogo}
              alt='Amends Logo'
              fill
              sizes='25vw'
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <DynamicHamburger menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
        </div>
        {isDesktop ? (
          <motion.div
            id='navMenu'
            className='bg-yellow w-full pr-10 shadow-none flex relative top-0 left-0 items-center justify-end'
            aria-labelledby='navMenuAccordion'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
          >
            <ul className='list-none ml-0 flex'>
              {navigationLinks &&
                navigationLinks.map((link: any, i: number) => (
                  <li key={i}>
                    <Link
                      href={link.url || ''}
                      className='font-inter font-bold uppercase text-black my-2 text-center hover:underline hover:underline-offset-[3px] hover:decoration-2 inline-block p-3 ml-4'
                    >
                      {link.name || ''}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              id='navMenu'
              className='bg-yellow w-full absolute left-1/2 -translate-x-1/2 z-[998]'
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
                        className='font-inter font-bold uppercase text-black block p-3 my-2 text-center hover:underline hover:underline-offset-[3px] hover:decoration-2'
                      >
                        {link.name || ''}
                      </Link>
                    </motion.li>
                  ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </header>
  )
}

export default Header
