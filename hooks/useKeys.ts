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
  const soundsRef = useRef<Sounds>()

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
        if (event.key === 'r' || event.key === '-' || event.key === '=') return
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
