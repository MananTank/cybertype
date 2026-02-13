import { themes, useThemeIndex } from '../hooks/useThemeIndex'
import { Check } from 'lucide-react'

export function ThemeSwitcher({ handleClose }: { handleClose: () => void }) {
  const [themeIndex, setThemeIndex] = useThemeIndex()

  return (
    <div className="max-h-[calc(100vh-220px)] px-6 pt-6 pb-12 w-[800px] max-w-[calc(100vw-80px)] grid gap-[40px_30px] grid-cols-[1fr_1fr_1fr_1fr] max-[900px]:grid-cols-[1fr_1fr_1fr] max-[600px]:grid-cols-[1fr_1fr] max-[600px]:overflow-y-auto">
      {themes.map((theme, i) => {
        const isSelected = themeIndex === i

        return (
          <div
            key={i}
            onClick={() => {
              handleClose()
              setThemeIndex(i)
            }}
            className="cursor-pointer p-2 -m-2 rounded-lg hover:bg-island-fg/10 transition-colors"
          >
            <div className="text-xs mb-2 tracking-widest flex items-center gap-1.5">
              {theme.name}
              {isSelected && <Check className="size-3" />}
            </div>
            <div
              data-theme={i}
              className="grid grid-cols-[repeat(5,1fr)] rounded-sm h-8"
              style={{
                background: `linear-gradient(to right, var(--bg) 0 20%, var(--tertiary) 0 40%, var(--secondary) 0 60%, var(--primary) 0 80%, var(--error) 0 100%)`
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
