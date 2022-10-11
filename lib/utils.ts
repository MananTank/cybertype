import { heatmapKeys } from './keys'
import { KeyStatRecord } from './types'

export function getSpeed(words: number, time: number) {
  return words === 0 || time === 0 ? 0 : Math.round((words / time) * 60 * 1000)
}

export function createEmptyKeyStatRecord() {
  const value: KeyStatRecord = {}
  heatmapKeys.forEach(key => {
    value[key] = {
      count: 0,
      totalTime: 0
    }
  })

  return value
}

export function getRandomWords(data: string[], count: number) {
  const words = []
  let chars = 0

  while (chars < count) {
    const randomIndex = Math.floor(Math.random() * data.length)
    chars += data[randomIndex].length
    words.push(data[randomIndex] + ' ')
  }

  return words
}
