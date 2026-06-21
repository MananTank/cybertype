import { motion, useSpring } from 'motion/react'
import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TextMorph } from 'torph/react'
import type { KeyStatRecord } from '../lib/types'
import { cn, getSpeed } from '../lib/utils'

type KeyStatsProps = {
  keyStats: KeyStatRecord
}

const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']']
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`]
const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

const tooltipSpring = { stiffness: 500, damping: 30 }

export function KeyStats({ keyStats }: KeyStatsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const keyRefs = useRef<Record<string, HTMLElement | null>>({})
  const tooltipX = useSpring(0, tooltipSpring)
  const tooltipY = useSpring(0, tooltipSpring)

  const registerKeyRef = useCallback((key: string, el: HTMLElement | null) => {
    keyRefs.current[key] = el
  }, [])

  const updateTooltipPosition = useCallback(
    (key: string) => {
      const anchor = keyRefs.current[key]
      const container = containerRef.current
      if (!anchor || !container) return

      const containerRect = container.getBoundingClientRect()
      const anchorRect = anchor.getBoundingClientRect()

      tooltipX.set(anchorRect.left + anchorRect.width / 2 - containerRect.left)
      tooltipY.set(anchorRect.top - containerRect.top)
    },
    [tooltipX, tooltipY]
  )

  const handleHover = useCallback(
    (key: string) => {
      setHoveredKey(key)
      updateTooltipPosition(key)
    },
    [updateTooltipPosition]
  )

  const handleLeave = useCallback(() => {
    setHoveredKey(null)
  }, [])

  useLayoutEffect(() => {
    if (!hoveredKey) return
    updateTooltipPosition(hoveredKey)
  }, [hoveredKey, updateTooltipPosition])

  useEffect(() => {
    if (!hoveredKey) return

    const key = hoveredKey

    function handleResize() {
      updateTooltipPosition(key)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [hoveredKey, updateTooltipPosition])

  const hoveredStats = hoveredKey ? keyStats[hoveredKey] : null
  const keySpeed =
    hoveredStats && hoveredStats.totalTime !== 0
      ? getSpeed(hoveredStats.count, hoveredStats.totalTime * 5)
      : 0
  const isTyped = keySpeed !== 0
  const speedClass = getSpeedClass(keySpeed)

  const mapper = (keys: string[]) =>
    keys.map(key => (
      <KeyStat
        key={key}
        keyName={key}
        count={keyStats[key].count}
        totalTime={keyStats[key].totalTime}
        isHovered={hoveredKey === key}
        registerRef={registerKeyRef}
        onHover={() => handleHover(key)}
        onLeave={handleLeave}
      />
    ))

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center py-12 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 1.2 }}
    >
      <div className="flex justify-center">{mapper(row1)}</div>
      <div className="flex justify-center">{mapper(row2)}</div>
      <div className="flex justify-center">{mapper(row3)}</div>

      {hoveredKey && (
        <motion.div
          className={cn(
            'absolute z-50 p-4 backdrop-blur-xl min-w-[180px] rounded-lg pointer-events-none -translate-x-1/2 -translate-y-[150%] text-(--color)',
            speedClass,
            isTyped ? 'bg-(--color)/25' : 'bg-muted-button-bg'
          )}
          style={{ left: tooltipX, top: tooltipY }}
        >
          <div className="flex items-baseline gap-4 whitespace-nowrap">
            <span className="text-5xl font-medium lowercase">{hoveredKey}</span>
            <div className="flex items-baseline gap-1.5">
              <TextMorph className="text-2xl font-medium">{keySpeed || 'N/A'}</TextMorph>
              <span className="text-xl font-medium opacity-70">wpm</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

type KeyStatProps = {
  count: number
  totalTime: number
  keyName: string
  isHovered: boolean
  registerRef: (key: string, el: HTMLElement | null) => void
  onHover: () => void
  onLeave: () => void
}

const KeyStat = memo(function KeyStat({
  keyName,
  count,
  totalTime,
  isHovered,
  registerRef,
  onHover,
  onLeave
}: KeyStatProps) {
  const keySpeed = totalTime === 0 ? 0 : getSpeed(count, totalTime * 5)
  const speedClass = getSpeedClass(keySpeed)
  const elRef = useRef<HTMLButtonElement>(null)
  const isTyped = keySpeed !== 0

  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      elRef.current = el
      registerRef(keyName, el)
    },
    [keyName, registerRef]
  )

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

  const hideOnMobile = ['[', ']', "'"].includes(keyName)

  return (
    <button
      type="button"
      aria-label={`${keyName} key speed`}
      className={cn(
        'group relative text-(--color) p-[3px] md:p-1 border-0 bg-transparent cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md',
        speedClass,
        hideOnMobile && 'max-[600px]:hidden'
      )}
      ref={setRef}
      data-key={keyName}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          'select-none text-xs md:text-sm lowercase font-medium w-[2em] h-[2em] rounded-md relative flex justify-center items-center transition-all duration-200 ease-out',
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

      {isTyped && (
        <div
          className={cn(
            'absolute bg-(--color)/40 inset-0 rounded-full blur-md -z-1 outline animate-[glow_var(--anim-duration)_ease_infinite_alternate]'
          )}
        />
      )}
    </button>
  )
})

export const getSpeedClass = (speed: number) => {
  if (speed === 0) return 'color-unknown'
  if (speed >= 100) return 'color-fast'
  if (speed < 60) return 'color-slow'
  return 'color-normal'
}
