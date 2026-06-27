import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArtworkCard } from './artwork-card'
import type { ArtworkDoc } from '@/lib/media'

const placeholders: ArtworkDoc[] = [
  { id: 'p1', title: 'Voronoi Vase', slug: 'voronoi-vase', tagline: 'Parametric skin, vase mode', category: 'decor' },
  { id: 'p2', title: 'Articulated Dragon', slug: 'articulated-dragon', tagline: 'Print-in-place, no supports', category: 'toys' },
  { id: 'p3', title: 'Lattice Lamp', slug: 'lattice-lamp', tagline: 'Translucent PETG over warm LEDs', category: 'decor' },
  { id: 'p4', title: 'Cosplay Pauldron', slug: 'cosplay-pauldron', tagline: 'Light, tough, screen-ready', category: 'cosplay' },
  { id: 'p5', title: 'Modular Desk Tray', slug: 'modular-desk-tray', tagline: 'Tile your own workspace', category: 'functional' },
]

export function FeaturedSection({ items }: { items: ArtworkDoc[] }) {
  const source = items.length > 0 ? items : placeholders
  const showPlaceholderNote = items.length === 0

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {'// selected work'}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A few favourites.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A small, rotating selection. Tap any piece for photos, video, materials —
            and a direct line to me.
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

      <div className="mt-10 grid auto-rows-[19rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {source.slice(0, 5).map((artwork, i) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            priority={i === 0}
            span={i === 0 ? 'tall' : i === 3 ? 'wide' : 'square'}
          />
        ))}
      </div>
    </section>
  )
}
