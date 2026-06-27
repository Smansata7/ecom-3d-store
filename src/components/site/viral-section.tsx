import { ViralCard } from './viral-card'
import type { ViralDoc } from '@/lib/media'

const placeholders: ViralDoc[] = [
  { id: 'v1', title: 'Articulated Koi', githubUrl: 'https://github.com/Smansata7', tags: ['print-in-place', 'no supports'] },
  { id: 'v2', title: 'Gridfinity Set', githubUrl: 'https://github.com/Smansata7', tags: ['functional', 'desk'] },
  { id: 'v3', title: 'Whisper Vase', githubUrl: 'https://github.com/Smansata7', tags: ['vase mode', 'decor'] },
  { id: 'v4', title: 'Mech Keychain', githubUrl: 'https://github.com/Smansata7', tags: ['fidget', 'gift'] },
]

export function ViralSection({ items }: { items: ViralDoc[] }) {
  const source = items.length > 0 ? items : placeholders
  const showPlaceholderNote = items.length === 0

  return (
    <section id="trending" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {'// trending'}
          </p>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Viral right now.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            The pieces people keep asking for. Open one to read about it and grab the
            files from GitHub — print your own, or message me for a finished one.
          </p>
        </div>
      </div>

      {showPlaceholderNote && (
        <p className="mt-6 inline-block rounded-full border border-dashed border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
          Showing demo items. Add real ones under <code className="font-mono">Viral Picks</code> in <code className="font-mono">/admin</code>.
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {source.map((item, i) => (
          <ViralCard key={item.id} item={item} priority={i < 2} />
        ))}
      </div>
    </section>
  )
}
