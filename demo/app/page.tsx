import { FeaturesGrid } from '@/components/features/features-grid'
import { HeroStage } from '@/components/hero/hero-stage'
import { Quickstart } from '@/components/quickstart/quickstart'

export default function Home() {
  return (
    <>
      <HeroStage />
      <FeaturesGrid />
      <Quickstart />
    </>
  )
}
