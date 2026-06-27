import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MarqueeGallery } from './marquee-gallery'
import { placeholderArtworks } from '@/lib/placeholders'
import type { ArtworkDoc } from '@/lib/media'

export function FeaturedSection({ items }: { items: ArtworkDoc[] }) {
  const source = items.length > 0 ? items : placeholderArtworks
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
              Hover to take a closer look: videos play, photos hold still. Tap any
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
