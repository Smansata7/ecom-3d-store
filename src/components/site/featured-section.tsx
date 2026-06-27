import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MarqueeGallery } from './marquee-gallery'
import type { ArtworkDoc } from '@/lib/media'

const placeholders: ArtworkDoc[] = [
  { id: 'p1', title: 'Voronoi Vase', slug: 'voronoi-vase', tagline: 'Parametric skin, vase mode', summary: 'A vase-mode print with a parametric Voronoi shell — light, airy, and surprisingly strong. Beautiful with dried stems.', category: 'decor' },
  { id: 'p2', title: 'Articulated Dragon', slug: 'articulated-dragon', tagline: 'Print-in-place, no supports', summary: 'A fully articulated dragon printed in one go — every joint moves, zero assembly, zero supports.', category: 'toys' },
  { id: 'p3', title: 'Lattice Lamp', slug: 'lattice-lamp', tagline: 'Translucent PETG over warm LEDs', summary: 'A translucent PETG lattice that scatters warm LED light into soft geometric patterns across the room.', category: 'decor' },
  { id: 'p4', title: 'Cosplay Pauldron', slug: 'cosplay-pauldron', tagline: 'Light, tough, screen-ready', summary: 'A screen-accurate shoulder piece in PA-CF — light enough to wear all day, tough enough to survive a con.', category: 'cosplay' },
  { id: 'p5', title: 'Modular Desk Tray', slug: 'modular-desk-tray', tagline: 'Tile your own workspace', summary: 'Snap-together trays that tile to fit any desk. Configure it for pens, cables, dice — whatever you need.', category: 'functional' },
  { id: 'p6', title: 'Topology Bowl', slug: 'topology-bowl', tagline: 'Math-rendered marble', summary: 'A bowl generated from a mathematical surface and printed in a marbled blend — no two come out the same.', category: 'experimental' },
]

export function FeaturedSection({ items }: { items: ArtworkDoc[] }) {
  const source = items.length > 0 ? items : placeholders
  const showPlaceholderNote = items.length === 0

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {'// selected work'}
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              A few favourites.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Hover to take a closer look — videos play, photos hold still. Tap any
              piece for the full story and a direct line to me.
            </p>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {showPlaceholderNote && (
          <p className="mt-6 inline-block rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
            Showing demo pieces. Sign in at <code className="font-mono">/admin</code> and add your real work.
          </p>
        )}
      </div>

      {/* full-bleed marquee */}
      <div className="mt-10">
        <MarqueeGallery items={source} rows={1} />
      </div>
    </section>
  )
}
