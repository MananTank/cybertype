import { useState } from 'react'

// bar color for each theme
// ideally it should be the same as background color - but some colors are not accepted by the browser
// in that case - pick something different

// if nothing works - set bg anyway

export const themes = [
  { name: 'Espresso', bar: 'oklch(15% 0.02 30)' },
  { name: 'Campfire', bar: 'oklch(28% 0.02 250)' },
  { name: 'Classic', bar: 'oklch(75% 0.04 95)' },
  { name: 'Halloween', bar: 'oklch(12% 0.08 320)' },
  { name: 'Effervescent', bar: 'oklch(60% 0.2 290)' },
  { name: 'Blackhole', bar: 'oklch(8% 0.02 250)' },
  { name: 'Serendipity', bar: 'oklch(25% 0 0)' },
  { name: 'Elixir', bar: 'oklch(18% 0.12 280)' },
  { name: 'Eudaemonia', bar: 'oklch(80% 0.03 95)' },
  { name: 'Tranquillity', bar: 'oklch(88% 0.01 290)' },
  { name: 'Aesthete', bar: 'oklch(18% 0 0)' },
  { name: 'Sunlit', bar: 'oklch(42% 0.15 250)' },
  { name: 'Witchcraft', bar: 'oklch(15% 0.06 210)' },
  { name: 'Mechanical', bar: 'oklch(22% 0.02 240)' },
  { name: 'Night Owl', bar: 'oklch(12% 0.1 280)' },
  { name: 'Forest', bar: 'oklch(15% 0.08 220)' }
]

const DEFAULT_THEME = 6 // Serendipity

function getInitialTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME

  const valueFromLocalStorage = localStorage.getItem('theme')
  if (!valueFromLocalStorage) return DEFAULT_THEME

  const index = Number(valueFromLocalStorage)

  // if something weird is set - fix it
  if (typeof index !== 'number' || isNaN(index)) {
    localStorage.setItem('theme', String(DEFAULT_THEME))
    return DEFAULT_THEME
  }

  return index
}

function applyTheme(themeIndex: number) {
  // update the theme for the page
  document.body.setAttribute('data-theme', themeIndex + '')

  // update meta theme color for address bar
  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
  meta.setAttribute('content', themes[themeIndex].bar)

  // save theme in local storage and state
  localStorage.setItem('theme', themeIndex + '')
}

export function useThemeIndex() {
  const [themeIndex, setThemeIndex] = useState(getInitialTheme)

  function _setThemeIndex(i: number) {
    setThemeIndex(i)
    applyTheme(i)
  }

  return [themeIndex, _setThemeIndex] as const
}

if (typeof window !== 'undefined') {
  const i = getInitialTheme()
  applyTheme(i)
}
