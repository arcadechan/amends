import { default as NextHead } from 'next/head'

interface headPropsI {
    children: React.ReactNode[] | undefined,
    title: string | undefined,
    description: string | undefined
}

const Head = ({ children, title, description } : headPropsI): JSX.Element => {
    return (
        <NextHead>
            {children || (
                <>
                    <title>{title ? `${title} | Amends` : 'Amends'}</title>
                    <meta name='description' content={description || ''}/>
                </>
            )}
        </NextHead>
    )
}

export default Head;