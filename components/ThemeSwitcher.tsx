import { themes, useThemeIndex } from '../hooks/useThemeIndex'
import { Action } from '../lib/types'
import styles from '../styles/ThemeSwitcher.module.scss'
import { schemes } from '../lib/schemes'

export type Props = {
  handleClose: () => void
  selectedKeyboardScheme: string
  dispatch: React.Dispatch<Action>
}

export function ThemeSwitcher(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_themeIndex, setThemeIndex] = useThemeIndex()

  return (
    <div>
      <h3 className={styles.title}>Colors</h3>
      <div className={styles.themeSwitcher}>
        {themes.map((theme, i) => {
          return (
            <div
              data-theme={i}
              key={i}
              onClick={() => {
                props.handleClose()
                setThemeIndex(i)
              }}
              className={styles.theme}
            >
              <h3> {theme.name}</h3>
              <div className={styles.palette}></div>
            </div>
          )
        })}
      </div>
      <h3 className={styles.title}>Keyboard</h3>
      <div className={styles.options}>
        {schemes.map(scheme => {
          return (
            <div
              key={scheme.id}
              className={styles.option}
              data-active={props.selectedKeyboardScheme === scheme.id}
              onClick={() => {
                props.dispatch({ type: 'setKeyboardScheme', data: scheme.id })
                props.handleClose()
              }}
            >
              <div className={styles.name}>{scheme.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
