import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { SmoothScroll } from '@/components/site/smooth-scroll'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import '../globals.css'

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})
const display = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
})
const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Filament & Form'

export const metadata: Metadata = {
  title: {
    default: `${siteName} — 3D Printed Artwork`,
    template: `%s — ${siteName}`,
  },
  description:
    'Hand-printed sculpture, decor and props from a Creality K2 Plus studio. Browse the gallery, follow viral drops, and reach out on WhatsApp or Instagram.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${mono.variable} antialiased`}>
        {/* ambient background texture + glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-[0.75] [mask-image:radial-gradient(ellipse_110%_85%_at_50%_25%,black_45%,transparent_92%)]" />
          <div className="float-y absolute left-[-12%] top-[-8%] h-[42rem] w-[42rem] rounded-full bg-filament-coral/10 blur-[150px]" />
          <div className="float-y absolute right-[-14%] top-[28%] h-[38rem] w-[38rem] rounded-full bg-filament-violet/10 blur-[150px] [animation-delay:-3s]" />
          <div className="float-y absolute bottom-[-10%] left-[30%] h-[34rem] w-[34rem] rounded-full bg-filament-mint/8 blur-[150px] [animation-delay:-6s]" />
        </div>
        <SmoothScroll />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
