import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta charSet='utf-8' />

				{/* pwa manifest */}
				<link rel='manifest' href='/manifest.json' />

				{/* favicons */}
				<link rel='icon' type='image/svg+xml' href='/icons/icon.svg'></link>
				<link rel='apple-touch-icon' href='/icons/favicon-32x32.png'></link>
				<link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />

				{/* Critical Font CSS  */}
				<style
					data-id='critical'
					dangerouslySetInnerHTML={{
						__html: `
						@font-face {
							font-family: 'InputMono';
							font-style: normal;
							font-weight: 400;
							font-display: swap;
							src: url(/InputMono-Light.woff2) format('woff2');
						}

						body {
							font-family: 'InputMono', monospace;
						}
					`,
					}}
				></style>
			</Head>
			<body data-theme='theme-1'>
				<Main />
			</body>
			<NextScript />
		</Html>
	);
}
