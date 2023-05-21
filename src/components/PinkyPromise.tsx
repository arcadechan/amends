'use client'

import Image from 'next/image'
import promiseBlack from 'public/logo/promise-black.png'
import promiseYellow from 'public/logo/promise-yellow.png'
import { useContext } from 'react'
import { AppContext } from './layout/Layout'

export default function PinkyPromise({
  className = ''
}: {
  className?: string
}): JSX.Element {
  const { prefersDark } = useContext(AppContext)

  return (
    <Image
      src={prefersDark ? promiseYellow : promiseBlack}
      className={`mx-auto w-36 ${className}`}
      width={862}
      height={266}
      alt='Two hands making a pinky promise with lighting being emitted by the gesture.'
    />
  )
}
