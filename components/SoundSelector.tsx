import { SoundPack, soundPacks } from '../lib/sounds'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'

export type Props = {
  handleClose: () => void
  selectedSoundPack: SoundPack
  dispatch: React.Dispatch<Action>
}

export function SoundSelector(props: Props) {
  return (
    <div className="max-w-[350px] w-[calc(100vw-80px)] flex flex-col gap-3 p-3">
      {soundPacks.map(soundPack => {
        const isActive = props.selectedSoundPack === soundPack.id
        return (
          <button
            key={soundPack.id}
            data-active={isActive}
            className={cn(
              'group relative text-left p-4 rounded-xl cursor-pointer',
              'transition-all duration-150 ease-out',
              'outline-none focus-visible:ring-2 focus-visible:ring-island-fg focus-visible:ring-offset-2 focus-visible:ring-offset-island-bg',
              isActive
                ? 'bg-island-fg text-island-bg'
                : 'bg-island-fg/10 text-island-fg hover:bg-island-fg/20'
            )}
            onClick={() => {
              props.dispatch({ type: 'setSoundPack', data: soundPack.id })
              props.handleClose()
            }}
          >
            {isActive && (
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <Check className="w-6 h-6 text-island-bg" />
              </div>
            )}
            <motion.h3 className="text-sm font-medium mb-1.5 tracking-wide">
              {soundPack.name}
            </motion.h3>
            <motion.p className="text-xs opacity-70">{soundPack.type}</motion.p>
          </button>
        )
      })}
    </div>
  )
}
