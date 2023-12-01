import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const candyBean = localFont({
  src: '../../../public/fonts/candy-beans.otf',
  variable: '--font-candy'
})

export default function StandalonePageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='/site.webmanifest'
        />
        <meta
          name='theme-color'
          content='#000000'
        />
      </head>
      <body className={`${inter.variable} ${candyBean.variable}`}>{children}</body>
    </html>
  )
}
