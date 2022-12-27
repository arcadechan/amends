import { Header, Main, Footer } from '.';

interface layoutPropsI {
    children: React.ReactNode[],
    siteMeta: any|null,
    className: string
}

const Layout = ({ children, siteMeta, className = '' } : layoutPropsI): JSX.Element => {
    const { navigationLinks, socialPlatforms } = siteMeta

    return (
        <>
            <Header navigationLinks={navigationLinks}/>
            <Main className={className}>{children}</Main>
            <Footer socialPlatforms={socialPlatforms}/>
        </>
    )
}

export default Layout;