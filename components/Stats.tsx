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
    <div className="stats-container flex justify-center gap-10 absolute w-[300px] top-[30px] left-1/2 -translate-x-1/2 animate-[fade-in_500ms_ease]">
      <Stat unit="wpm" value={wpmSpeed} />
      <Stat unit="%" value={accuracy} />
    </div>
  )
}

type StatProps = {
  unit: string
  value: string | number
  className?: string
}

function Stat(props: StatProps) {
  const { unit, value, className } = props
  return (
    <div className={className}>
      <div className="flex gap-[0.1em] tracking-[1px] items-center text-[40px] xl:text-[30px] text-primary">
        <span> {value} </span>
        <span className="text-[0.5em] opacity-70">{unit}</span>
      </div>
    </div>
  )
}
