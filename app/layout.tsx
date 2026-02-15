import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import { generateThemeScript } from '../lib/themes'

export const metadata: Metadata = {
  title: 'cybertype',
  description: 'Fast and Minimal Typing App - Improve your typing speed.',
  keywords: [
    'cybertype',
    'typing app',
    'practice typing',
    'simple typing app',
    'improve typing speed'
  ],
  openGraph: {
    title: 'cybertype',
    description: 'Fast and Minimal Typing App - Improve your typing speed.',
    url: 'https://cybertype.app',
    type: 'website',
    images: ['https://cybertype.app/og.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cybertype',
    description: 'Fast and Minimal Typing App - Improve your typing speed.',
    images: ['https://cybertype.app/og.png']
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: '/icons/favicon-32x32.png'
  },
  manifest: '/manifest.json'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3f3f3f'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - must run before body renders to prevent FOUC */}
        <script dangerouslySetInnerHTML={{ __html: generateThemeScript() }} />
        {/* Critical Font CSS */}
        <style
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
            `
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
