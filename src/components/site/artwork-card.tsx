'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { resolveMedia, type ArtworkDoc } from '@/lib/media'

function Media({
  url,
  alt,
  isVideo,
  priority,
  className,
  sizes,
}: {
  url: string
  alt: string
  isVideo: boolean
  priority?: boolean
  className?: string
  sizes?: string
}) {
  if (isVideo) {
    return (
      <video
        src={url}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className={className}
      />
    )
  }
  return (
    <Image src={url} alt={alt} fill priority={priority} sizes={sizes} className={className} />
  )
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
  const cover = resolveMedia(artwork.cover, artwork.title)

  const gallery = useMemo(() => {
    const items = (artwork.gallery ?? [])
      .map((g) => resolveMedia(g?.media, artwork.title))
      .filter((m) => m.url)
    // include the cover first so the dialog always has at least one frame
    return [cover, ...items].filter((m) => m.url) as { url: string; alt: string; isVideo: boolean }[]
  }, [artwork.gallery, cover, artwork.title])

  const [active, setActive] = useState(0)
  const activeMedia = gallery[active] ?? cover

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setActive(0)
          setOpen(true)
        }}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 0.9, 0.32, 1] }}
        className={cn(
          'group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left',
          span === 'tall' && 'aspect-[3/4] md:row-span-2',
          span === 'wide' && 'aspect-[4/3] md:col-span-2',
          (!span || span === 'square') && 'aspect-square',
        )}
      >
        {cover.url ? (
          <Media
            url={cover.url}
            alt={cover.alt}
            isVideo={cover.isVideo}
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-secondary/40">
            <span className="px-4 text-center font-display text-lg text-muted-foreground">
              {artwork.title}
            </span>
          </div>
        )}

        {/* readable caption gradient */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-5 pt-16">
          {artwork.category && (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {artwork.category}
            </span>
          )}
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
            {artwork.title}
          </h3>
          {artwork.tagline && (
            <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{artwork.tagline}</p>
          )}
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl border-border bg-card p-0 overflow-hidden">
          <DialogTitle className="sr-only">{artwork.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {artwork.tagline || 'Print details'}
          </DialogDescription>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/40">
            {activeMedia.url ? (
              <Media
                url={activeMedia.url}
                alt={activeMedia.alt}
                isVideo={activeMedia.isVideo}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-2xl text-muted-foreground">{artwork.title}</span>
              </div>
            )}
            <DialogClose className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-background">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {/* thumbnail strip when there's more than one frame */}
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
                    <video src={m.url} muted playsInline className="h-full w-full object-cover" />
                  ) : (
                    <Image src={m.url} alt={m.alt} fill sizes="56px" className="object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}

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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(artwork.cta?.whatsappMessage || `Hi! I love "${artwork.title}". Can we talk?`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enquire on WhatsApp
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
    </>
  )
}
