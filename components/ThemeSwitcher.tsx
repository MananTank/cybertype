import { themes, useThemeIndex } from '../hooks/useThemeIndex'

export function ThemeSwitcher({ handleClose }: { handleClose: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_themeIndex, setThemeIndex] = useThemeIndex()

  return (
    <div className="max-h-[calc(100vh-220px)] p-6 w-[800px] max-w-[calc(100vw-80px)] grid gap-[40px_30px] grid-cols-[1fr_1fr_1fr_1fr] max-[900px]:grid-cols-[1fr_1fr_1fr] max-[600px]:grid-cols-[1fr_1fr] max-[600px]:overflow-y-auto">
      {themes.map((theme, i) => {
        return (
          <div
            data-theme={i}
            key={i}
            onClick={() => {
              handleClose()
              setThemeIndex(i)
            }}
            className="cursor-pointer"
          >
            <div className="text-xs mb-2 tracking-widest">{theme.name}</div>
            <div
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
