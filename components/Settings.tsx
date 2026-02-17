import { Dispatch, memo, useState, useEffect, useCallback } from 'react'
import { Action } from '../lib/types'
import { Palette, Music, Download, Languages, Maximize, Minimize } from 'lucide-react'
import { motion } from 'motion/react'
import { IslandButton } from './IslandButton'
import { usePWAInstall } from './PWAInstallButton'

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }, [])

  // Check if fullscreen is supported
  const isSupported = typeof document !== 'undefined' && document.fullscreenEnabled

  return { isFullscreen, toggleFullscreen, isSupported }
}

type SettingsProps = {
  dispatch: Dispatch<Action>
}

export const Settings = memo(function Settings({ dispatch }: SettingsProps) {
  const iconClass = 'size-5'
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const { showInstall, handleInstall } = usePWAInstall()
  const {
    isFullscreen,
    toggleFullscreen,
    isSupported: fullscreenSupported
  } = useFullscreen()

  const handleMouseEnter = (id: string) => setActiveButton(id)
  const handleFocus = (id: string) => setActiveButton(id)
  const handleBlur = () => setActiveButton(null)

  return (
    <motion.div
      className="flex items-center gap-0"
      onMouseLeave={() => setActiveButton(null)}
      exit={{
        opacity: 0,
        filter: 'blur(4px)',
        transition: {
          duration: 0.1
        }
      }}
      initial={{
        opacity: 0,
        filter: 'blur(4px)'
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.2,
          delay: 0.1
        }
      }}
    >
      {/* app name */}
      <div className="text-sm tracking-[0.3em] uppercase pl-5 pr-3 font-semibold text-island-fg">
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

      {/* fullscreen toggle */}
      {fullscreenSupported && (
        <IslandButton
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onMouseEnter={() => handleMouseEnter('fullscreen')}
          onFocus={() => handleFocus('fullscreen')}
          onBlur={handleBlur}
          isHovered={activeButton === 'fullscreen'}
          isFocused={activeButton === 'fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className={iconClass} />
          ) : (
            <Maximize className={iconClass} />
          )}
        </IslandButton>
      )}

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
