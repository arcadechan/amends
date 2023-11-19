import Layout from '@/components/layout/Layout'
import { client } from 'tina/__generated__/client'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import 'styles/main.css'

interface LayoutProps {
  children: React.ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const candyBean = localFont({
  src: '../../../public/fonts/candy-beans.otf',
  variable: '--font-candy'
})

const getMeta = async (): Promise<any> => {
  const siteMetaQuery = await client.queries.meta({ relativePath: 'meta.mdx' })
  const siteMeta = siteMetaQuery?.data?.meta || null

  return siteMeta || {}
}

export default async function RootLayout({ children }: LayoutProps) {
  const siteMeta = await getMeta()

  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
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
        <Script
          src='/scripts/theme-switcher.js'
          strategy='beforeInteractive'
        />
      </head>
      <Layout
        siteMeta={siteMeta}
        className={`${inter.variable} ${candyBean.variable}`}
      >
        {children}
      </Layout>
    </html>
  )
}
