'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Flame, X, ExternalLink } from 'lucide-react'
import { GithubIcon, WhatsAppIcon } from './brand-icons'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { buildWhatsAppUrl } from '@/lib/site-config'
import { resolveMedia, type ViralDoc } from '@/lib/media'

export function ViralCard({ item, priority }: { item: ViralDoc; priority?: boolean }) {
  const [open, setOpen] = useState(false)
  const cover = resolveMedia(item.cover, item.title)

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 0.9, 0.32, 1] }}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
      >
        {cover.url ? (
          cover.isVideo ? (
            <video
              src={cover.url}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          )
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-secondary/40">
            <span className="px-4 text-center font-display text-lg text-muted-foreground">
              {item.title}
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-filament-coral backdrop-blur">
          <Flame className="h-3 w-3" />
          trending
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4 pt-14">
          <h3 className="font-display text-base font-semibold tracking-tight">{item.title}</h3>
          {item.tags?.length ? (
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {item.tags.join(' · ')}
            </p>
          ) : null}
        </div>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl border-border bg-card p-0 overflow-hidden">
          <DialogTitle className="sr-only">{item.title}</DialogTitle>
          <DialogDescription className="sr-only">{item.pitch || 'Trending product'}</DialogDescription>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/40">
            {cover.url ? (
              cover.isVideo ? (
                <video src={cover.url} muted loop playsInline autoPlay className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <Image src={cover.url} alt={cover.alt} fill className="object-cover" />
              )
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-2xl text-muted-foreground">{item.title}</span>
              </div>
            )}
            <DialogClose className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-background">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="p-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-filament-coral">
              <Flame className="h-3 w-3" />
              trending now
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
            {item.pitch && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.pitch}</p>
            )}

            {item.tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                <GithubIcon className="h-4 w-4" />
                Get the files on GitHub
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
              <a
                href={buildWhatsAppUrl(`Hi! I'm interested in "${item.title}" — can we talk?`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:text-foreground"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Ask me about it
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
