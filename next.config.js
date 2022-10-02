const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
	dest: 'public',
	runtimeCaching,
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
	reactStrictMode: false,
	swcMinify: true,
	experimental: {
		optimizeCss: true,
	},
});
