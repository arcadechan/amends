import About from './About'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'About | Amends'
  const description = 'What is Amends all about?'

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
  return <About />
}
