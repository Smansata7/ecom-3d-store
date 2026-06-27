'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { InstagramIcon, WhatsAppIcon } from './brand-icons'
import { siteConfig, buildInstagramUrl, buildWhatsAppUrl } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#printer', label: 'The Printer' },
  { href: '/#connect', label: 'Connect' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.32, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-xl bg-background/60 border-b border-border'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-filament-coral via-filament-sun to-filament-violet shadow-[0_0_24px_-4px_var(--filament-coral)] transition-transform group-hover:rotate-12">
            <span className="h-2 w-2 rounded-full bg-background" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

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
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-filament-violet hover:text-filament-violet"
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
        </div>
      </div>
    </motion.header>
  )
}
