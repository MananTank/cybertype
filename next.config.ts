import type { NextConfig } from 'next'

// next-pwa types are incompatible with Next.js 16, use require
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {}
}

export default withPWA(nextConfig) as NextConfig
