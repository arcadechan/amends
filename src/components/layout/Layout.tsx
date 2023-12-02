import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import NowPlaying from '../NowPlaying'

export type LayoutProps = {
  children: React.ReactNode
  siteMeta: any | null
  className?: string
  theme: string
}

const Layout = ({ children, siteMeta, className = '', theme = 'light' }: LayoutProps) => {
  const { navigationLinks, socialPlatforms } = siteMeta

  return (
    <body className={className}>
      <Header
        navigationLinks={navigationLinks}
        theme={theme}
      />
      <NowPlaying />
      <Main>{children}</Main>
      <Footer
        navigationLinks={navigationLinks}
        socialPlatforms={socialPlatforms}
        theme={theme}
      />
    </body>
  )
}

export default Layout
