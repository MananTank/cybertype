import { useState } from 'react'

// bar color for each theme
// ideally it should be the same as background color - but some colors are not accepted by the browser
// in that case - pick something different

// if nothing works - set bg anyway

export const themes = [
  { name: 'Espresso', bar: 'hsl(0deg 12% 8%)' }, // 0 - bg works
  { name: 'Campfire', bar: 'hsl(216deg 5% 21%)' }, // 1 - secondary
  { name: 'Classic', bar: 'hsl(57deg 14% 67%)' }, // 2 - secondary
  { name: 'Halloween', bar: 'hsl(311deg 38% 6%)' }, // 3 - none worked - bg
  { name: 'Effervescent', bar: 'hsl(260deg 73% 66%)' }, // 4 - none worked - bg
  { name: 'Blackhole', bar: 'hsl(220deg 20% 3%)' }, // 5 - none worked, bg
  { name: 'Serendipity', bar: 'hsl(0deg 0% 16%)' }, // 6 - none worked, bg
  { name: 'Elixir', bar: 'hsl(243deg 55% 14%)' }, // 7 - none worked, bg
  { name: 'Eudaemonia', bar: 'hsl(53deg 7% 75%)' }, // 8 - none worked, bg
  { name: 'Tranquillity', bar: 'hsl(270deg 3% 85%)' }, // 9 - none worked, bg
  { name: 'Aesthete', bar: 'hsl(0deg 0% 13%)' }, // 10 - none worked, bg
  { name: 'Sunlit', bar: 'hsl(210deg 100% 30%)' }, // 11 - none worked, bg
  { name: 'Witchcraft', bar: 'hsl(205deg 37% 8%)' }, // 12
  { name: 'Mechanical', bar: 'hsl(210deg 11% 15%)' }, // 13
  { name: 'Night Owl', bar: 'hsl(258deg 53% 7%)' }, //  14 - none worked, bg
  { name: 'Forest', bar: 'hsl(198deg 100% 8%)' } // 15
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 0

  const valueFromLocalStorage = localStorage.getItem('theme')
  if (!valueFromLocalStorage) return 0

  const index = Number(valueFromLocalStorage)

  // if something weird is set - fix it
  if (typeof index !== 'number' || isNaN(index) || !index) {
    localStorage.setItem('theme', '0') // fix it if wrong
    return 0
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
