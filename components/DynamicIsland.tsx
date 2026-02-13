import { Settings } from './Settings'
import { Stats } from './Stats'
import { State, Action } from '../lib/types'
import { ThemeSwitcher } from './ThemeSwitcher'
import React, { useEffect } from 'react'
import { DataSelector } from './DataSelector'
import { SoundSelector } from './SoundSelector'
import { motion, AnimatePresence, LayoutGroup, type Transition } from 'motion/react'

export type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

const islandSpringOpen: Transition = {
  type: 'spring',
  duration: 0.6,
  bounce: 0.3
}

const islandSpringClose: Transition = {
  type: 'spring',
  duration: 0.5,
  bounce: 0.25
}

// Content transition - quick fade with ease-out
const contentTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const // ease-out-quad - gentle deceleration
}

export function DynamicIsland({ state, dispatch }: Props) {
  const closePanel = () => dispatch({ type: 'setActivePanel', data: null })

  const isModalOpen = state.activePanel !== null

  // Determine which expander content to show
  const expanderContent = state.activePanel === 'themes' ? (
    <ThemeSwitcher handleClose={closePanel} />
  ) : state.activePanel === 'data' ? (
    <DataSelector
      dispatch={dispatch}
      handleClose={closePanel}
      currentDataName={state.dataName}
    />
  ) : state.activePanel === 'sound' ? (
    <SoundSelector
      handleClose={closePanel}
      dispatch={dispatch}
      selectedSoundPack={state.soundPack}
    />
  ) : null

  // Close on Escape key
  useEffect(() => {
    if (!isModalOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closePanel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  return (
    <>
      {/* Blur overlay when modal is open */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* Positioning container - centered at top of page */}
      <div className="island-container fixed top-[30px] left-0 right-0 z-50 flex justify-center">
        <LayoutGroup>
          <AnimatePresence mode="popLayout" initial={false}>
            {!isModalOpen ? (
              // Collapsed pill state
              <motion.div
                key="pill"
                layoutId="dynamic-island"
                className="bg-island-bg text-island-fg flex justify-center items-center px-1 md:px-6 py-1 will-change-transform"
                transition={islandSpringClose}
                style={{ borderRadius: 24 }}
              >
                <Settings
                  dispatch={dispatch}
                  soundEnabled={state.soundEnabled}
                  dataName={state.dataName}
                />
              </motion.div>
            ) : (
              // Expanded state
              <motion.div
                key="expander"
                layoutId="dynamic-island"
                className="bg-island-bg text-island-fg relative max-w-[calc(100vw-40px)] will-change-transform overflow-hidden"
                transition={islandSpringOpen}
                style={{ borderRadius: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Content fade - quick and subtle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={contentTransition}
                >
                  {expanderContent}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {/* Stats - shown when typing (separate from island) */}
      <Stats
        charsTyped={state.totalCharsTyped}
        timeTaken={state.totalTimeTaken}
        errors={state.totalErrors}
      />
    </>
  )
}
