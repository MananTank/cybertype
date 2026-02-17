import NumberFlow from '@number-flow/react'
import { getSpeed } from '../lib/utils'

type StatsProps = {
  timeTaken: number
  errors: number
  charsTyped: number
}

export function Stats(props: StatsProps) {
  const { timeTaken, errors, charsTyped } = props
  const wpmSpeed = getSpeed(charsTyped, timeTaken * 5)
  const errorRate = charsTyped === 0 ? 0 : (errors * 100) / charsTyped
  const accuracy = charsTyped === 0 ? 0 : Math.max(Math.round(100 - errorRate), 0)

  return (
    <div className="stats-container flex justify-center gap-10 absolute z-50 w-[300px] top-[30px] left-1/2 -translate-x-1/2 animate-[fade-in_500ms_ease]">
      <Stat unit="wpm" value={Number(wpmSpeed)} />
      <Stat unit="%" value={accuracy} />
    </div>
  )
}

type StatProps = {
  unit: string
  value: number
  className?: string
}

function Stat(props: StatProps) {
  const { unit, value, className } = props
  return (
    <div className={className}>
      <div className="flex gap-[0.1em] items-center text-4xl text-primary font-medium">
        <NumberFlow value={value} />
        <span className="text-[0.8em] opacity-50">{unit}</span>
      </div>
    </div>
  )
}
