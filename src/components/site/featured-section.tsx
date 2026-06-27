import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArtworkCard } from './artwork-card'
import type { ArtworkDoc } from '@/lib/payload'

const placeholders: ArtworkDoc[] = [
  {
    id: 'p1',
    title: 'Voronoi Vase',
    slug: 'voronoi-vase',
    tagline: 'Vase mode + a parametric skin',
    category: 'decor',
    accentColor: 'var(--filament-coral)',
    materials: ['PLA', 'PETG'],
    printTimeHours: 6,
  },
  {
    id: 'p2',
    title: 'Articulated Dragon',
    slug: 'articulated-dragon',
    tagline: 'Print-in-place spine, no supports',
    category: 'toys',
    accentColor: 'var(--filament-mint)',
    materials: ['PLA'],
    printTimeHours: 9,
  },
  {
    id: 'p3',
    title: 'Lattice Lamp',
    slug: 'lattice-lamp',
    tagline: 'Translucent PETG over warm LEDs',
    category: 'decor',
    accentColor: 'var(--filament-violet)',
    materials: ['PETG'],
    printTimeHours: 14,
  },
  {
    id: 'p4',
    title: 'Cosplay Pauldron',
    slug: 'cosplay-pauldron',
    tagline: 'PA-CF — light, tough, screen-ready',
    category: 'cosplay',
    accentColor: 'var(--filament-sun)',
    materials: ['PA-CF'],
    printTimeHours: 22,
  },
  {
    id: 'p5',
    title: 'Modular Desk Tray',
    slug: 'modular-desk-tray',
    tagline: 'Tile your own workspace',
    category: 'functional',
    accentColor: 'var(--filament-cyan)',
    materials: ['PETG'],
    printTimeHours: 4,
  },
]

export function FeaturedSection({ items }: { items: ArtworkDoc[] }) {
  const source = items.length > 0 ? items : placeholders
  const showPlaceholderNote = items.length === 0

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {'// featured'}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Pieces I'm proud of.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A small curated selection — every one was real filament, real hours, and a lot of bed-leveling.
          </p>
        </div>
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-filament-coral hover:text-filament-coral"
        >
          Open full gallery
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {showPlaceholderNote && (
        <p className="mt-6 inline-block rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
          Showing demo pieces. Sign in at <code className="font-mono">/admin</code> and add your real work.
        </p>
      )}

      <div className="mt-10 grid auto-rows-[20rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
