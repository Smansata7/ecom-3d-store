import Link from 'next/link'
import { Flame } from 'lucide-react'
import { GithubIcon } from './brand-icons'

export function ViralTeaser() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-filament-coral/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-filament-violet/30 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-filament-coral backdrop-blur">
              <Flame className="h-3.5 w-3.5" />
              coming soon — viral drops
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              When a print goes viral,
              <br />
              you get the files.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              When a piece takes off on social, I'll drop the model and the slicer profile to GitHub so anyone
              with a printer can run their own. New makers — start here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                Browse the gallery
              </Link>
              <a
                href="https://github.com/Smansata7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-filament-mint hover:text-filament-mint"
              >
                <GithubIcon className="h-4 w-4" />
                Watch on GitHub
              </a>
            </div>
          </div>

          <ul className="space-y-3 font-mono text-xs text-muted-foreground">
            {['./prints/voronoi-vase.3mf', './prints/articulated-dragon.3mf', './prints/lattice-lamp.gcode'].map((f) => (
              <li key={f} className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3">
                <span>{f}</span>
                <span className="rounded-full bg-filament-coral/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-filament-coral">
                  soon
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
