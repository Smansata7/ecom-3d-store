// Client-safe media types + helpers (no server-only imports here, so these
// can be used from client components like cards and dialogs).

export type MediaDoc = {
  id: string | number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null
}

export type ArtworkDoc = {
  id: string | number
  title: string
  slug: string
  tagline?: string | null
  summary?: string | null
  // Lexical rich-text JSON; rendered with @payloadcms/richtext-lexical/react
  description?: { root?: unknown } | null
  category?: string | null
  materials?: string[] | null
  printTimeHours?: number | null
  featured?: boolean | null
  accentColor?: string | null
  cover?: MediaDoc | string | number | null
  gallery?:
    | { id?: string; media?: MediaDoc | string | number | null; caption?: string | null }[]
    | null
  cta?: { whatsappMessage?: string | null } | null
}

export type ViralDoc = {
  id: string | number
  title: string
  pitch?: string | null
  githubUrl: string
  tags?: string[] | null
  order?: number | null
  cover?: MediaDoc | string | number | null
}

type AnyMedia = MediaDoc | string | number | null | undefined

export type ResolvedMedia = {
  url: string | null
  alt: string
  isVideo: boolean
}

export function resolveMedia(media: AnyMedia, fallbackAlt = ''): ResolvedMedia {
  if (!media || typeof media === 'string' || typeof media === 'number') {
    return { url: null, alt: fallbackAlt, isVideo: false }
  }
  const m = media as MediaDoc
  return {
    url: m.url ?? null,
    alt: m.alt ?? fallbackAlt,
    isVideo: (m.mimeType ?? '').startsWith('video/'),
  }
}
