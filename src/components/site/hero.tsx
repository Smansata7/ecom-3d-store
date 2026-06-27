'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroShowcase } from './hero-showcase'

const ease = [0.22, 0.9, 0.32, 1] as const

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-0 lg:pt-24">
        {/* text column */}
        <div className="order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground"
          >
            Made-to-order 3D printed pieces
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
            className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Objects worth keeping, <span className="accent-text">made to order.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A small studio of sculptural and functional prints — vases, lamps, figures,
            props and the occasional strange experiment. Browse the work; if something
            speaks to you, one tap reaches me directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              Browse the gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#trending"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              See what&apos;s trending
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground/60 lg:mt-14"
          >
            Each piece printed in-house on a Creality K2 Plus
          </motion.p>
        </div>

        {/* animated showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="order-2 w-full"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  )
}
