import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Artworks } from './collections/Artworks'
import { ViralPicks } from './collections/ViralPicks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURI = process.env.DATABASE_URI || 'file:./payload.db'

// Use Postgres (e.g. Neon, for Vercel) when given a postgres connection string,
// otherwise fall back to a local SQLite file for development. Vercel's
// filesystem is ephemeral, so production must point DATABASE_URI at Neon.
const isPostgres = /^postgres(ql)?:\/\//.test(databaseURI)

const db = isPostgres
  ? postgresAdapter({
      pool: { connectionString: databaseURI },
    })
  : sqliteAdapter({
      client: { url: databaseURI },
    })

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Studio',
    },
  },
  collections: [Users, Media, Artworks, ViralPicks],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-dev-secret-rotate-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db,
  sharp,
})
