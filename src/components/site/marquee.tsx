const items = [
  'PRINTED ON CREALITY K2 PLUS',
  '600 mm/s',
  '350 °C HOTEND',
  '60 °C CHAMBER',
  'AI FLOW CALIBRATION',
  'STEP-SERVO MOTION',
  '30,000 mm/s² ACCELERATION',
  'UP TO 16 COLOURS',
]

export function StatsMarquee() {
  const row = [...items, ...items]
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-border bg-background/30 py-4"
    >
      <div className="marquee flex w-max items-center gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
        {row.map((label, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{label}</span>
            <span className="h-1 w-1 rounded-full bg-filament-coral" />
          </span>
        ))}
      </div>
    </section>
  )
}
