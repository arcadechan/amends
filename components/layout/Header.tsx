interface headerPropsI {
    navRoutes: any[]
}

const Header = ({ navRoutes } : headerPropsI): JSX.Element => {
    

    return (
        <header>
            <div>
                <img src='/logo/logo-black.png'/>
            </div>
            <nav></nav>
        </header>
    )
}

export default Header;