import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { NAV_ITEMS } from '@/components/nav-items'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return NAV_ITEMS.map(({ href }) => ({
    url: new URL(href, SITE_URL).toString(),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: href === '/' ? 1 : 0.8,
  }))
}
