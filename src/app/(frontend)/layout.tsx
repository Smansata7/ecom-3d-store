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
        <SmoothScroll />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
