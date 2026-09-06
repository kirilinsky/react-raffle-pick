export const SITE_URL = 'https://react-raffle-one.vercel.app'

export const PACKAGE_NAME = 'react-raffle-picker'

export const NPM_URL = `https://www.npmjs.com/package/${PACKAGE_NAME}`

export const REPO_URL = `https://github.com/kirilinsky/${PACKAGE_NAME}`

/** Shared one-liner reused by metadata, JSON-LD and OG images. */
export const SITE_DESCRIPTION =
  'React random picker for giveaways and prize draws. Pick a random winner or number with slot-machine, reel and countdown animations. Headless, typed, zero-dependency.'

export const OG_ALT = 'react-raffle-picker — React random picker for giveaways & prize draws'

/**
 * Per-route metadata with a canonical URL. The root layout's title template
 * appends the package name, so `title` here is the page-specific half only.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — react-raffle-picker`,
      description,
      url: path,
      siteName: PACKAGE_NAME,
      type: 'website' as const,
      // Declaring `openGraph` here replaces the resolved parent object, so the
      // root `opengraph-image.tsx` has to be re-attached explicitly.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: OG_ALT }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${title} — react-raffle-picker`,
      description,
      images: ['/opengraph-image'],
    },
  }
}
