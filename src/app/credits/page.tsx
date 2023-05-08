import Credits from './Credits'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'Credits | Amends'
  const description =
    "This site wouldn't be possible without all the marvelous content produced by these individuals."
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description
    }
  }
})()

export default function Page() {
  return <Credits />
}
