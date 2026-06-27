'use client'

import { useState } from 'react'
import { MarqueeCard } from './marquee-card'
import { ArtworkDialog } from './artwork-dialog'
import type { ArtworkDoc } from '@/lib/media'

function MarqueeRow({
  items,
  onOpen,
  direction = 'normal',
  durationSeconds = 60,
}: {
  items: ArtworkDoc[]
  onOpen: (a: ArtworkDoc) => void
  direction?: 'normal' | 'reverse'
  durationSeconds?: number
}) {
  if (items.length === 0) return null
  // Duplicate so the -50% translate loops seamlessly.
  const doubled = [...items, ...items]

  return (
    <div
      className="group relative w-full overflow-x-hidden py-2 motion-reduce:overflow-x-auto"
      // subtle edge fade so cards slip in/out instead of hard-cutting
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div
        className="marquee-track flex w-max gap-5"
        style={
          {
            '--marquee-duration': `${durationSeconds}s`,
            '--marquee-direction': direction,
          } as React.CSSProperties
        }
      >
        {doubled.map((artwork, i) => (
          <MarqueeCard key={`${artwork.id}-${i}`} artwork={artwork} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

export function MarqueeGallery({
  items,
  rows = 1,
}: {
  items: ArtworkDoc[]
  rows?: 1 | 2
}) {
  const [active, setActive] = useState<ArtworkDoc | null>(null)
  const [open, setOpen] = useState(false)

  const onOpen = (a: ArtworkDoc) => {
    setActive(a)
    setOpen(true)
  }

  let content
  if (rows === 2 && items.length > 3) {
    const mid = Math.ceil(items.length / 2)
    content = (
      <div className="space-y-5">
        <MarqueeRow items={items.slice(0, mid)} onOpen={onOpen} durationSeconds={70} />
        <MarqueeRow items={items.slice(mid)} onOpen={onOpen} direction="reverse" durationSeconds={85} />
      </div>
    )
  } else {
    content = <MarqueeRow items={items} onOpen={onOpen} durationSeconds={60} />
  }

  return (
    <>
      {content}
      <ArtworkDialog artwork={active} open={open} onOpenChange={setOpen} />
    </>
  )
}
