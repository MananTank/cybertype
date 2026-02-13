import { KeyStatRecord } from '../lib/types'
import { memo, useEffect, useRef } from 'react'
import { cn, getSpeed } from '../lib/utils'

type KeyStatsProps = {
  keyStats: KeyStatRecord
}

const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']']
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`]
const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

export function KeyStats({ keyStats }: KeyStatsProps) {
  const mapper = (keys: string[]) =>
    keys.map(key => {
      return (
        <KeyStat
          key={key}
          keyName={key}
          count={keyStats[key].count}
          totalTime={keyStats[key].totalTime}
        />
      )
    })

  return (
    <div className="flex flex-col items-center py-16 gap-1.5 md:gap-2">
      <div className="flex justify-center gap-1.5 md:gap-2">{mapper(row1)}</div>
      <div className="flex justify-center gap-1.5 md:gap-2">{mapper(row2)}</div>
      <div className="flex justify-center gap-1.5 md:gap-2">{mapper(row3)}</div>
    </div>
  )
}

type KeyStatProps = {
  count: number
  totalTime: number
  keyName: string
}

const KeyStat = memo(function KeyStat({ keyName, count, totalTime }: KeyStatProps) {
  const keySpeed = totalTime === 0 ? 0 : getSpeed(count, totalTime * 5)
  const speedClass = getSpeedClass(keySpeed)
  const elRef = useRef<HTMLDivElement>(null)
  const isNotTyped = keySpeed === 0

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
    <div
      className={cn('group relative', speedClass, hideOnMobile && 'max-[600px]:hidden')}
      ref={elRef}
      data-key={keyName}
    >
      <div
        className={cn(
          'select-none text-xs md:text-sm lowercase font-medium w-[2em] h-[2em] rounded-md relative flex justify-center items-center cursor-pointer transition-[transform,background] duration-200 ease-out',
          'group-hover:scale-110 group-hover:bg-(--color)/25 group-data-pressed:scale-110 group-data-pressed:bg-(--color)/25',
          isNotTyped ? 'bg-tertiary/30' : 'bg-(--color)/15'
        )}
        style={{
          color: 'var(--color, var(--secondary))'
        }}
      >
        {keyName}

        {keySpeed !== 0 && (
          <div className="absolute bg-(--color)/70  w-full h-full left-1/2 top-1/2 rounded-full -z-1 blur-md animate-[glow_var(--anim-duration)_ease_infinite_alternate] " />
        )}
      </div>

      {/* tooltip */}
      <div
        className={cn(
          'absolute backdrop-blur-2xl bg-(--color)/25 z-2 p-6 rounded-lg pointer-events-none invisible opacity-0 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-70 transition-[transform,opacity] duration-100 ease-out group-hover:visible group-hover:opacity-100 group-hover:-translate-y-[150%] group-hover:scale-100 max-[600px]:fixed max-[600px]:top-1/2 max-[600px]:left-1/2'
        )}
        style={{
          color: 'var(--color, var(--secondary))'
        }}
      >
        <div className="text-5xl font-semibold flex items-baseline gap-2.5 whitespace-nowrap">
          {keySpeed || 'N/A'}
          <span className="text-3xl font-medium">wpm</span>
        </div>
      </div>
    </div>
  )
})

export const getSpeedClass = (speed: number) => {
  if (speed === 0) return 'color-unknown'
  if (speed >= 100) return 'color-fast'
  if (speed < 60) return 'color-slow'
  return 'color-normal'
}
