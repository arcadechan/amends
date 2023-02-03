import { Header, Main, Footer, Layout } from '../components/layout'
import { client } from '../.tina/__generated__/client'
import { Inter } from '@next/font/google'
import localFont from '@next/font/local'
import '../styles/main.css'

interface LayoutProps {
  children: React.ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const candyBean = localFont({
  src: '../public/fonts/candy-beans.otf',
  variable: '--font-candy'
})

const getMeta = async (): Promise<any> =>
{
  const siteMetaQuery = await client.queries.meta({ relativePath: 'meta.mdx' })
  const siteMeta = siteMetaQuery?.data?.meta || null

  return siteMeta
}

const RootLayout = async ({ children }: LayoutProps): Promise<JSX.Element> =>
{

  const siteMeta = await getMeta()

  return (
    <html lang='en'>
      <Layout siteMeta={siteMeta} className={`${inter.variable} ${candyBean.variable}`}>
        <body>{children}</body>
      </Layout>
    </html>
  )
}

export default RootLayout