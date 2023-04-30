import Link from 'next/link'

type ButtonLinkProps = {
  href?: string
  prefetch?: boolean
  children?: React.ReactNode
  className?: string
  button?: boolean
  anchor?: boolean
  onClick?: () => void
}

const ButtonLink = ({
  children,
  className,
  href = '',
  prefetch = false,
  button,
  anchor,
  onClick
}: ButtonLinkProps) => {
  const classes =
    className ||
    'inline-block bg-yellow text-black py-3 px-6 rounded-full font-inter font-bold text-lg m-5 hover:shadow-md'

  return !button || anchor ? (
    <Link href={href} className={classes} prefetch={prefetch}>
      {children}
    </Link>
  ) : (
    <button type='button' className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonLink
