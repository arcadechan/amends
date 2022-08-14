import type { AppProps } from 'next/app'
import Tina from '../.tina/components/TinaDynamicProvider.js'
import '../styles/main.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Tina>
      <Component {...pageProps} />
    </Tina>
  )
}

export default App
