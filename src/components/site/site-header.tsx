'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { siteConfig, buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#trending', label: 'Trending' },
  { href: '/#connect', label: 'Connect' },
]

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-filament-coral to-filament-sun">
        <span className="h-1.5 w-1.5 rounded-full bg-background" />
      </span>
      <span className="font-display text-base font-semibold tracking-tight">{siteConfig.name}</span>
    </span>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 0.9, 0.32, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-background/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-background/40 p-1 backdrop-blur md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildInstagramUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground sm:grid"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={buildWhatsAppUrl('Hi! Just discovered your work — would love to chat.')}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>

          {/* mobile menu */}
          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground md:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-sm border-border bg-card">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-4 flex flex-col px-4">
                {nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    className="border-b border-border py-4 text-left font-display text-xl tracking-tight text-foreground/90 transition-colors hover:text-foreground"
                    render={<Link href={item.href} />}
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 p-4">
                <a
                  href={buildWhatsAppUrl('Hi! Just discovered your work — would love to chat.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message on WhatsApp
                </a>
                <a
                  href={buildInstagramUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @{siteConfig.instagramHandle}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
