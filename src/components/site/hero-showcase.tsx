'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const STAGES = ['Filament', 'Printing', 'Finished'] as const
const VASE =
  'M168,300 C140,270 140,200 168,170 C182,155 182,150 174,134 L174,96 C174,90 178,86 184,86 L216,86 C222,86 226,90 226,96 L226,134 C218,150 218,155 232,170 C260,200 260,270 232,300 Z'

export function HeroShowcase() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // ~7s loop split across the three stages
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2333)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl backdrop-blur-sm lg:max-w-none">
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-filament-coral" />
          filament → form
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/60">K2 Plus</span>
      </div>

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="vaseFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--filament-coral)" />
            <stop offset="100%" stopColor="var(--filament-violet)" />
          </linearGradient>
          <pattern id="layers" width="10" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="10" y2="3" stroke="black" strokeOpacity="0.18" strokeWidth="3" />
          </pattern>
          <clipPath id="vaseClip">
            <path d={VASE} />
          </clipPath>
          <clipPath id="buildClip">
            {/* defaults to finished state; animated bottom-up by .hero-build */}
            <rect className="hero-build" x="130" y="86" width="140" height="214" />
          </clipPath>
        </defs>

        {/* build plate */}
        <ellipse cx="200" cy="300" rx="120" ry="9" fill="oklch(1 0 0 / 0.04)" />
        <line x1="78" y1="300" x2="322" y2="300" stroke="var(--border)" strokeWidth="2" />

        {/* vase — revealed by the rising build clip, shaped by the vase clip */}
        <g clipPath="url(#buildClip)">
          <g clipPath="url(#vaseClip)">
            <rect x="120" y="80" width="160" height="224" fill="url(#vaseFill)" />
            <rect x="120" y="80" width="160" height="224" fill="url(#layers)" />
          </g>
          <path d={VASE} fill="none" stroke="oklch(1 0 0 / 0.18)" strokeWidth="1.5" />
        </g>

        {/* finished glow outline */}
        <path className="hero-finish" d={VASE} fill="none" stroke="var(--filament-sun)" strokeWidth="2.5" />

        {/* print head (descends as the piece rises; oscillates horizontally) */}
        <g className="hero-head-y">
          <g className="hero-head-x">
            <rect x="158" y="62" width="84" height="9" rx="3" fill="var(--muted-foreground)" />
            <rect x="150" y="58" width="12" height="17" rx="2" fill="var(--muted-foreground)" />
            <rect x="238" y="58" width="12" height="17" rx="2" fill="var(--muted-foreground)" />
            <path d="M192,71 L208,71 L203,86 L197,86 Z" fill="var(--filament-coral)" />
          </g>
        </g>

        {/* filament spool, top-left, slowly rotating */}
        <g transform="translate(70,72)">
          <g className="hero-spin">
            <circle r="27" fill="none" stroke="var(--filament-cyan)" strokeWidth="6" strokeOpacity="0.45" />
            <circle r="17" fill="none" stroke="var(--filament-cyan)" strokeWidth="3" strokeOpacity="0.4" />
            <circle r="5" fill="var(--filament-cyan)" />
            <line x1="0" y1="-27" x2="0" y2="-17" stroke="var(--filament-cyan)" strokeWidth="3" />
            <line x1="0" y1="27" x2="0" y2="17" stroke="var(--filament-cyan)" strokeWidth="3" />
          </g>
        </g>

        {/* filament strand feeding into the gantry */}
        <path
          className="hero-feed"
          d="M70,42 C120,16 250,26 200,58"
          fill="none"
          stroke="var(--filament-cyan)"
          strokeWidth="2.5"
          strokeOpacity="0.7"
        />
      </svg>

      {/* auto-cycling stage labels (the "tabs") */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 p-4">
        {STAGES.map((s, idx) => (
          <span
            key={s}
            className={cn(
              'rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-500',
              idx === stage
                ? 'bg-foreground text-background'
                : 'bg-secondary/60 text-muted-foreground',
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
