import { Container } from '../container'
import { HeroText } from './hero-text'

export function HeroStage() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(212,160,74,0.08),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(111,26,37,0.06),transparent_50%)] py-8 sm:py-12">
      <Container className="max-w-[1100px]">
        <HeroText />
      </Container>
    </div>
  )
}
