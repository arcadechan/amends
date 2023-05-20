'use client'

import { Header, Main, Footer } from '.'

type LayoutProps = {
  children: React.ReactNode
  siteMeta: any | null
  className?: string
}

const Layout = ({ children, siteMeta, className = '' }: LayoutProps): JSX.Element => {
  const { navigationLinks, socialPlatforms } = siteMeta

  return (
    <body className={className}>
      <Header navigationLinks={navigationLinks} />
      <Main>{children}</Main>
      <Footer
        navigationLinks={navigationLinks}
        socialPlatforms={socialPlatforms}
      />
    </body>
  )
}

export default Layout
