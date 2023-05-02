const { withPlaiceholder } = require('@plaiceholder/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['assets.tina.io']
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html'
      }
    ]
  }
}

module.exports = withPlaiceholder(nextConfig)
