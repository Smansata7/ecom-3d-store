import Link from 'next/link'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import { LogoMark } from './logo'
import { siteConfig, buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer id="connect" className="relative mt-32 border-t border-border bg-background/40 backdrop-blur-sm">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-filament-coral/60 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div className="space-y-4">
          <div className="group flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 shrink-0" />
            <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            A small studio making sculptural and functional 3D printed pieces, printed to
            order in the colours and materials you want. See something you like? Reach out.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link href="/#trending" className="hover:text-foreground">Trending</Link></li>
            <li>
              {/* /admin is served by Payload, not a Next page route — plain anchor is correct. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/admin" className="text-muted-foreground/70 hover:text-foreground">
                Studio (admin)
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Say hi
          </p>
          <a
            href={buildWhatsAppUrl("Hi! I'd love to talk about a print.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-filament-mint hover:text-filament-mint"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={buildInstagramUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 transition-colors hover:border-filament-violet hover:text-filament-violet"
          >
            <InstagramIcon className="h-4 w-4" />
            @{siteConfig.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-border/80">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All pieces made to order.</p>
          <p className="font-mono text-muted-foreground/70">
            Printed in-house · Creality K2 Plus
          </p>
        </div>
      </div>
    </footer>
  )
}
