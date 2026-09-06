import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Animations — roll, fade, blur, reel',
  description:
    'Four CSS-driven animations for a React random picker: roll, fade, blur and reel. Compare all four side by side on one shared tick.',
  path: '/animations',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
