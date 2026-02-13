import { Dispatch, memo } from 'react'
import { Action, State } from '../lib/types'
import { Volume2, VolumeX, ChevronDown, Palette, Music } from 'lucide-react'
import { ClientOnly } from './ClientOnly'
import { PWAInstallButton } from './PWAInstallButton'
import { motion } from 'motion/react'
import { IslandButton } from './IslandButton'

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
  const iconClass = 'size-5 text-island-fg'

  return (
    <div className="flex items-center gap-3">
      {/* data selector */}
      <IslandButton
        className="text-sm flex gap-1.5 items-center px-3"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'data' })}
      >
        {dataName}
        <ChevronDown className="text-island-fg size-4" />
      </IslandButton>

      <div className="flex items-center gap-0">
        {/* theme switcher */}
        <IslandButton
          aria-label="Change Theme"
          onClick={() => dispatch({ type: 'setActivePanel', data: 'themes' })}
        >
          <Palette className={iconClass} />
        </IslandButton>

        {/* sound toggle */}
        <IslandButton
          onClick={() => dispatch({ type: 'setSoundEnabled', data: !soundEnabled })}
          aria-label="toggle sound effects"
        >
          <ClientOnly ssr={<Volume2 className={iconClass} />}>
            {soundEnabled ? (
              <Volume2 className={iconClass} />
            ) : (
              <VolumeX className={iconClass} />
            )}
          </ClientOnly>
        </IslandButton>

        {/* sound selector */}
        <IslandButton
          onClick={() => dispatch({ type: 'setActivePanel', data: 'sound' })}
          aria-label="select key sound"
        >
          <Music className={iconClass} />
        </IslandButton>

        <PWAInstallButton />
      </div>
    </div>
  )
})
