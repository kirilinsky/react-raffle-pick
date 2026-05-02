import './globals.css'
import type { Metadata } from 'next'
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { Header } from '../components/site-header'

const antonio = Antonio({
  subsets: ['latin'],
  variable: '--font-antonio',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'react-raffle-picker demo',
  description: 'A tiny placeholder for the upcoming react-raffle-picker demo.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${antonio.variable} ${inter.variable} ${jetBrainsMono.variable} font-sans`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
