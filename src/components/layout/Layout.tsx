import Header from './Header'
import Main from './Main'
import Footer from './Footer'

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
