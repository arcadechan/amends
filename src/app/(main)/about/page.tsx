import About from './About'
import type { Metadata } from 'next'
import getMetadataBase from 'lib/metadata'

export const generateMetadata = (): Metadata => {
  const title = 'About | Amends'
  const description = 'What is Amends all about?'
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
}

export default function Page() {
  return <About />
}
