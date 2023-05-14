import Credits from './Credits'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'Credits | Amends'
  const description =
    "This site wouldn't be possible without all the marvelous content produced by these individuals."
  const metadataBase = new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL!
  )

  return {
    title,
    description,
    metadataBase,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [`${metadataBase}/logo/amends-og.jpeg`]
    }
  }
})()

export default function Page() {
  return <Credits />
}
