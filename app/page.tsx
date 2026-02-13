'use client'

import { Words } from '../components/Words'
import { KeyStats } from '../components/Keyboard'
import { useAppState } from '../lib/state'
import { Footer } from '../components/Nav'
import { Loader } from '../components/Loader'
import { DynamicIsland } from '../components/DynamicIsland'
import { useData } from '../hooks/useData'
import { useKeys } from '../hooks/useKeys'
import { useTypingStarted } from '../hooks/useTyping'
import { useLocalStorage } from '../lib/localStorage'
import { ClientOnly } from '../components/ClientOnly'

export default function Home() {
  const [state, dispatch] = useAppState()

  const targetKey =
    state.words.length === 0
      ? ''
      : state.words[state.progress.wordIndex][state.progress.charIndex]

  // ignore typing when dynamic island is expanded
  const ignoreTyping = state.activePanel !== null

  useData(state.dataName, dispatch)
  useKeys(targetKey, dispatch, state.soundEnabled, state.soundPack, ignoreTyping)
  useTypingStarted(state.typingStarted)
  useLocalStorage(state)

  return (
    <div className="min-h-screen max-w-[1100px] max-[1600px]:max-w-[1000px] max-[1400px]:max-w-[900px] max-[1200px]:max-w-[800px] mx-auto flex flex-col px-5 h-screen">
      <ClientOnly>
        <div className="animate-[slide-in-down_500ms_500ms_ease_backwards]">
          <DynamicIsland state={state} dispatch={dispatch} />
        </div>
      </ClientOnly>

      {/* if there is data to show and no other data is being fetched */}
      {state.data.length && !state.fetchingData ? (
        <Words
          words={state.words}
          progress={state.progress}
          errorLocations={state.errorLocations}
        />
      ) : (
        <Loader />
      )}

      <KeyStats keyStats={state.keyStats} />

      <div className="show-when-typing -z-1 fixed bottom-5 flex items-center justify-center text-sm max-[1500px]:text-xs mt-auto text-secondary w-full transition-opacity duration-200 left-0 align-middle">
        <kbd className="text-[0.9em] pt-[0.2em] pb-[0.4em] px-[0.8em] rounded-[0.2em] block mr-2.5 border border-secondary">
          enter
        </kbd>{' '}
        to reset / change
      </div>

      <Footer />
    </div>
  )
}
