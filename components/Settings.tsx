import { Dispatch, memo, useState } from 'react'
import { Action, State } from '../lib/types'
import { Volume2, VolumeX, ChevronDown, Palette, Music, Download } from 'lucide-react'
import { ClientOnly } from './ClientOnly'
import { motion } from 'motion/react'
import { IslandButton } from './IslandButton'
import { usePWAInstall } from './PWAInstallButton'

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
  const iconClass = 'size-5'
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const { showInstall, handleInstall } = usePWAInstall()

  return (
    <div className="flex items-center gap-0" onMouseLeave={() => setHoveredButton(null)}>
      {/* data selector */}
      <IslandButton
        className="text-sm flex gap-1.5 items-center px-4"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'data' })}
        onMouseEnter={() => setHoveredButton('data')}
        isHovered={hoveredButton === 'data'}
      >
        {dataName}
        <ChevronDown className="size-4" />
      </IslandButton>

      {/* theme switcher */}
      <IslandButton
        aria-label="Change Theme"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'themes' })}
        onMouseEnter={() => setHoveredButton('themes')}
        isHovered={hoveredButton === 'themes'}
      >
        <Palette className={iconClass} />
      </IslandButton>

      {/* sound toggle */}
      <IslandButton
        onClick={() => dispatch({ type: 'setSoundEnabled', data: !soundEnabled })}
        aria-label="toggle sound effects"
        onMouseEnter={() => setHoveredButton('sound-toggle')}
        isHovered={hoveredButton === 'sound-toggle'}
      >
        {soundEnabled ? (
          <Volume2 className={iconClass} />
        ) : (
          <VolumeX className={iconClass} />
        )}
      </IslandButton>

      {/* sound selector */}
      <IslandButton
        onClick={() => dispatch({ type: 'setActivePanel', data: 'sound' })}
        aria-label="select key sound"
        onMouseEnter={() => setHoveredButton('sound-select')}
        isHovered={hoveredButton === 'sound-select'}
      >
        <Music className={iconClass} />
      </IslandButton>

      {/* PWA install button */}
      {showInstall && (
        <IslandButton
          onClick={handleInstall}
          aria-label="Install PWA"
          onMouseEnter={() => setHoveredButton('pwa')}
          isHovered={hoveredButton === 'pwa'}
        >
          <Download className={iconClass} />
        </IslandButton>
      )}
    </div>
  )
})
