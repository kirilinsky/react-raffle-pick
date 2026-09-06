import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'React slot machine component',
  description:
    'Multi-reel slot machine in React. Independent reels, staggered stop, any charset — digits, letters or emoji. Live controls and copyable code.',
  path: '/slots',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
