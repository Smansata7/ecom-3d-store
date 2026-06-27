import { getPayloadClient } from '@/lib/payload'
import type { ArtworkDoc } from '@/lib/payload'
import { ArtworkCard } from '@/components/site/artwork-card'

export const revalidate = 60

const placeholders: ArtworkDoc[] = [
  { id: 1, title: 'Voronoi Vase', slug: 'voronoi-vase', tagline: 'Vase mode + parametric skin', category: 'decor', accentColor: 'var(--filament-coral)' },
  { id: 2, title: 'Articulated Dragon', slug: 'articulated-dragon', tagline: 'Print-in-place spine', category: 'toys', accentColor: 'var(--filament-mint)' },
  { id: 3, title: 'Lattice Lamp', slug: 'lattice-lamp', tagline: 'Translucent PETG, warm LEDs', category: 'decor', accentColor: 'var(--filament-violet)' },
  { id: 4, title: 'Cosplay Pauldron', slug: 'cosplay-pauldron', tagline: 'PA-CF, screen-ready', category: 'cosplay', accentColor: 'var(--filament-sun)' },
  { id: 5, title: 'Modular Desk Tray', slug: 'modular-desk-tray', tagline: 'Tile your workspace', category: 'functional', accentColor: 'var(--filament-cyan)' },
  { id: 6, title: 'Topology Bowl', slug: 'topology-bowl', tagline: 'Math-rendered marble', category: 'experimental', accentColor: 'var(--filament-coral)' },
]

async function getAll(): Promise<ArtworkDoc[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'artworks',
      limit: 50,
      depth: 1,
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
    <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-filament-coral/10 via-transparent to-transparent" />

      <div className="flex flex-col gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {'// gallery'}
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
          Everything off
          <br />
          <span className="filament-text">the bed.</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Tap a piece to see materials, print time, and a button to bring it home.
        </p>
        {showPlaceholderNote && (
          <p className="mt-2 inline-block w-fit rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
            Demo pieces — sign in at <code className="font-mono">/admin</code> to add your own.
          </p>
        )}
      </div>

      <div className="mt-12 grid auto-rows-[18rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
