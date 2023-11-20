import Image from 'next/image'
import promiseBlack from 'public/logo/promise-black.png'

export default function PinkyPromise({
  className = ''
}: {
  className?: string
}): JSX.Element {
  return (
    <Image
      src={promiseBlack}
      className={`mx-auto w-36 ${className}`}
      width={862}
      height={266}
      alt='Two hands making a pinky promise with lighting being emitted by the gesture.'
    />
  )
}
