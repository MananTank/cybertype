import { Settings } from './Settings'
import { Stats } from './Stats'
import { State, Action } from '../lib/types'
import { ThemeSwitcher } from './ThemeSwitcher'
import React, { useEffect, useRef } from 'react'
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

// Map panel names to button aria-labels for refocusing
const panelToButtonLabel: Record<string, string> = {
  data: 'Select language/data',
  themes: 'Change Theme',
  sound: 'Select key sound'
}

export function DynamicIsland({ state, dispatch }: Props) {
  const closePanel = () => dispatch({ type: 'setActivePanel', data: null })
  const islandRef = useRef<HTMLDivElement>(null)
  const previousPanelRef = useRef<string | null>(null)

  const isModalOpen = state.activePanel !== null

  // Track previous panel for refocusing
  useEffect(() => {
    if (state.activePanel) {
      previousPanelRef.current = state.activePanel
    }
  }, [state.activePanel])

  // Refocus button when panel closes
  useEffect(() => {
    if (!isModalOpen && previousPanelRef.current) {
      const label = panelToButtonLabel[previousPanelRef.current]
      if (label) {
        // Small delay to let the pill render
        setTimeout(() => {
          const button = document.querySelector(
            `.island-container button[aria-label="${label}"]`
          ) as HTMLElement
          if (button) {
            button.focus()
          }
        }, 100)
      }
    }
  }, [isModalOpen])

  // Determine which expander content to show
  const expanderContent =
    state.activePanel === 'themes' ? (
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

  // Cmd+K to focus island, Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Cmd+K or Ctrl+K to focus island buttons
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isModalOpen) {
          closePanel()
        } else {
          // Focus first button in the island
          const firstButton = document.querySelector(
            '.island-container button'
          ) as HTMLElement
          if (firstButton) {
            firstButton.focus()
          }
        }
        return
      }

      // Escape to close
      if (e.key === 'Escape' && isModalOpen) {
        closePanel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  // Close on outside click
  useEffect(() => {
    if (!isModalOpen) return

    function handleClick(e: MouseEvent) {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        closePanel()
      }
    }

    document.body.addEventListener('click', handleClick)
    return () => document.body.removeEventListener('click', handleClick)
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
            className="fixed inset-0 z-40 backdrop-blur-md bg-bg/60 pointer-events-none"
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
                className="bg-secondary/20 text-secondary flex justify-center items-center p-1 pr-5 will-change-transform "
                transition={islandSpringClose}
                style={{ borderRadius: 24 }}
              >
                <Settings dispatch={dispatch} soundEnabled={state.soundEnabled} />
              </motion.div>
            ) : (
              // Expanded state
              <motion.div
                ref={islandRef}
                key="expander"
                layoutId="dynamic-island"
                className="bg-secondary/20  text-secondary relative max-w-[calc(100vw-40px)] will-change-transform overflow-hidden "
                transition={islandSpringOpen}
                style={{ borderRadius: 24 }}
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
