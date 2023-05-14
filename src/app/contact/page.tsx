import Contact from './Contact'
import type { Metadata } from 'next'
import getMetadataBase from 'lib/metadata'

export const metadata = ((): Metadata => {
  const title = 'Contact | Amends'
  const description = 'Questions, comments, or concerns? Drop me a line!'
  const metadataBase = getMetadataBase()

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
  return <Contact />
}
