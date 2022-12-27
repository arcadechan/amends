interface footerPropsI {
    socialPlatforms: any|null
}

const Footer = ({ socialPlatforms } : footerPropsI): JSX.Element => {
    const originYear: number = 2022
    const currentYear: number = new Date().getFullYear()
    const copyRightYear: string = originYear !== currentYear ? `${originYear} - ${currentYear}` : `${originYear}`

    return (
        <footer>

        </footer>
    )
}

export default Footer