import { useEffect } from 'react'
import { BeforeInstallPromptEvent } from '../lib/types'
import styles from '../styles/PWAInstallButton.module.scss'
import { InstallIcon } from './icons'

const showPWAClass = 'show-pwa-install'

export function PWAInstallButton() {
  useEffect(pwaInstallPrompt, [])

  return (
    <button onClick={HideInstallPrompt} className={styles.button}>
      {InstallIcon}
    </button>
  )
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt: BeforeInstallPromptEvent | null

async function HideInstallPrompt() {
  // Hide the app provided install promotion
  document.body.classList.remove(showPWAClass)

  if (!deferredPrompt) return

  // Show the install prompt
  deferredPrompt.prompt()

  // Optionally, send analytics event with outcome of user choice
  // Wait for the user to respond to the prompt
  // const { outcome } = await deferredPrompt.userChoice;

  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null
}

export function pwaInstallPrompt() {
  window.addEventListener('beforeinstallprompt', event => {
    // Prevent the mini-info bar from appearing on mobile
    event.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt = event as BeforeInstallPromptEvent
    // Update UI notify the user they can install the PWA
    document.body.classList.add(showPWAClass)

    // Optionally, send analytics event that PWA install promo was shown.
  })
}
