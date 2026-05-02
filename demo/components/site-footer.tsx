import Link from 'next/link'
import pkg from 'react-raffle-picker/package.json'
import { Container } from './container'

const REACT_PEER = pkg.peerDependencies?.react ?? ''
const REACT_LABEL = REACT_PEER.replace(/^>=\s*/, '') + '+'

const PACKAGE_LINKS = [
  { label: 'npm', href: 'https://www.npmjs.com/package/react-raffle-picker' },
  { label: 'GitHub', href: 'https://github.com/kirilinsky/react-raffle-picker' },
  {
    label: 'Storybook',
    href: 'https://kirilinsky.github.io/react-raffle-picker/',
  },
  {
    label: 'Bundlephobia',
    href: 'https://bundlephobia.com/package/react-raffle-picker',
  },
]

const DEMO_LINKS = [
  { label: 'Playground', href: '/playground' },
  { label: 'Use cases', href: '/use-cases' },
  { label: 'Slots', href: '/slots' },
  { label: 'Animations', href: '/animations' },
]

const DOCS_LINKS = [
  { label: 'API reference', href: '/docs/api' },
  { label: 'Countdown', href: '/docs/countdown' },
  { label: 'Recipes', href: '/docs/recipes' },
]

function ColHead({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-3">{children}</h3>
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-bg-2 py-10 text-sm text-ink-2">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              aria-label="react-raffle-picker home"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold bg-burgundy font-display text-base font-bold leading-none text-gold-light">
                R
              </span>
              <span className="min-w-0 font-mono text-sm font-medium leading-none">
                <span className="text-ink-2">react-</span>
                <span className="text-burgundy">raffle-picker</span>
              </span>
            </Link>
            <p className="max-w-[40ch] leading-relaxed">
              Tiny raffle engine. Big winner energy. A headless, composable React component for
              giveaways, raffles, and slot-machine UIs.
            </p>
          </div>

          <div>
            <ColHead>Package</ColHead>
            <ul className="grid list-none gap-2 p-0">
              {PACKAGE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-burgundy"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHead>Demo</ColHead>
            <ul className="grid list-none gap-2 p-0">
              {DEMO_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-burgundy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHead>Docs</ColHead>
            <ul className="grid list-none gap-2 p-0">
              {DOCS_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-burgundy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-5 font-mono text-xs text-ink-3">
          <span>
            MIT licensed · Built by <a href="https://github.com/kirilinsky">Kirilinsky</a>
          </span>
          <span>v{pkg.version} · React {REACT_LABEL}</span>
        </div>
      </Container>
    </footer>
  )
}
