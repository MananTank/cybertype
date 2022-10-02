import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='utf-8' />
				<link rel='preload' href='/blur.webp' as='image' />
				<link rel='preload' href='/orbitron.woff2' as='font' type='font/woff2' crossOrigin='true' />

				<link rel='manifest' href='/manifest.json' />
				<link rel='apple-touch-icon' href='/icon.png'></link>
				<meta name='theme-color' content='#317EFB' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />

				<link rel='icon' type='image/svg+xml' href='/icon.svg'></link>
				<link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
				<link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
			</Head>
			<body data-theme='red'>
				<Main />
			</body>
			<NextScript />
		</Html>
	);
}
