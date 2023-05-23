'use client'

export default function BlogPostListLoading() {
  return (
    <div role='status'>
      <div className='px-12 pt-12 pb-4 max-w-screen-lg mx-auto grid gap-8'>
        {Array.from({ length: 3 }).map((x, i) => (
          <div
            key={i}
            className='relative rounded-3xl min-h-[300px] lg:min-h-[400px]'
          >
            <div className='block h-full rounded-3xl'>
              {/* Card Image */}
              <div className='flex items-center justify-center w-full h-auto min-h-[300px] lg:min-h-[400px] max-w-[985px] mx-auto z-0 rounded-3xl bg-gray animate-pulse'>
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
              <div className='flex flex-col justify-end p-6 absolute bottom-0 left-0 z-0 w-full bg-gradient-to-r from-black rounded-b-3xl'></div>
            </div>
          </div>
        ))}
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
