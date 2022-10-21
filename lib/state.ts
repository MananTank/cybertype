import { useRef } from 'react'
import { useImmerReducer } from 'use-immer'
import {
  getLocalStorage,
  dataNameValidator,
  booleanValidator,
  soundPackValidator
} from './localStorage'
import { SoundPack } from './sounds'
import { State, Action, QuoteData } from './types'
import { getRandomWords, createEmptyKeyStatRecord } from './utils'

type LoadedData = Record<State['dataName'], State['data'] | undefined>

// key-value store of all the data loaded from network
export const loadedData = {} as LoadedData

const initWords = 500

// new words will be appended if less than bufferWords are left to be typed
const bufferWords = 100

export function stateReducer(state: State, action: Action): void {
  switch (action.type) {
    case 'setData': {
      loadedData[state.dataName] = action.data
      state.data = action.data
      // need to reset when setting new data
      reset(state)
      return
    }

    case 'setSoundPack': {
      state.soundPack = action.data
      return
    }

    case 'setShowDataSelector': {
      state.showDataSelector = action.data
      return
    }

    case 'setDataName': {
      state.dataName = action.data
      return
    }

    case 'setShowSoundSelector': {
      state.showSoundSelector = action.data
      return
    }

    case 'setShowThemes': {
      state.showThemes = action.data
      return
    }

    case 'back': {
      if (action.alt) {
        if (state.progress.charIndex === 0) {
          if (state.progress.wordIndex === 0) return
          state.progress.wordIndex--
        }

        state.progress.charIndex = 0
      } else {
        if (state.progress.charIndex === 0) {
          if (state.progress.wordIndex === 0) return
          state.progress.charIndex = state.words[state.progress.wordIndex - 1].length - 1
          state.progress.wordIndex--
        } else {
          state.progress.charIndex--
        }
      }

      return
    }

    case 'reset': {
      reset(state)
      return
    }

    case 'setFetchingData': {
      state.fetchingData = action.data
      return
    }

    case 'setSoundEnabled': {
      state.soundEnabled = action.data
      return
    }

    case 'keydown': {
      const targetKey = state.words[state.progress.wordIndex][state.progress.charIndex]
      const now = performance.now()

      if (!state.typingStarted) {
        handleFirstKeyDown(state, now)
      }

      const isCorrect = action.key === targetKey

      if (!isCorrect) {
        handleIncorrectKeyDown(state)
      } else {
        fixErrorsIfCorrected(state)
      }

      handleKeyDown(state, action.key, now, isCorrect)

      return
    }
  }
}

function fixErrorsIfCorrected(state: State) {
  const w = state.progress.wordIndex
  const c = state.progress.charIndex

  if (state.errorLocations[w] && state.errorLocations[w][c]) {
    state.errorLocations[w][c] = false
  }
}

function handleFirstKeyDown(state: State, time: number) {
  state.typingStarted = true
  state.lastCharTypedTime = time
  state.lastWordTypedTime = time
}

function handleKeyDown(
  state: State,
  key: string,
  keyDownTime: number,
  isCorrect: boolean
) {
  // update the stats for the key

  if (isCorrect) {
    const stats = state.keyStats[key.toLowerCase()]

    // if we are tracking the stat for this key
    if (stats) {
      const keyStats = stats
      keyStats.count = keyStats.count + 1
      keyStats.totalTime = keyStats.totalTime + (keyDownTime - state.lastCharTypedTime)
    }

    state.totalCharsTyped++
  }

  state.totalTimeTaken = state.totalTimeTaken + (keyDownTime - state.lastCharTypedTime)

  // word not fully typed, progress to next character
  if (state.progress.charIndex < state.words[state.progress.wordIndex].length - 1) {
    state.progress.charIndex++
  } else {
    // if word fully typed, progress to next word if there is a next word
    // set progress to next word
    state.progress.wordIndex++
    state.progress.charIndex = 0
  }

  // update the number of words typed and total time taken
  if (isCorrect) {
    state.totalWordsTyped++
    state.lastWordTypedTime = keyDownTime
    state.lastCharTypedTime = keyDownTime
  }

  // append new words if required
  if (state.progress.wordIndex > state.words.length - bufferWords) {
    appendWords(state)
  }
}

function handleIncorrectKeyDown(state: State) {
  const w = state.progress.wordIndex
  const c = state.progress.charIndex
  if (!state.errorLocations[w]) {
    state.errorLocations[w] = {}
  }

  state.totalErrors++
  state.errorLocations[w][c] = true
}

function getRandomQuotes(data: QuoteData[], charCount: number) {
  const words: string[] = []
  const wordCount = charCount / 5

  while (words.length < wordCount) {
    const i = Math.round(Math.random() * data.length)
    const newWords = data[i].text.split(' ').map(w => w + ' ')
    words.push(...newWords)
  }
  return words
}

function appendWords(state: State, count = 200) {
  const words = state.words
  if (state.dataName === 'Quotes') {
    state.words = [
      ...words,
      ...getRandomQuotes(state.data as unknown as QuoteData[], count)
    ]
  } else {
    state.words = [...words, ...getRandomWords(state.data, count)]
  }
}

function reset(state: State) {
  // reset progress
  state.totalErrors = 0
  state.typingStarted = false
  state.lastWordTypedTime = 0
  state.lastCharTypedTime = 0
  state.totalTimeTaken = 0
  state.totalWordsTyped = 0
  state.totalCharsTyped = 0
  state.keyStats = createEmptyKeyStatRecord()
  state.errorLocations = {}
  state.progress = {
    wordIndex: 0,
    charIndex: 0
  }

  // set new words
  state.words = []
  appendWords(state, initWords)
}

export function getInitialState(): State {
  const soundPack = getLocalStorage(
    'soundPack',
    'nkCreams',
    soundPackValidator
  ) as SoundPack

  const soundEnabled =
    getLocalStorage('soundEnabled', 'true', booleanValidator) === 'false' ? false : true

  const dataName = getLocalStorage(
    'dataName',
    'English 200',
    dataNameValidator
  ) as State['dataName']

  return {
    soundPack,
    showDataSelector: false,
    showSoundSelector: false,
    showThemes: false,
    soundEnabled,
    fetchingData: false,
    data: [],
    dataName,
    totalErrors: 0,
    typingStarted: false,
    words: [],
    lastWordTypedTime: 0,
    lastCharTypedTime: 0,
    totalTimeTaken: 0,
    totalWordsTyped: 0,
    totalCharsTyped: 0,
    keyStats: createEmptyKeyStatRecord(),
    errorLocations: {},
    progress: {
      wordIndex: 0,
      charIndex: 0
    }
  }
}

export function useAppState() {
  // only call getInitialState once
  // because there is no idiomatic way to do it in useImmerReducer hook itself
  const rendered = useRef(false)
  const [state, dispatch] = useImmerReducer(
    stateReducer,
    rendered.current ? (null as unknown as State) : getInitialState()
  )
  rendered.current = true
  return [state, dispatch] as const
}
