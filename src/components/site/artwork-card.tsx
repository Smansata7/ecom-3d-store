'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import type { ArtworkDoc, MediaDoc } from '@/lib/payload'

function getMediaUrl(media: ArtworkDoc['cover']): string | null {
  if (!media) return null
  if (typeof media === 'string' || typeof media === 'number') return null
  return (media as MediaDoc).url ?? null
}

function getMediaAlt(media: ArtworkDoc['cover'], fallback: string): string {
  if (!media || typeof media === 'string' || typeof media === 'number') return fallback
  return (media as MediaDoc).alt ?? fallback
}

export function ArtworkCard({
  artwork,
  priority,
  span,
}: {
  artwork: ArtworkDoc
  priority?: boolean
  span?: 'tall' | 'wide' | 'square'
}) {
  const [open, setOpen] = useState(false)
  const accent = artwork.accentColor || 'var(--filament-coral)'
  const coverUrl = getMediaUrl(artwork.cover)
  const coverAlt = getMediaAlt(artwork.cover, artwork.title)

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className={cn(
          'group relative block w-full overflow-hidden rounded-3xl border border-border bg-card text-left transition-shadow',
          span === 'tall' && 'aspect-[3/4] md:row-span-2',
          span === 'wide' && 'aspect-[4/3] md:col-span-2',
          (!span || span === 'square') && 'aspect-square',
        )}
        style={{ ['--accent' as never]: accent }}
      >
        <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${accent}, transparent 70%)` }}
        />

        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={coverAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="h-40 w-40 rounded-full blur-xl"
              style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
            />
            <span className="absolute font-display text-2xl text-muted-foreground">
              {artwork.title}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16">
          {artwork.category && (
            <Badge variant="outline" className="border-white/20 bg-background/40 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              {artwork.category}
            </Badge>
          )}
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
            {artwork.title}
          </h3>
          {artwork.tagline && (
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{artwork.tagline}</p>
          )}
        </div>

        <span
          className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: accent, boxShadow: `0 0 24px 0 ${accent}` }}
        />
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl border-border bg-card p-0">
          <DialogTitle className="sr-only">{artwork.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {artwork.tagline || 'Print details'}
          </DialogDescription>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            {coverUrl ? (
              <Image src={coverUrl} alt={coverAlt} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-muted">
                <span className="font-display text-2xl text-muted-foreground">{artwork.title}</span>
              </div>
            )}
            <DialogClose className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur hover:bg-background">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{artwork.title}</h3>
                {artwork.tagline && (
                  <p className="mt-1 text-sm text-muted-foreground">{artwork.tagline}</p>
                )}
              </div>
              {artwork.category && (
                <Badge variant="outline" className="border-border text-[10px] uppercase tracking-[0.2em]">
                  {artwork.category}
                </Badge>
              )}
            </div>

            {(artwork.materials?.length || artwork.printTimeHours) && (
              <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background/40 p-4 text-sm">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(artwork.cta?.whatsappMessage || `Hi! I love "${artwork.title}". Can we talk?`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Get this on WhatsApp
              </a>
              <a
                href={buildInstagramUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-filament-violet hover:text-filament-violet"
              >
                <InstagramIcon className="h-4 w-4" />
                See more on Instagram
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
