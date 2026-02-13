import { RefObject, useEffect } from 'react'

/**
 * Enables arrow key navigation within a container of buttons.
 * - ArrowRight/ArrowDown: Move to next button
 * - ArrowLeft/ArrowUp: Move to previous button
 * - Wraps around at edges
 */
export function useArrowNavigation(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleKeyDown(e: KeyboardEvent) {
      const buttons = container?.querySelectorAll('button')
      if (!buttons || buttons.length === 0) return

      const currentIndex = Array.from(buttons).findIndex(
        btn => btn === document.activeElement
      )

      if (currentIndex === -1) return

      let nextIndex: number | null = null

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % buttons.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length
      }

      if (nextIndex !== null) {
        buttons[nextIndex].focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}
