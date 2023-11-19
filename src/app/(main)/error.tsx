'use client'

import { useEffect } from 'react'
import ButtonLink from '@/components/ButtonLink'
import DynamicLottie from '@/components/DynamicLottie'
import errorAnimation from 'public/animations/error.json'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className='mx-auto text-center max-w-screen-2xl py-20 px-12'>
      <DynamicLottie
        className='w-72 h-72 mx-auto'
        animationData={errorAnimation}
      />
      <h1 className='font-candy text-5xl'>Something went wrong!</h1>
      <ButtonLink
        onClick={reset}
        button
      >
        Reload
      </ButtonLink>
    </section>
  )
}
