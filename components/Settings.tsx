import { Dispatch, memo } from 'react'
import { Action, State } from '../lib/types'
import {
  SoundDisabled,
  SoundEnabledIcon,
  ChevronIcon,
  ThemeIcon,
  SoundIcon
} from './icons'
import styles from '../styles/Settings.module.scss'
import { ClientOnly } from './ClientOnly'
import { PWAInstallButton } from './PWAInstallButton'

type SettingsProps = {
  dispatch: Dispatch<Action>
  soundEnabled: boolean
  dataName: State['dataName']
}

export const Settings = memo(function Settings({
  dispatch,
  soundEnabled,
  dataName
}: SettingsProps) {
  return (
    <div className={styles.settings}>
      {/* data selector - client only because it is personalized  */}
      <ClientOnly>
        <div
          className={styles.dataSelector}
          onClick={() => {
            dispatch({ type: 'setShowDataSelector', data: true })
          }}
        >
          {dataName}
          {ChevronIcon}
        </div>
      </ClientOnly>

      <div className={styles.icons}>
        {/* theme switcher */}
        <button
          aria-label="Change Theme"
          onClick={() => dispatch({ type: 'setShowThemes', data: true })}
        >
          {ThemeIcon}
        </button>

        {/* sound */}
        <button
          className={styles.sound}
          onClick={() => {
            dispatch({ type: 'setSoundEnabled', data: !soundEnabled })
          }}
          aria-label="toggle sound effects"
        >
          <ClientOnly ssr={SoundEnabledIcon}>
            {soundEnabled ? SoundEnabledIcon : SoundDisabled}
          </ClientOnly>
        </button>

        <button
          onClick={() => dispatch({ type: 'setShowSoundSelector', data: true })}
          aria-label="select key sound"
        >
          {SoundIcon}
        </button>

        <PWAInstallButton />
      </div>
    </div>
  )
})
