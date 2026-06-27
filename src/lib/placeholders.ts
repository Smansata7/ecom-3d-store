import type { ArtworkDoc, ViralDoc, MediaDoc } from './media'

// Demo media so the gallery has body before real uploads.
// Images: picsum (stable per seed). Videos: Google's public sample bucket.
// Swap these for your own via /admin — these only show when the CMS is empty.

const img = (seed: string): MediaDoc => ({
  id: `img-${seed}`,
  url: `https://picsum.photos/seed/${seed}/900/1150`,
  alt: '',
  mimeType: 'image/jpeg',
})

const vid = (id: string, url: string): MediaDoc => ({
  id: `vid-${id}`,
  url,
  alt: '',
  mimeType: 'video/mp4',
})

// Small, reliable public sample clips (placeholder only).
const SAMPLE_VIDEO_A = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const SAMPLE_VIDEO_B = 'https://www.w3schools.com/html/mov_bbb.mp4'

export const placeholderArtworks: ArtworkDoc[] = [
  {
    id: 'p1',
    title: 'Voronoi Vase',
    slug: 'voronoi-vase',
    tagline: 'Parametric skin, vase mode',
    summary:
      'A vase-mode print wrapped in a parametric Voronoi shell. Light, airy and surprisingly strong, and lovely with dried stems.',
    category: 'decor',
    materials: ['PLA', 'PETG'],
    printTimeHours: 6,
    cover: img('voronoi-vase'),
    gallery: [{ media: img('voronoi-detail') }, { media: img('voronoi-top') }],
  },
  {
    id: 'p2',
    title: 'Articulated Dragon',
    slug: 'articulated-dragon',
    tagline: 'Print-in-place, no supports',
    summary:
      'A fully articulated dragon printed in a single go. Every joint moves, with zero assembly and zero supports.',
    category: 'toys',
    materials: ['PLA'],
    printTimeHours: 9,
    cover: vid('dragon', SAMPLE_VIDEO_A),
    gallery: [{ media: img('dragon-detail') }],
  },
  {
    id: 'p3',
    title: 'Lattice Lamp',
    slug: 'lattice-lamp',
    tagline: 'Translucent PETG over warm LEDs',
    summary:
      'A translucent PETG lattice that scatters warm LED light into soft geometric patterns across the room.',
    category: 'decor',
    materials: ['PETG'],
    printTimeHours: 14,
    cover: img('lattice-lamp'),
  },
  {
    id: 'p4',
    title: 'Cosplay Pauldron',
    slug: 'cosplay-pauldron',
    tagline: 'Light, tough, screen-ready',
    summary:
      'A screen-accurate shoulder piece in carbon-fibre nylon. Light enough to wear all day, tough enough to survive a con.',
    category: 'cosplay',
    materials: ['PA-CF'],
    printTimeHours: 22,
    cover: img('cosplay-pauldron'),
  },
  {
    id: 'p5',
    title: 'Modular Desk Tray',
    slug: 'modular-desk-tray',
    tagline: 'Tile your own workspace',
    summary:
      'Snap-together trays that tile to fit any desk. Configure it for pens, cables, dice, whatever you need.',
    category: 'functional',
    materials: ['PETG'],
    printTimeHours: 4,
    cover: img('desk-tray'),
  },
  {
    id: 'p6',
    title: 'Topology Bowl',
    slug: 'topology-bowl',
    tagline: 'Math-rendered marble',
    summary:
      'A bowl grown from a mathematical surface and printed in a marbled blend, so no two ever come out the same.',
    category: 'experimental',
    materials: ['PLA'],
    printTimeHours: 5,
    cover: vid('topology', SAMPLE_VIDEO_B),
  },
]

export const placeholderViral: ViralDoc[] = [
  {
    id: 'v1',
    title: 'Articulated Koi',
    githubUrl: 'https://github.com/Smansata7',
    tags: ['print-in-place', 'no supports'],
    pitch: 'A flexible, print-in-place koi that wriggles in your hand. The internet could not get enough of it.',
    cover: img('viral-koi'),
  },
  {
    id: 'v2',
    title: 'Gridfinity Set',
    githubUrl: 'https://github.com/Smansata7',
    tags: ['functional', 'desk'],
    pitch: 'A modular drawer-organisation system people keep cloning to tidy every drawer in the house.',
    cover: img('viral-gridfinity'),
  },
  {
    id: 'v3',
    title: 'Whisper Vase',
    githubUrl: 'https://github.com/Smansata7',
    tags: ['vase mode', 'decor'],
    pitch: 'A single-wall spiral vase that prints fast and looks far more expensive than it is.',
    cover: img('viral-whisper'),
  },
  {
    id: 'v4',
    title: 'Mech Keychain',
    githubUrl: 'https://github.com/Smansata7',
    tags: ['fidget', 'gift'],
    pitch: 'A tiny articulated mech that fits on your keys. The perfect cheap, addictive gift print.',
    cover: img('viral-mech'),
  },
]
