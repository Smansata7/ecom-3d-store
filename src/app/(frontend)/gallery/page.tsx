import { getPayloadClient } from '@/lib/payload'
import type { ArtworkDoc } from '@/lib/media'
import { ArtworkCard } from '@/components/site/artwork-card'

export const revalidate = 60

const placeholders: ArtworkDoc[] = [
  { id: 1, title: 'Voronoi Vase', slug: 'voronoi-vase', tagline: 'Parametric skin, vase mode', category: 'decor' },
  { id: 2, title: 'Articulated Dragon', slug: 'articulated-dragon', tagline: 'Print-in-place spine', category: 'toys' },
  { id: 3, title: 'Lattice Lamp', slug: 'lattice-lamp', tagline: 'Translucent PETG, warm LEDs', category: 'decor' },
  { id: 4, title: 'Cosplay Pauldron', slug: 'cosplay-pauldron', tagline: 'Screen-ready, lightweight', category: 'cosplay' },
  { id: 5, title: 'Modular Desk Tray', slug: 'modular-desk-tray', tagline: 'Tile your workspace', category: 'functional' },
  { id: 6, title: 'Topology Bowl', slug: 'topology-bowl', tagline: 'Math-rendered marble', category: 'experimental' },
]

async function getAll(): Promise<ArtworkDoc[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'artworks',
      limit: 60,
      depth: 2,
      sort: '-updatedAt',
    })
    return result.docs as unknown as ArtworkDoc[]
  } catch (err) {
    console.warn('Gallery fetch failed:', err)
    return []
  }
}

export const metadata = {
  title: 'Gallery',
}

export default async function GalleryPage() {
  const docs = await getAll()
  const items = docs.length > 0 ? docs : placeholders
  const showPlaceholderNote = docs.length === 0

  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {'// gallery'}
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
          Everything off <span className="accent-text">the bed.</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Photos and video of each piece. Tap one for the details — and a button to
          bring it home.
        </p>
        {showPlaceholderNote && (
          <p className="mt-2 inline-block w-fit rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
            Demo pieces — sign in at <code className="font-mono">/admin</code> to add your own.
          </p>
        )}
      </div>

      <div className="mt-12 grid auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map((artwork, i) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            priority={i < 3}
            span={i % 5 === 0 ? 'tall' : i % 5 === 3 ? 'wide' : 'square'}
          />
        ))}
      </div>
    </section>
  )
}
