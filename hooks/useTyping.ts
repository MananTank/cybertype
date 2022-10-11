import { useEffect } from 'react'

export function useTypingStarted(typingStart: boolean) {
  useEffect(() => {
    if (typingStart) {
      document.body.classList.add('typing')
    } else {
      document.body.classList.remove('typing')
    }
  }, [typingStart])
}
