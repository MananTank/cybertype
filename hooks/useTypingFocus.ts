import { useRef, useEffect } from 'react'

// This file is not used right now, but it will be used later when adding support for mobile

// bring focus to element when typing starts
export function useTypingFocus() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // ignore enter or tab
      if (event.key === 'Tab' || event.key === 'Enter') return

      if (document.activeElement !== ref.current) {
        if (ref.current)
          ref.current.focus({
            preventScroll: true
          })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return ref
}
