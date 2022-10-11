const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true
}

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching
})

module.exports = withPWA(nextConfig)
