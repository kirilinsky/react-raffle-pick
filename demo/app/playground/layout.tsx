import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Playground — try every prop live',
  description:
    'Interactive React random picker playground. Tune range, items, interval, inertia and no-repeat, watch it draw, and copy the generated JSX.',
  path: '/playground',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
