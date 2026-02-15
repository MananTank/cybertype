import { themes, useThemeIndex } from '../hooks/useThemeIndex'
import { Check } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useArrowNavigation } from '../hooks/useArrowNavigation'
import { useMotionSquircle } from '../lib/squircle'

export function ThemeSwitcher({ handleClose }: { handleClose: () => void }) {
  const [themeIndex, setThemeIndex] = useThemeIndex()
  const containerRef = useRef<HTMLDivElement>(null)
  const squircle = useMotionSquircle()

  // Focus current theme button on mount
  useEffect(() => {
    const buttons = containerRef.current?.querySelectorAll('button')
    if (buttons && buttons[themeIndex]) {
      buttons[themeIndex].focus()
    }
  }, [themeIndex])

  // Arrow key navigation
  useArrowNavigation(containerRef)

  return (
    <div
      ref={containerRef}
      className="max-h-[calc(100vh-200px)] px-6 pt-8 pb-12 w-[800px] max-w-[calc(100vw-40px)] grid gap-6 md:gap-10 md:grid-cols-4 grid-cols-2 overflow-y-auto"
    >
      {themes.map((theme, i) => {
        const isSelected = themeIndex === i
        const colors = theme.colors

        return (
          <button
            key={i}
            onClick={() => {
              setThemeIndex(i)
              handleClose()
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setThemeIndex(i)
                handleClose()
              }
            }}
            style={squircle(12)}
            className="cursor-pointer p-2 -m-2 hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg transition-colors text-left outline-none"
          >
            <div className="text-xs mb-2 tracking-widest flex items-center gap-1.5 text-island-fg">
              {theme.name}
              {isSelected && <Check className="size-3" />}
            </div>
            <div
              className="grid grid-cols-[repeat(5,1fr)] h-8"
              style={{
                ...squircle(12),
                background: `linear-gradient(to right, ${colors.bg} 0 25%, ${colors.tertiary} 0 50%, ${colors.secondary} 0 75%, ${colors.primary} 0 100%)`
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
