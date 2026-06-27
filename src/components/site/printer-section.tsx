'use client'

import { motion } from 'motion/react'
import { Cpu, Flame, Layers, Ruler, Sparkles, Wifi } from 'lucide-react'

const specs = [
  {
    icon: Ruler,
    label: 'Build volume',
    value: '350 × 350 × 350 mm',
    detail: 'Big enough for a helmet, small enough for a desk.',
    accent: 'var(--filament-coral)',
  },
  {
    icon: Sparkles,
    label: 'Top speed / accel',
    value: '600 mm/s · 30,000 mm/s²',
    detail: 'Step-servo motion on every axis. Whisper quiet.',
    accent: 'var(--filament-sun)',
  },
  {
    icon: Flame,
    label: 'Hotend / bed / chamber',
    value: '350 °C · 120 °C · 60 °C',
    detail: 'ABS, ASA and CF blends print clean — no warping drama.',
    accent: 'var(--filament-violet)',
  },
  {
    icon: Layers,
    label: 'Materials',
    value: 'PLA · PETG · PET · ABS · ASA · PLA-CF · PA-CF · PPA-CF',
    detail: 'Apus dual-gear direct drive eats hard filament for breakfast.',
    accent: 'var(--filament-mint)',
  },
  {
    icon: Cpu,
    label: 'AI vision',
    value: '1080p chamber cam + nozzle AI',
    detail: 'Flow calibrates itself. Failures get spotted before they spaghetti.',
    accent: 'var(--filament-cyan)',
  },
  {
    icon: Wifi,
    label: 'Multicolor',
    value: 'Up to 16 colors (CFS × 4)',
    detail: 'Print stories, not just shapes.',
    accent: 'var(--filament-coral)',
  },
]

export function PrinterSection() {
  return (
    <section id="printer" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {'// the printer'}
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Creality K2 Plus.
          <br className="hidden sm:block" />
          <span className="filament-text">My collaborator.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Every piece on this site came off this one machine. Here's what it can do.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec, i) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-white/20"
              style={{ ['--accent' as never]: spec.accent }}
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: spec.accent }}
              />

              <div className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border"
                  style={{ background: `${spec.accent}1f`, color: spec.accent }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {spec.label}
                </p>
              </div>

              <p className="mt-5 font-display text-2xl font-semibold tracking-tight">
                {spec.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{spec.detail}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
