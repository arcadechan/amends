import Image from 'next/image'

export default function PinkyPromise({
  className = ''
}: {
  className?: string
}): JSX.Element {
  return (
    <Image
      src='/logo/promise-black.png'
      className={`mx-auto ${className}`}
      width={150}
      height={75}
      alt='A line art drawing of two hands making a pinky promise.'
    />
  )
}
