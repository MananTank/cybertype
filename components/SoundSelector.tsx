import { SoundPack, soundPacks } from '../lib/sounds'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'
import { Check } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useArrowNavigation } from '../hooks/useArrowNavigation'
import { useMotionSquircle } from '../lib/squircle'

export type Props = {
  handleClose: () => void
  selectedSoundPack: SoundPack
  dispatch: React.Dispatch<Action>
}

export function SoundSelector(props: Props) {
  const squircle = useMotionSquircle()

  return (
    <div className="max-w-[350px] w-[calc(100vw-80px)] flex flex-col gap-3 p-3">
      {soundPacks.map(soundPack => {
        const isActive = props.selectedSoundPack === soundPack.id
        return (
          <button
            key={soundPack.id}
            data-active={isActive}
            className={cn(
              'group relative text-left p-4 cursor-pointer',
              'transition-all duration-150 ease-out outline-none',
              isActive
                ? 'bg-bg'
                : 'bg-island-button-bg hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg'
            )}
            style={squircle(12)}
            onClick={() => {
              props.dispatch({ type: 'setSoundPack', data: soundPack.id })
              props.handleClose()
              document.body.focus()
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                props.dispatch({ type: 'setSoundPack', data: soundPack.id })
                props.handleClose()
                document.body.focus()
              }
            }}
          >
            {isActive && (
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <Check className="size-5" />
              </div>
            )}
            <h3 className="text-base font-medium mb-1.5">{soundPack.name}</h3>
            <p className="text-xs font-medium opacity-70 uppercase tracking-wider">
              {soundPack.type}
            </p>
          </button>
        )
      })}
    </div>
  )
}
