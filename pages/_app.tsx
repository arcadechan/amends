import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Inter } from '@next/font/google'
import localFont from '@next/font/local'
import '../styles/main.css'
import { useRouter } from 'next/router'

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

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <>
      {['/404', '/500'].includes(router.pathname) && (
        <style jsx global>{`
          html {
            background-color: #ffdc8b;
          }
        `}</style>
      )}
      <div className={`${inter.variable} ${candyBean.variable}`}>
        <Component {...pageProps}/>
      </div>
    </>  
  )
}

export default App
