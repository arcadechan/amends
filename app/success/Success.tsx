'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import successAnimation from '../../public/animations/success.json'
import dynamic from 'next/dynamic'
import ButtonLink from '../../components/ButtonLink'

const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className='w-72 h-72 mx-auto'/>
})

export default function Success()
{
  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const transition = { duration: 0.5, delay: 1.3 }

  return (
    <section
      id='success'
      className='text-center mx-auto my-10'
    >
      <motion.h1
        className='text-5xl font-candy'
        initial={initial}
        animate={animate}
        transition={transition}
      >
        Success
      </motion.h1>
      <DynamicLottie
        className='w-72 h-72 mx-auto'
        animationData={successAnimation} loop={false}
      />
      <motion.p
        className='text-2xl font-inter font-bold'
        initial={initial}
        animate={animate}
        transition={transition}
      >
        Thanks for your submission!
      </motion.p>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
      >
        <ButtonLink href='/'>To home</ButtonLink>
      </motion.div>
    </section>
  )
}