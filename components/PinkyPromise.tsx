import Image from "next/image"

export default function PinkyPromise(): JSX.Element
{
  return (
    <Image
      src='/logo/promise-black.png'
      width={150}
      height={75}
      alt='A line art drawing of two hands making a pinky promise.'
      style={{ margin: '0 auto' }}
    />
  )
}