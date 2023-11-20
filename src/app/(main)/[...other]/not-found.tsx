'use client'

import compassAnimation from 'public/animations/404-compass.json'
import ButtonLink from '@/components/ButtonLink'
import DynamicLottie from '@/components/DynamicLottie'
import '@/styles/main.css'

export default function NotFound(): JSX.Element {
  return (
    <section className='mx-auto text-center max-w-screen-2xl py-20 px-12'>
      <div className='font-candy'>
        <h1 className='text-8xl'>404</h1>
        <h2 className='text-3xl'>PAGE NOT FOUND.</h2>
      </div>
      <DynamicLottie
        className='w-72 h-72 mx-auto'
        animationData={compassAnimation}
      />
      <h2 className='text-xl mb-5'>
        Uh oh. There&apos;s nothing here.
        <br />
        Was there supposed to be?
      </h2>
      <ButtonLink href='/'>Back to the homepage.</ButtonLink>
    </section>
  )
}
