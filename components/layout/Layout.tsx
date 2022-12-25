import { Header, Main, Footer } from '.';

interface layoutPropsI {
    children: React.ReactNode[],
    navRoutes: any[],
    siteMeta: any,
    className: string
}

const Layout = ({ children, navRoutes, siteMeta, className = '' } : layoutPropsI): JSX.Element => {
    return (
        <>
            <Header navRoutes={navRoutes}/>
            <Main className={className}>{children}</Main>
            <Footer siteMeta={siteMeta}/>
        </>
    )
}

export default Layout;