import { useState } from 'react'
import { themes, DEFAULT_THEME_INDEX, applyThemeToElement } from '../lib/themes'

// Re-export themes for backward compatibility
export { themes, DEFAULT_THEME_INDEX }

function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME_INDEX

  const valueFromLocalStorage = localStorage.getItem('theme')
  if (!valueFromLocalStorage) return DEFAULT_THEME_INDEX

  const index = Number(valueFromLocalStorage)

  // if something weird is set - fix it
  if (typeof index !== 'number' || isNaN(index) || index < 0 || index >= themes.length) {
    localStorage.setItem('theme', String(DEFAULT_THEME_INDEX))
    return DEFAULT_THEME_INDEX
  }

  return index
}

function applyTheme(themeIndex: number) {
  const theme = themes[themeIndex]
  if (!theme) return

  // Apply CSS variables to html element
  applyThemeToElement(document.documentElement, theme.colors)

  // Update meta theme color for address bar
  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
  if (meta) {
    meta.setAttribute('content', theme.colors.bg)
  }

  // Save theme in local storage
  localStorage.setItem('theme', String(themeIndex))
}

export function useThemeIndex() {
  const [themeIndex, setThemeIndex] = useState(getInitialTheme)

  function _setThemeIndex(i: number) {
    setThemeIndex(i)
    applyTheme(i)
  }

  return [themeIndex, _setThemeIndex] as const
}

// Apply theme on initial load (client-side only)
if (typeof window !== 'undefined') {
  const i = getInitialTheme()
  applyTheme(i)
}
