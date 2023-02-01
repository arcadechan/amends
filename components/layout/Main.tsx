interface mainPropsI {
    children: React.ReactNode,
    className: string
}

const Main = ({ children, className } : mainPropsI): JSX.Element => {
    return (
        <main id='main' className={className}>{children}</main>
    )
}

export default Main;