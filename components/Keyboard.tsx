import { KeyStatRecord } from '../lib/types'
import { memo, useEffect, useRef, useState } from 'react'
import { cn, getSpeed } from '../lib/utils'
import { motion, LayoutGroup } from 'motion/react'

type KeyStatsProps = {
  keyStats: KeyStatRecord
}

const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']']
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`]
const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

export function KeyStats({ keyStats }: KeyStatsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const mapper = (keys: string[], rowIndex: number) =>
    keys.map((key, keyIndex) => {
      return (
        <KeyStat
          key={key}
          keyName={key}
          count={keyStats[key].count}
          totalTime={keyStats[key].totalTime}
          animationDelay={1.5 + rowIndex * 0.08 + keyIndex * 0.025}
          isHovered={hoveredKey === key}
          onHover={() => setHoveredKey(key)}
          onLeave={() => setHoveredKey(null)}
        />
      )
    })

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center py-12 relative z-10">
        <div className="flex justify-center">{mapper(row1, 0)}</div>
        <div className="flex justify-center">{mapper(row2, 1)}</div>
        <div className="flex justify-center">{mapper(row3, 2)}</div>
      </div>
    </LayoutGroup>
  )
}

type KeyStatProps = {
  count: number
  totalTime: number
  keyName: string
  animationDelay: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const KeyStat = memo(function KeyStat({
  keyName,
  count,
  totalTime,
  animationDelay,
  isHovered,
  onHover,
  onLeave
}: KeyStatProps) {
  const keySpeed = totalTime === 0 ? 0 : getSpeed(count, totalTime * 5)
  const speedClass = getSpeedClass(keySpeed)
  const elRef = useRef<HTMLDivElement>(null)
  const isTyped = keySpeed !== 0

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!elRef.current) return
      if (event.key === keyName) {
        elRef.current.setAttribute('data-pressed', '')
        setTimeout(() => {
          if (!elRef.current) return
          elRef.current.removeAttribute('data-pressed')
        }, 100)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyName])

  // Hide certain keys on mobile
  const hideOnMobile = ['[', ']', "'"].includes(keyName)

  return (
    <motion.div
      className={cn(
        'group relative text-(--color) p-[3px] md:p-1',
        speedClass,
        hideOnMobile && 'max-[600px]:hidden'
      )}
      ref={elRef}
      data-key={keyName}
      initial={{ opacity: 0, y: 24, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        type: 'spring',
        bounce: 0.1,
        delay: animationDelay
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          'select-none text-xs md:text-sm lowercase font-medium w-[2em] h-[2em] rounded-md relative flex justify-center items-center cursor-pointer transition-all duration-200 ease-out',
          isHovered && 'scale-110',
          'group-data-pressed:scale-120',
          isTyped
            ? cn(
                'bg-(--color)/10 group-data-pressed:bg-(--color)/30',
                isHovered && 'bg-(--color)/25'
              )
            : cn(
                'bg-muted-button-bg text-secondary',
                isHovered && 'bg-muted-button-bg-hover'
              )
        )}
      >
        {keyName}
      </div>

      {/* glow */}
      {isTyped && (
        <div
          className={cn(
            'absolute bg-(--color)/40 inset-0 rounded-full blur-md -z-1 outline animate-[glow_var(--anim-duration)_ease_infinite_alternate]'
          )}
        />
      )}

      {/* tooltip */}
      {isHovered && (
        <motion.div
          layoutId="keyboard-tooltip"
          className={cn(
            'absolute z-50 p-4 rounded-lg pointer-events-none top-0 left-1/2 -translate-x-1/2 -translate-y-[150%]',
            isTyped
              ? 'bg-(--color)/25 backdrop-blur-xl'
              : 'bg-muted-button-bg/25 backdrop-blur-xl'
          )}
          transition={{
            layout: { type: 'spring', stiffness: 500, damping: 30 }
          }}
        >
          <div className="flex items-baseline gap-4 whitespace-nowrap">
            <span className="text-5xl font-medium lowercase">{keyName}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-medium">{keySpeed || 'N/A'}</span>
              <span className="text-xl font-medium opacity-70">wpm</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
})

export const getSpeedClass = (speed: number) => {
  if (speed === 0) return 'color-unknown'
  if (speed >= 100) return 'color-fast'
  if (speed < 60) return 'color-slow'
  return 'color-normal'
}
