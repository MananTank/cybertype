import { SoundPack, soundPacks } from '../lib/sounds'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'
import { Check } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useArrowNavigation } from '../hooks/useArrowNavigation'

export type Props = {
  handleClose: () => void
  selectedSoundPack: SoundPack
  dispatch: React.Dispatch<Action>
}

export function SoundSelector(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus current sound pack button on mount
  useEffect(() => {
    const currentIndex = soundPacks.findIndex(sp => sp.id === props.selectedSoundPack)
    const buttons = containerRef.current?.querySelectorAll('button')
    if (buttons && buttons[currentIndex]) {
      buttons[currentIndex].focus()
    }
  }, [props.selectedSoundPack])

  // Arrow key navigation
  useArrowNavigation(containerRef)

  return (
    <div
      ref={containerRef}
      className="max-w-[350px] w-[calc(100vw-80px)] flex flex-col gap-3 p-3"
    >
      {soundPacks.map(soundPack => {
        const isActive = props.selectedSoundPack === soundPack.id
        return (
          <button
            key={soundPack.id}
            data-active={isActive}
            className={cn(
              'group relative text-left p-4 rounded-xl cursor-pointer',
              'transition-all duration-150 ease-out outline-none',
              isActive
                ? 'bg-bg text-primary'
                : 'bg-secondary/10 text-secondary hover:bg-secondary/30 focus-visible:bg-secondary/30 hover:text-primary focus-visible:text-primary'
            )}
            onClick={() => {
              props.dispatch({ type: 'setSoundPack', data: soundPack.id })
              props.handleClose()
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                props.dispatch({ type: 'setSoundPack', data: soundPack.id })
                props.handleClose()
              }
            }}
          >
            {isActive && (
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <Check className="w-6 h-6 text-island-bg" />
              </div>
            )}
            <h3 className="text-lg font-semibold mb-1.5 ">{soundPack.name}</h3>
            <p className="text-xs font-medium opacity-70 uppercase tracking-widest">
              {soundPack.type}
            </p>
          </button>
        )
      })}
    </div>
  )
}
