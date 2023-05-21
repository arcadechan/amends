'use client'

import React, { useEffect, useState, createContext } from 'react'
import { Header, Main, Footer } from '.'

type LayoutProps = {
  children: React.ReactNode
  siteMeta: any | null
  className?: string
}

export const AppContext = createContext({
  prefersDark: false,
  setPrefersDark: (state: boolean) => {}
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [prefersDark, setPrefersDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme && theme === 'dark') {
      setPrefersDark(true)
    } else {
      setPrefersDark(false)
    }
  }, [])

  return (
    <AppContext.Provider value={{ prefersDark, setPrefersDark }}>
      {children}
    </AppContext.Provider>
  )
}

const Layout = ({ children, siteMeta, className = '' }: LayoutProps): JSX.Element => {
  const { navigationLinks, socialPlatforms } = siteMeta

  return (
    <body className={className}>
      <AppProvider>
        <Header navigationLinks={navigationLinks} />
        <Main>{children}</Main>
        <Footer
          navigationLinks={navigationLinks}
          socialPlatforms={socialPlatforms}
        />
      </AppProvider>
    </body>
  )
}

export default Layout
