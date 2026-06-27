import type { CollectionConfig } from 'payload'

export const ViralPicks: CollectionConfig = {
  slug: 'viral-picks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'githubUrl', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pitch',
      type: 'textarea',
      admin: { description: 'Why this one is trending and worth cloning.' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
      admin: { description: 'Public GitHub URL with the printable files.' },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { description: 'Short labels like "trending", "TikTok hit".' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
}
