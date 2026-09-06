import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Countdown picker — auto-freeze on a timer',
  description:
    'Auto-freeze a React random draw after N seconds with a built-in SVG countdown ring, or supply your own render-prop.',
  path: '/countdown',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
