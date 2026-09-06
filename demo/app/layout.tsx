import 'react-raffle-picker/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { NPM_URL, REPO_URL, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

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
  metadataBase: new URL(SITE_URL),
  applicationName: 'react-raffle-picker',
  title: {
    default: 'react-raffle-picker — React random picker for giveaways & prize draws',
    template: '%s — react-raffle-picker',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'react-raffle-picker',
    'react random picker',
    'react random name picker',
    'react winner picker',
    'react giveaway picker',
    'react prize draw',
    'react raffle component',
    'react slot machine component',
    'react lottery',
    'headless react component',
  ],
  category: 'technology',
  authors: [{ name: 'Kirilinsky', url: 'https://github.com/kirilinsky' }],
  creator: 'Kirilinsky',
  publisher: 'Kirilinsky',
  openGraph: {
    title: 'react-raffle-picker — React random picker for giveaways & prize draws',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: 'react-raffle-picker',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'react-raffle-picker — React random picker for giveaways & prize draws',
    description:
      'Pick a random winner or number in React. Slot-machine reels, countdown auto-freeze, no repeat winners. Headless and typed.',
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'react-raffle-picker',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  downloadUrl: NPM_URL,
  codeRepository: REPO_URL,
  license: 'https://opensource.org/licenses/MIT',
  programmingLanguage: 'TypeScript',
  author: {
    '@type': 'Person',
    name: 'Kirilinsky',
    url: 'https://github.com/kirilinsky',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
