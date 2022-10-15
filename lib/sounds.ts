import { Howl } from 'howler'

function packPlayer(pack: string, format: string, volume: number) {
  const clicks: Howl[] = []
  for (let i = 0; i < 6; i++) {
    clicks[i] = new Howl({ src: `/sounds/${pack}/click${i + 1}.${format}`, volume })
  }

  return () => {
    const i = Math.round(Math.random() * 5)
    clicks[i].play()
  }
}

export function getSounds() {
  const error = new Howl({ src: '/sounds/error.wav', volume: 0.3 })
  return {
    packs: {
      nkCreams: packPlayer('nkCreams', 'aac', 0.8),
      otemuBrowns: packPlayer('otemuBrowns', 'aac', 0.8),
      holyPandas: packPlayer('holyPandas', 'wav', 0.8)
    },
    error: () => error.play()
  }
}

type SoundPackInfo = {
  name: string
  id: SoundPack
  type: string
}

export const soundPacks: SoundPackInfo[] = [
  { name: 'NK Creams', id: 'nkCreams', type: 'Linear' },
  { name: 'Otemu Browns', id: 'otemuBrowns', type: 'Tactile' },
  { name: 'Holy Pandas', id: 'holyPandas', type: 'Tactile' }
]

export type Sounds = ReturnType<typeof getSounds>

export type SoundPack = keyof Sounds['packs']
