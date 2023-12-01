import DigitalSpellcraft from './DigitalSpellcraft'
import type { Metadata } from 'next'
import getMetadataBase from '@/lib/metadata'

export const generateMetadata = (): Metadata => {
  const title = 'World | Amends'
  const description = 'The world.'
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
  return <DigitalSpellcraft />
}
