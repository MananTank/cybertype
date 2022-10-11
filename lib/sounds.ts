import { Howl } from 'howler'

export type Sounds = {
  randomClick: () => void
  error: Howl
}

export function getSounds(): Sounds {
  const click1 = new Howl({ src: '/sounds/click1.aac', volume: 0.3 })
  const click2 = new Howl({ src: '/sounds/click2.aac', volume: 0.3 })
  const click3 = new Howl({ src: '/sounds/click3.aac', volume: 0.3 })
  const click4 = new Howl({ src: '/sounds/click4.aac', volume: 0.3 })
  const click5 = new Howl({ src: '/sounds/click5.aac', volume: 0.3 })
  const click6 = new Howl({ src: '/sounds/click6.aac', volume: 0.3 })

  const clicks = [click1, click2, click3, click4, click5, click6]

  return {
    randomClick: () => {
      const i = Math.round(Math.random() * (clicks.length - 1))
      clicks[i].play()
    },
    error: new Howl({ src: '/sounds/bubble.wav', volume: 0.3 })
  }
}
