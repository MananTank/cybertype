'use client'

import React from 'react'
import { Words } from '../components/Words'
import { KeyStats } from '../components/Keyboard'
import { useAppState } from '../lib/state'
import { Footer } from '../components/Nav'
import { DynamicIsland } from '../components/DynamicIsland'
import { useData } from '../hooks/useData'
import { useKeys } from '../hooks/useKeys'
import { useTypingStarted } from '../hooks/useTyping'
import { useLocalStorage } from '../lib/localStorage'
import { ClientOnly } from '../components/ClientOnly'
import { RotateCcw } from 'lucide-react'
import { motion, useAnimate } from 'motion/react'

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
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col px-5 h-screen">
      <ClientOnly>
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        >
          <DynamicIsland state={state} dispatch={dispatch} />
        </motion.div>
      </ClientOnly>

      {/* if there is data to show */}
      <div className="grow flex flex-col justify-center">
        <Words
          words={state.words}
          progress={state.progress}
          errorLocations={state.errorLocations}
        />
      </div>

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      >
        <ResetButton onReset={() => dispatch({ type: 'reset' })} />
      </motion.div>

      <motion.div
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
      >
        <KeyStats keyStats={state.keyStats} />
        <Footer />
      </motion.div>
    </div>
  )
}

function ResetButton({ onReset }: { onReset: () => void }) {
  const [scope, animate] = useAnimate()
  const rotationRef = React.useRef(0)

  const spin = React.useCallback(() => {
    rotationRef.current -= 360
    animate(
      scope.current,
      { rotate: rotationRef.current },
      { duration: 0.5, type: 'spring', bounce: 0.15 }
    )
  }, [animate, scope])

  const handleClick = () => {
    onReset()
    spin()
  }

  // Listen for Shift+Enter to trigger spin animation
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && e.shiftKey) {
        spin()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [spin])

  return (
    <div className="flex justify-center pt-4">
      <motion.button
        ref={scope}
        type="button"
        onClick={handleClick}
        className="p-2 outline-none rounded-full text-secondary hover:text-secondary hover:bg-tertiary/30 focus-visible:text-primary focus-visible:bg-tertiary/30 transition-colors cursor-pointer"
        aria-label="Reset and shuffle (Shift+Enter)"
        title="Reset and shuffle (Shift+Enter)"
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw className="size-5" />
      </motion.button>
    </div>
  )
}
