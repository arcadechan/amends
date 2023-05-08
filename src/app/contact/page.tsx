import Contact from './Contact'
import type { Metadata } from 'next'

export const metadata = ((): Metadata => {
  const title = 'Contact | Amends'
  const description = 'Questions, comments, or concerns? Drop me a line!'
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
  return <Contact />
}
