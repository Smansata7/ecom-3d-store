import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

// Shared content types live in the client-safe module so both server and
// client components can use them.
export type { MediaDoc, ArtworkDoc, ViralDoc } from './media'
