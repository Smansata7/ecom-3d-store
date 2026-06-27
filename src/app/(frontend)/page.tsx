import { getPayloadClient } from '@/lib/payload'
import type { ArtworkDoc } from '@/lib/payload'
import { Hero } from '@/components/site/hero'
import { StatsMarquee } from '@/components/site/marquee'
import { FeaturedSection } from '@/components/site/featured-section'
import { PrinterSection } from '@/components/site/printer-section'
import { ViralTeaser } from '@/components/site/viral-teaser'

export const revalidate = 60

async function getFeatured(): Promise<ArtworkDoc[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'artworks',
      where: { featured: { equals: true } },
      limit: 6,
      depth: 1,
      sort: '-updatedAt',
    })
    return result.docs as unknown as ArtworkDoc[]
  } catch (err) {
    console.warn('Featured fetch failed (likely first run, db not migrated):', err)
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeatured()
  return (
    <>
      <Hero />
      <StatsMarquee />
      <FeaturedSection items={featured} />
      <PrinterSection />
      <ViralTeaser />
    </>
  )
}
