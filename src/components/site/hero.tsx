'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* glowing orbs */}
      <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-filament-coral/30 blur-3xl float-y" />
      <div className="absolute right-[-10%] top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-filament-violet/25 blur-3xl float-y [animation-delay:-2s]" />
      <div className="absolute bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-filament-mint/20 blur-3xl float-y [animation-delay:-4s]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-filament-sun" />
          A studio built around the Creality K2 Plus
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[9.5rem]"
        >
          Where
          <span className="ml-3 inline-block filament-text">filament</span>
          <br />
          becomes
          <span className="ml-3 inline-block printed-text">form</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Sculpture, props and tiny machines — layer by layer, 600 mm/s at a time.
          No catalogues, no checkout. If a piece grabs you, tap a button to come say hi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            See the work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#printer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-filament-coral hover:text-filament-coral"
          >
            Meet the printer
          </Link>
        </motion.div>

        {/* live stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {[
            { label: 'Build volume', value: '350³ mm' },
            { label: 'Top speed', value: '600 mm/s' },
            { label: 'Accel', value: '30,000 mm/s²' },
            { label: 'Hot end', value: '350 °C' },
          ].map((stat) => (
            <div key={stat.label} className="bg-background/80 p-4 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-lg font-semibold sm:text-xl">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
