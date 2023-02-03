import { Header, Main, Footer } from '.';

interface layoutPropsI {
    children: React.ReactNode,
    siteMeta: any|null,
    className?: string
}

const Layout = ({ children, siteMeta, className = '' } : layoutPropsI): JSX.Element => {
    const { navigationLinks, socialPlatforms } = siteMeta

    // children = <body>{children}</body>

    return (
        <>
            <Header navigationLinks={navigationLinks}/>
            {children}
            <Footer socialPlatforms={socialPlatforms}/>
        </>
    )
}

export default Layout;