import Image from 'next/image'
import promiseBlack from 'public/logo/promise-black.png'
import promiseYellow from 'public/logo/promise-yellow.png'

export default function PinkyPromise({
  className = '',
  theme = 'light'
}: {
  className?: string
  theme?: string
}): JSX.Element {
  let promiseIcon = promiseBlack

  switch (theme) {
    case 'dark':
      promiseIcon = promiseYellow
      break
    case 'light':
    default:
      promiseIcon = promiseBlack
      break
  }

  return (
    <Image
      src={promiseIcon}
      className={`mx-auto w-36 ${className}`}
      width={862}
      height={266}
      alt='Two hands making a pinky promise with lighting being emitted by the gesture.'
    />
  )
}
