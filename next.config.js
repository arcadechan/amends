/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
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

module.exports = nextConfig
