export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Filament & Form',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999',
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'your_instagram',
}

export function buildWhatsAppUrl(message: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function buildInstagramUrl() {
  return `https://instagram.com/${siteConfig.instagramHandle}`
}
