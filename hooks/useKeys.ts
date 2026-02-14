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

      // Shift+Enter to reset and shuffle (check before shouldIgnore since Enter is ignored)
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault()
        return dispatch({ type: 'reset' })
      }

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

      // Allow certain navigation keys to work on island elements, but NOT space
      // (space is used for typing and should always be captured)
      if (isInIsland) {
        const navKeys = [
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

      // Blur island buttons when typing starts so they don't interfere
      if (isInIsland && target.tagName === 'BUTTON') {
        target.blur()
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
