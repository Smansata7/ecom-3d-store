import { getPayloadClient } from '@/lib/payload'
import type { ArtworkDoc, ViralDoc } from '@/lib/media'
import { Hero } from '@/components/site/hero'
import { FeaturedSection } from '@/components/site/featured-section'
import { ViralSection } from '@/components/site/viral-section'

export const revalidate = 60

async function getFeatured(): Promise<ArtworkDoc[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'artworks',
      where: { featured: { equals: true } },
      limit: 6,
      depth: 2,
      sort: '-updatedAt',
    })
    return result.docs as unknown as ArtworkDoc[]
  } catch (err) {
    console.warn('Featured fetch failed (likely first run, db not migrated):', err)
    return []
  }
}

async function getViral(): Promise<ViralDoc[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'viral-picks',
      limit: 8,
      depth: 1,
      sort: 'order',
    })
    return result.docs as unknown as ViralDoc[]
  } catch (err) {
    console.warn('Viral fetch failed:', err)
    return []
  }
}

export default async function HomePage() {
  const [featured, viral] = await Promise.all([getFeatured(), getViral()])
  return (
    <>
      <Hero />
      <div className="hairline mx-auto max-w-6xl" />
      <FeaturedSection items={featured} />
      <div className="hairline mx-auto max-w-6xl" />
      <ViralSection items={viral} />
    </>
  )
}
