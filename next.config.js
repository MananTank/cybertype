const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	experimental: {
		optimizeCss: true,
	},
};

if (process.env.NODE_ENV !== 'production') {
	module.exports = nextConfig;
} else {
	const withPWA = require('next-pwa')({
		dest: 'public',
		runtimeCaching,
	});

	module.exports = withPWA(nextConfig);
}
