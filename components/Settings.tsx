import { Dispatch, memo, useState } from 'react'
import { Action, State } from '../lib/types'
import { Volume2, VolumeX, Palette, Music, Download, Languages } from 'lucide-react'
import { ClientOnly } from './ClientOnly'
import { motion } from 'motion/react'
import { IslandButton } from './IslandButton'
import { usePWAInstall } from './PWAInstallButton'

type SettingsProps = {
  dispatch: Dispatch<Action>
  soundEnabled: boolean
}

export const Settings = memo(function Settings({
  dispatch,
  soundEnabled
}: SettingsProps) {
  const iconClass = 'size-5'
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const { showInstall, handleInstall } = usePWAInstall()

  return (
    <div className="flex items-center gap-0" onMouseLeave={() => setHoveredButton(null)}>
      {/* app name */}
      <motion.div
        layout
        transition={{
          duration: 0.6,
          type: 'spring',
          bounce: 0.15
        }}
        exit={{
          opacity: 0,
          filter: 'blur(12px)'
        }}
        initial={{
          opacity: 0,
          filter: 'blur(12px)'
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)'
        }}
        className="text-sm tracking-[0.2em] uppercase pl-5 pr-3 font-semibold"
      >
        <span>cybertype</span>
      </motion.div>

      {/* data selector */}
      <IslandButton
        aria-label="Select language/data"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'data' })}
        onMouseEnter={() => setHoveredButton('data')}
        isHovered={hoveredButton === 'data'}
      >
        <Languages className={iconClass} />
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
