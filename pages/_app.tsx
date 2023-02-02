import type { AppContext, AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Inter } from '@next/font/google'
import localFont from '@next/font/local'
import '../styles/main.css'
import { Layout } from '../components/layout'
import client from '../.tina/__generated__/client'

library.add(far, fas, fab)
config.autoAddCss = false

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const candyBean = localFont({
  src: '../public/fonts/candy-beans.otf',
  variable: '--font-candy'
})

type AppPropsWithSiteMeta = {
  siteMeta: any | null
} & AppProps

const App = ({ Component, pageProps, siteMeta }: AppPropsWithSiteMeta) => {

  return (
    <>
      <Layout siteMeta={siteMeta} className={`${inter.variable} ${candyBean.variable}`}>
          <Component {...pageProps}/>
      </Layout>
    </>  
  )
}

App.getInitialProps = async (ctx: AppContext): Promise<any> =>
{
  const siteMetaQuery = await client.queries.meta({ relativePath: 'meta.mdx' })
  const siteMeta = siteMetaQuery?.data?.meta || null

  return {
    siteMeta
  }
}

export default App
