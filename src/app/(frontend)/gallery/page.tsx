import { getPayloadClient } from '@/lib/payload'
import type { ArtworkDoc } from '@/lib/media'
import { MarqueeGallery } from '@/components/site/marquee-gallery'

export const revalidate = 60

const placeholders: ArtworkDoc[] = [
  { id: 1, title: 'Voronoi Vase', slug: 'voronoi-vase', tagline: 'Parametric skin, vase mode', summary: 'A vase-mode print with a parametric Voronoi shell — light, airy, and surprisingly strong.', category: 'decor' },
  { id: 2, title: 'Articulated Dragon', slug: 'articulated-dragon', tagline: 'Print-in-place spine', summary: 'A fully articulated dragon printed in one piece — every joint moves, no assembly needed.', category: 'toys' },
  { id: 3, title: 'Lattice Lamp', slug: 'lattice-lamp', tagline: 'Translucent PETG, warm LEDs', summary: 'Translucent PETG lattice that scatters warm light into soft geometric shadows.', category: 'decor' },
  { id: 4, title: 'Cosplay Pauldron', slug: 'cosplay-pauldron', tagline: 'Screen-ready, lightweight', summary: 'A screen-accurate shoulder piece in carbon-fibre nylon — light to wear, tough to break.', category: 'cosplay' },
  { id: 5, title: 'Modular Desk Tray', slug: 'modular-desk-tray', tagline: 'Tile your workspace', summary: 'Snap-together trays that tile to fit any desk, configured however you like.', category: 'functional' },
  { id: 6, title: 'Topology Bowl', slug: 'topology-bowl', tagline: 'Math-rendered marble', summary: 'A bowl grown from a mathematical surface, printed in a marbled blend — each one unique.', category: 'experimental' },
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
    <section className="relative overflow-hidden pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {'// gallery'}
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Everything off <span className="accent-text">the bed.</span>
          </h1>
          <p className="max-w-xl text-muted-foreground">
            An endless reel of the work. Hover to pause and take a closer look —
            videos play, photos hold. Tap any piece for the details and to start a build.
          </p>
          {showPlaceholderNote && (
            <p className="mt-2 inline-block w-fit rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
              Demo pieces — sign in at <code className="font-mono">/admin</code> to add your own.
            </p>
          )}
        </div>
      </div>

      {/* full-bleed, two-row infinite reel */}
      <div className="mt-12">
        <MarqueeGallery items={items} rows={2} />
      </div>
    </section>
  )
}
