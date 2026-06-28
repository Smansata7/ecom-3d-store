import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

/**
 * Brand mark — a filament spool. Front-on view: an outer flange with mounting
 * holes, a ring of wound, multi-colour filament, a central hub, and the loose
 * filament end. The wound filament + tail spin gently (faster on hover when the
 * mark sits inside a `.group`). Pure SVG with brand CSS vars so it themes
 * automatically; for a portable, hard-coded version see /public/logo.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Filament spool">
      <defs>
        <linearGradient id="spoolFilament" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--filament-coral)" />
          <stop offset="45%" stopColor="var(--filament-sun)" />
          <stop offset="100%" stopColor="var(--filament-violet)" />
        </linearGradient>
      </defs>

      {/* flange disc */}
      <circle cx="20" cy="20" r="19" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />

      {/* wound filament + loose end (the part that spins) */}
      <g className="spool-spin">
        {/* solid coil band */}
        <circle cx="20" cy="20" r="12.5" fill="none" stroke="url(#spoolFilament)" strokeWidth="7" />
        {/* winding grooves inside the band, so it reads as coiled filament */}
        <circle cx="20" cy="20" r="14.3" fill="none" stroke="black" strokeOpacity="0.14" strokeWidth="0.6" />
        <circle cx="20" cy="20" r="12.5" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="0.6" />
        <circle cx="20" cy="20" r="10.7" fill="none" stroke="black" strokeOpacity="0.14" strokeWidth="0.6" />
      </g>

      {/* central hub + holes (static) */}
      <circle cx="20" cy="20" r="5.5" fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
      <circle cx="20" cy="20" r="1.8" fill="var(--muted-foreground)" />
      <g fill="var(--background)" stroke="var(--border)" strokeWidth="0.5">
        <circle cx="20" cy="9.2" r="1.4" />
        <circle cx="30.8" cy="20" r="1.4" />
        <circle cx="20" cy="30.8" r="1.4" />
        <circle cx="9.2" cy="20" r="1.4" />
      </g>
    </svg>
  )
}

/** Full lockup: spool mark + wordmark. */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('group flex items-center gap-2.5', className)}>
      <LogoMark className={cn('h-9 w-9 shrink-0', markClassName)} />
      <span className="font-display text-base font-semibold tracking-tight">{siteConfig.name}</span>
    </span>
  )
}
