import { SoundPack } from './sounds'

export type Progress = {
  wordIndex: number
  charIndex: number
}

export type KeyStat = {
  totalTime: number
  count: number
}

export type KeyStatRecord = Record<string, KeyStat>

export type ErrorLocations = Record<number, Record<number, boolean>> // { 0: { 1: true, 3: true  }}

export type State = {
  soundPack: SoundPack
  showSoundSelector: boolean
  showDataSelector: boolean
  showThemes: boolean
  soundEnabled: boolean
  fetchingData: boolean
  data: string[]
  dataName: string
  typingStarted: boolean
  totalTimeTaken: number
  totalWordsTyped: number
  totalCharsTyped: number
  totalErrors: number
  keyStats: KeyStatRecord
  words: string[]
  errorLocations: ErrorLocations
  progress: Progress
  lastWordTypedTime: number
  lastCharTypedTime: number
}

export type Action =
  | { type: 'reset' }
  | { type: 'keydown'; key: string }
  | { type: 'back'; alt: boolean }
  | { type: 'setData'; dataName: State['dataName']; data: State['data'] }
  | { type: 'setDataName'; data: State['dataName'] }
  | {
      type: 'setFetchingData'
      data: boolean
    }
  | {
      type: 'setSoundEnabled'
      data: boolean
    }
  | {
      type: 'setShowThemes'
      data: boolean
    }
  | {
      type: 'setShowTips'
      data: boolean
    }
  | {
      type: 'setShowDataSelector'
      data: boolean
    }
  | {
      type: 'setShowSoundSelector'
      data: boolean
    }
  | {
      type: 'setSoundPack'
      data: SoundPack
    }

export type QuoteData = {
  text: string
  source: string
}

/**
 * Only supported on Chrome and Android Webview.
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>
}

export type Theme = {
  // main
  bg: string
  primary: string
  secondary: string
  tertiary: string
  error: string
  // speeds
  fastest: string
  fast: string
  normal: string
  slow: string
  slowest: string
}
