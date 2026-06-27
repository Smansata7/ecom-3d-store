import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

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
  category?: string | null
  materials?: string[] | null
  printTimeHours?: number | null
  featured?: boolean | null
  accentColor?: string | null
  cover?: MediaDoc | string | number | null
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
