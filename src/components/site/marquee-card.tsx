'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { Plus } from 'lucide-react'
import { resolveMedia, type ArtworkDoc } from '@/lib/media'

export function MarqueeCard({
  artwork,
  onOpen,
}: {
  artwork: ArtworkDoc
  onOpen: (artwork: ArtworkDoc) => void
}) {
  const cover = resolveMedia(artwork.cover, artwork.title)
  const videoRef = useRef<HTMLVideoElement>(null)
  const blurb = artwork.summary || artwork.tagline

  const handleEnter = () => {
    const v = videoRef.current
    if (v) {
      v.play().catch(() => {})
    }
  }
  const handleLeave = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(artwork)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className="group/card relative h-[24rem] w-[18rem] shrink-0 overflow-hidden rounded-2xl border border-border bg-card text-left transition-[transform,border-color] duration-500 hover:scale-[1.02] hover:border-white/20 sm:h-[26rem] sm:w-[20rem]"
    >
      {cover.url ? (
        cover.isVideo ? (
          <video
            ref={videoRef}
            src={cover.url}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="20rem"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover/card:scale-105"
          />
        )
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-secondary/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
            no image yet
          </span>
        </div>
      )}

      {/* video badge */}
      {cover.isVideo && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-background/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground backdrop-blur">
          video
        </span>
      )}

      {/* base caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/55 to-transparent p-5 pt-20">
        {artwork.category && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {artwork.category}
          </span>
        )}
        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{artwork.title}</h3>

        {/* hover reveal: short description + open hint */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100">
          <div className="overflow-hidden">
            {blurb && (
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {blurb}
              </p>
            )}
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
              <Plus className="h-3.5 w-3.5" />
              View details
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
