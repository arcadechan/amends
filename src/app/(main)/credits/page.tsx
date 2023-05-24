import Credits from './Credits'
import type { Metadata } from 'next'
import getMetadataBase from 'lib/metadata'

export const generateMetadata = (): Metadata => {
  const title = 'Credits | Amends'
  const description =
    "This site wouldn't be possible without all the marvelous content produced by these individuals."
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
  return <Credits />
}
