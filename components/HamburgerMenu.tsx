import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef, useEffect, useState } from "react"
import type { MutableRefObject, Dispatch, SetStateAction } from 'react'
import hamburgerMenu from '../public/animations/hamburger-menu.json'

type DynamicHamburgerProps = {
  menuIsOpen: boolean
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>
}

const DynamicHamburger = ({ menuIsOpen, setMenuIsOpen }: DynamicHamburgerProps): JSX.Element =>
{
  const menuRef: MutableRefObject<LottieRefCurrentProps | null> = useRef(null)
  menuRef.current?.setSpeed(2)

  useEffect(() => {
    menuRef.current?.setDirection( menuIsOpen ? 1 : -1 )
    menuRef.current?.play()
  }, [ menuIsOpen ])

  console.log('1️⃣ Dynamic Hamburger menu is', (menuIsOpen ? 'open' : 'closed'))

  return (
    <button
      id='navMenuAccordion'
      className='block md:hidden p-2'
      aria-expanded={menuIsOpen}
      aria-controls='navMenu'
      aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
      onClick={() => setMenuIsOpen(!menuIsOpen)}
      onKeyUp={e => {
        const code: string | number = e.key || e.keyCode || e.which
        if(code === 'Tab' || code === 9)
        {
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
        animationData={hamburgerMenu}
      />
    </button>
  )
}

export default DynamicHamburger