import Contact from './Contact'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'Contact | Amends'
  const description = 'Questions, comments, or concerns? Drop me a line!'
  const metadataBase = new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL!
  )

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      images: [`${metadataBase}/logo/amends-og.jpeg`]
    }
  }
})()

export default function Page() {
  return <Contact />
}
