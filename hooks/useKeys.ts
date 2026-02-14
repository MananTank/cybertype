import { useEffect, useRef } from 'react'
import { shouldIgnore } from '../lib/keys'
import { getSounds, SoundPack, Sounds } from '../lib/sounds'
import { Action } from '../lib/types'

export function useKeys(
  targetKey: string,
  dispatch: React.Dispatch<Action>,
  soundEnabled: boolean,
  soundPack: SoundPack,
  ignore: boolean
) {
  const soundsRef = useRef<Sounds | undefined>(undefined)

  if (!soundsRef.current && typeof window !== 'undefined') {
    soundsRef.current = getSounds()
  }

  useEffect(() => {
    if (ignore) return

    function handleKeyDown(event: KeyboardEvent) {
      if (ignore) return
      if (shouldIgnore(event.key)) return

      // ignore these key combos
      const controlOrMeta = event.metaKey || event.ctrlKey
      if (controlOrMeta) {
        // Allow browser shortcuts and app shortcuts (Cmd+K for island focus)
        if (
          event.key === 'r' ||
          event.key === '-' ||
          event.key === '=' ||
          event.key === 'k'
        )
          return
      }

      // Check if focus is on interactive element
      const target = event.target as HTMLElement
      const isInIsland = target.closest('.island-container')

      // Allow navigation keys (Enter, Space, Arrows, Tab) to work on island elements
      if (isInIsland) {
        const navKeys = [
          'Enter',
          ' ',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Tab',
          'Escape'
        ]
        if (navKeys.includes(event.key)) return
      }

      event.preventDefault()

      if (event.key === 'Enter') {
        return dispatch({ type: 'reset' })
      }

      if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
        // in windows: ctrl + backspace to delete entire word
        // in mac: option (alt) + backspace to delete entire word
        return dispatch({ type: 'back', alt: event.altKey || event.ctrlKey })
      }

      dispatch({ type: 'keydown', key: event.key })

      // play error if typed the wrong key
      if (soundEnabled && soundsRef.current) {
        soundsRef.current.packs[soundPack]()
        if (targetKey !== event.key) {
          soundsRef.current.error()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [soundEnabled, dispatch, targetKey, ignore])
}
