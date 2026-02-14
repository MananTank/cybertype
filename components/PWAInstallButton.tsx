import { useEffect, useState } from 'react'
import { BeforeInstallPromptEvent } from '../lib/types'

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt: BeforeInstallPromptEvent | null = null

export function usePWAInstall() {
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      // Prevent the mini-info bar from appearing on mobile
      event.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = event as BeforeInstallPromptEvent
      // Show the install button
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () =>
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null
    setShowInstall(false)
  }

  return { showInstall, handleInstall }
}
