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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });

    return config;
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
