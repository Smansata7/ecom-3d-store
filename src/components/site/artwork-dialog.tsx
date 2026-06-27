'use client'

import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { resolveMedia, type ArtworkDoc, type ResolvedMedia } from '@/lib/media'

function Frame({ media, className }: { media: ResolvedMedia; className?: string }) {
  if (!media.url) {
    return <div className={cn('grid place-items-center bg-secondary/40', className)} />
  }
  if (media.isVideo) {
    return (
      <video src={media.url} muted loop playsInline autoPlay preload="metadata" className={className} />
    )
  }
  return <Image src={media.url} alt={media.alt} fill className={className} />
}

export function ArtworkDialog({
  artwork,
  open,
  onOpenChange,
}: {
  artwork: ArtworkDoc | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (open) setActive(0)
  }, [open, artwork?.id])

  const cover = useMemo(
    () => resolveMedia(artwork?.cover, artwork?.title ?? ''),
    [artwork?.cover, artwork?.title],
  )
  const gallery = useMemo(() => {
    if (!artwork) return [] as ResolvedMedia[]
    const extra = (artwork.gallery ?? [])
      .map((g) => resolveMedia(g?.media, artwork.title))
      .filter((m) => m.url)
    return [cover, ...extra].filter((m) => m.url)
  }, [artwork, cover])

  if (!artwork) return null

  const activeMedia = gallery[active] ?? cover
  const hasRichDescription = Boolean(
    artwork.description && (artwork.description as { root?: unknown }).root,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-border bg-card p-0">
        <DialogTitle className="sr-only">{artwork.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {artwork.summary || artwork.tagline || 'Product details'}
        </DialogDescription>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/40">
          <Frame media={activeMedia} className="absolute inset-0 h-full w-full object-cover" />
          <DialogClose className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-background">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pt-4">
            {gallery.map((m, i) => (
              <button
                key={`${m.url}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-colors',
                  i === active ? 'border-foreground' : 'border-border hover:border-muted-foreground',
                )}
              >
                {m.isVideo ? (
                  <video src={m.url!} muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <Image src={m.url!} alt={m.alt} fill sizes="56px" className="object-cover" />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-[42vh] overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{artwork.title}</h3>
              {artwork.tagline && (
                <p className="mt-1 text-sm text-muted-foreground">{artwork.tagline}</p>
              )}
            </div>
            {artwork.category && (
              <Badge variant="outline" className="shrink-0 border-border text-[10px] uppercase tracking-[0.2em]">
                {artwork.category}
              </Badge>
            )}
          </div>

          {(artwork.summary || hasRichDescription) && (
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {artwork.summary && <p>{artwork.summary}</p>}
              {hasRichDescription && (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-a:text-foreground">
                  <RichText data={artwork.description as never} />
                </div>
              )}
            </div>
          )}

          {(artwork.materials?.length || artwork.printTimeHours) && (
            <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/40 p-4 text-sm">
              {artwork.materials?.length ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Materials
                  </dt>
                  <dd className="mt-1">{artwork.materials.join(' · ')}</dd>
                </div>
              ) : null}
              {artwork.printTimeHours ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Print time
                  </dt>
                  <dd className="mt-1">~{artwork.printTimeHours} h</dd>
                </div>
              ) : null}
            </dl>
          )}

          {/* ecom feel without a price */}
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-border bg-background/30 px-4 py-3 text-sm">
            <Sparkles className="h-4 w-4 text-filament-sun" />
            <span className="text-muted-foreground">
              <span className="text-foreground">Made to order.</span> Want this — or a custom version?
              Message me and we&apos;ll build it together.
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppUrl(
                artwork.cta?.whatsappMessage ||
                  `Hi! I'd like to get "${artwork.title}" made — can we talk (including any customizations)?`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Build this with me
            </a>
            <a
              href={buildInstagramUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:text-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
              See more on Instagram
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
