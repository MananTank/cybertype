import { Dispatch, memo, useState, useRef } from 'react'
import { Action } from '../lib/types'
import { Volume2, VolumeX, Palette, Music, Download, Languages } from 'lucide-react'
import { motion } from 'motion/react'
import { IslandButton } from './IslandButton'
import { usePWAInstall } from './PWAInstallButton'
import { useArrowNavigation } from '../hooks/useArrowNavigation'

type SettingsProps = {
  dispatch: Dispatch<Action>
  soundEnabled: boolean
}

export const Settings = memo(function Settings({
  dispatch,
  soundEnabled
}: SettingsProps) {
  const iconClass = 'size-5'
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const { showInstall, handleInstall } = usePWAInstall()

  const handleMouseEnter = (id: string) => setActiveButton(id)
  const handleFocus = (id: string) => setActiveButton(id)
  const handleBlur = () => setActiveButton(null)

  return (
    <motion.div
      className="flex items-center gap-0"
      onMouseLeave={() => setActiveButton(null)}
      exit={{
        opacity: 0,
        filter: 'blur(8px)',
        transition: {
          duration: 0.3
        }
      }}
      initial={{
        opacity: 0,
        filter: 'blur(8px)'
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          // delay: 0.1,
          duration: 0.3
        }
        // filter: 'blur(0px)'
      }}
    >
      {/* app name */}
      <div
        // layout
        // transition={{
        //   bounce: 0
        // }}

        className="text-sm tracking-[0.3em] uppercase pl-5 pr-3 font-semibold text-island-fg"
      >
        cybertype
      </div>

      {/* data selector */}
      <IslandButton
        aria-label="Select language/data (⌘K)"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'data' })}
        onMouseEnter={() => handleMouseEnter('data')}
        onFocus={() => handleFocus('data')}
        onBlur={handleBlur}
        isHovered={activeButton === 'data'}
        isFocused={activeButton === 'data'}
      >
        <Languages className={iconClass} />
      </IslandButton>

      {/* theme switcher */}
      <IslandButton
        aria-label="Change Theme"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'themes' })}
        onMouseEnter={() => handleMouseEnter('themes')}
        onFocus={() => handleFocus('themes')}
        onBlur={handleBlur}
        isHovered={activeButton === 'themes'}
        isFocused={activeButton === 'themes'}
      >
        <Palette className={iconClass} />
      </IslandButton>

      {/* sound toggle */}
      <IslandButton
        onClick={() => dispatch({ type: 'setSoundEnabled', data: !soundEnabled })}
        aria-label="Toggle sound effects"
        onMouseEnter={() => handleMouseEnter('sound-toggle')}
        onFocus={() => handleFocus('sound-toggle')}
        onBlur={handleBlur}
        isHovered={activeButton === 'sound-toggle'}
        isFocused={activeButton === 'sound-toggle'}
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
        aria-label="Select key sound"
        onMouseEnter={() => handleMouseEnter('sound-select')}
        onFocus={() => handleFocus('sound-select')}
        onBlur={handleBlur}
        isHovered={activeButton === 'sound-select'}
        isFocused={activeButton === 'sound-select'}
      >
        <Music className={iconClass} />
      </IslandButton>

      {/* PWA install button */}
      {showInstall && (
        <IslandButton
          onClick={handleInstall}
          aria-label="Install PWA"
          onMouseEnter={() => handleMouseEnter('pwa')}
          onFocus={() => handleFocus('pwa')}
          onBlur={handleBlur}
          isHovered={activeButton === 'pwa'}
          isFocused={activeButton === 'pwa'}
        >
          <Download className={iconClass} />
        </IslandButton>
      )}
    </motion.div>
  )
})
