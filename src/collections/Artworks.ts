import type { CollectionConfig } from 'payload'

export const Artworks: CollectionConfig = {
  slug: 'artworks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "voronoi-vase"',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'One-line hook shown on cards.' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Functional', value: 'functional' },
        { label: 'Decor', value: 'decor' },
        { label: 'Toys & Models', value: 'toys' },
        { label: 'Cosplay & Props', value: 'cosplay' },
        { label: 'Experimental', value: 'experimental' },
      ],
      defaultValue: 'decor',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Hero image for this piece.' },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'materials',
      type: 'select',
      hasMany: true,
      options: ['PLA', 'PETG', 'PET', 'ABS', 'ASA', 'PLA-CF', 'PA-CF', 'PPA-CF'],
    },
    {
      name: 'printTimeHours',
      type: 'number',
      admin: { description: 'Total print time in hours.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on the homepage featured grid.' },
    },
    {
      name: 'accentColor',
      type: 'text',
      defaultValue: '#FF5C39',
      admin: { description: 'Hex color used for hover glow on cards.' },
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'whatsappMessage',
          type: 'text',
          admin: {
            description: 'Pre-filled message when a viewer clicks "Get this on WhatsApp".',
          },
          defaultValue: "Hi! I love this piece — can we talk about getting one?",
        },
      ],
    },
  ],
}
