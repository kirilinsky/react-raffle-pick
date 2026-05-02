import 'react-raffle-picker/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'

const display = Antonio({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://react-raffle-one.vercel.app'),
  applicationName: 'react-raffle-picker',
  title: {
    default: 'react-raffle-picker — Interactive Demo',
    template: '%s — react-raffle-picker',
  },
  description:
    'A headless React raffle picker for giveaways, winner draws, countdowns, and slot-machine UIs.',
  keywords: [
    'react-raffle-picker',
    'React raffle',
    'giveaway picker',
    'winner picker',
    'slot machine UI',
    'headless React component',
  ],
  authors: [{ name: 'Kirilinsky', url: 'https://github.com/kirilinsky' }],
  creator: 'Kirilinsky',
  publisher: 'Kirilinsky',
  openGraph: {
    title: 'react-raffle-picker — Interactive Demo',
    description:
      'Try the headless React raffle picker for giveaways, winner draws, countdowns, and slot-machine UIs.',
    url: '/',
    siteName: 'react-raffle-picker',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'react-raffle-picker — Interactive Demo',
    description:
      'A tiny raffle engine for React. Big winner energy.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
