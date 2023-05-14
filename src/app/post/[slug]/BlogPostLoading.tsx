'use client'

import { LineBreak } from 'components/index'

export default function BlogPostLoading() {
  return (
    <div role='status'>
      <div className='bg-yellow text-center relative'>
        <div className='py-10 px-12 mx-auto w-full h-auto max-h-[520px] max-w-[985px]'>
          <div className='flex items-center justify-center rounded-3xl w-full h-auto min-h-[230px] lg:min-h-[460px] max-w-[985px] bg-lace animate-pulse'>
            <svg
              className='w-12 h-12 text-black'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'
            >
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
          </div>
        </div>
        <div className='mt-[45px] px-12 max-w-5xl mx-auto animate-pulse'>
          <div className='h-9 lg:h-14 w-1/2 bg-lace rounded-lg mx-auto' />
          <div className='mt-3 h-6 lg:h-9 w-2/5 bg-lace rounded-lg mx-auto' />
        </div>
        <LineBreak className='my-4' />
      </div>
      <div className='px-4 py-4 max-w-5xl mx-auto mb-8 font-inter md:px-12'>
        <div className='mb-5 h-5 w-36 bg-gray rounded-md animate-pulse mx-auto' />
        <div className='animate-pulse'>
          {Array.from({ length: 3 }).map((x, i) => (
            <div
              key={i}
              className='mb-5 h-7 lg:h-9 w-full bg-gray rounded-md'
            />
          ))}
          <div className='mb-5 h-7 lg:h-9 w-2/3 bg-gray rounded-md' />
          <br />
          {Array.from({ length: 3 }).map((x, i) => (
            <div
              key={i}
              className='mb-5 h-7 lg:h-9 w-full bg-gray rounded-md'
            />
          ))}
          <div className='mb-5 h-7 lg:h-9 w-2/3 bg-gray rounded-md' />
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
