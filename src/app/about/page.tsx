import About from './About'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'About | Amends'
  const description = 'What is Amends all about?'
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
  return <About />
}
