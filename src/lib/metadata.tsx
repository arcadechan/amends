const getMetadataBase = () => {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http:/localhost:3000'
      : `https://${process.env.NEXT_PUBLIC_URL}`
  return new URL(url)
}

export default getMetadataBase
