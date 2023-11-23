'use client'

import { LottieRefCurrentProps } from 'lottie-react'
import Lottie from 'lottie-react'
import { useRef, useEffect } from 'react'
import type { MutableRefObject, Dispatch, SetStateAction } from 'react'
import hamburgerMenuBlack from 'public/animations/hamburger-menu-black.json'
import hamburgerMenuYellow from 'public/animations/hamburger-menu-yellow.json'

type DynamicHamburgerProps = {
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
  theme: string
}

type HamburgerIconObject = {
  [key: string]: any
}

const hamburgerIcon: HamburgerIconObject = {
  light: hamburgerMenuBlack,
  dark: hamburgerMenuYellow
}

const HamburgerMenu = ({
  menuIsOpen,
  setMenuIsOpen,
  theme
}: DynamicHamburgerProps): JSX.Element => {
  const menuRef: MutableRefObject<LottieRefCurrentProps | null> = useRef(null)
  menuRef.current?.setSpeed(2)

  useEffect(() => {
    menuRef.current?.setDirection(menuIsOpen ? 1 : -1)
    menuRef.current?.play()
  }, [menuIsOpen])

  return (
    <button
      id='navMenuAccordion'
      className='block md:hidden p-2'
      aria-expanded={menuIsOpen}
      aria-controls='navMenu'
      aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      onKeyUp={(e) => {
        const code: string | number = e.key || e.keyCode || e.which
        if (code === 'Tab' || code === 9) {
          setMenuIsOpen(true)
        }
      }}
    >
      <Lottie
        lottieRef={menuRef}
        style={{ width: '55px', height: '55px' }}
        autoplay={false}
        loop={false}
        initialSegment={[0, 70]}
        animationData={hamburgerIcon[theme]}
      />
    </button>
  )
}

export default HamburgerMenu
