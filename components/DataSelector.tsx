import { Dispatch, useRef, useEffect } from 'react'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'
import { useArrowNavigation } from '../hooks/useArrowNavigation'

export const dataNames = [
  'Quotes',
  'English 200',
  'English 1K',
  'English 5K',
  'English 10K',
  'Wordle',
  'Commonly Misspelled',
  'JavaScript',
  'Rust',
  'HTML',
  'CSS',
  'C++',
  'SQL',
  'Git',
  'Bash',
  'Python',
  'Java',
  'C#'
]

type Props = {
  dispatch: Dispatch<Action>
  handleClose: () => void
  currentDataName: string
}

export function DataSelector({ dispatch, handleClose, currentDataName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus current item on mount
  useEffect(() => {
    const currentIndex = dataNames.indexOf(currentDataName)
    const buttons = containerRef.current?.querySelectorAll('button')
    if (buttons && buttons[currentIndex]) {
      buttons[currentIndex].focus()
    }
  }, [currentDataName])

  // Arrow key navigation
  useArrowNavigation(containerRef)

  return (
    <div
      ref={containerRef}
      className="max-w-[420px] w-[calc(100vw-80px)] flex flex-wrap gap-x-2 gap-y-2.5 p-4"
    >
      {dataNames.map(value => {
        const isActive = currentDataName === value
        return (
          <button
            key={value}
            data-active={isActive}
            className={cn(
              'group relative text-sm py-2 px-4 rounded-full cursor-pointer select-none',
              'transition-all duration-150 ease-out outline-none',
              isActive
                ? 'bg-bg text-primary'
                : 'bg-secondary/10 text-secondary hover:bg-secondary/30 focus-visible:bg-secondary/30 active:scale-[0.99] hover:text-primary focus-visible:text-primary'
            )}
            onClick={() => {
              if (!isActive) {
                dispatch({ type: 'setDataName', data: value })
              }
              handleClose()
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (!isActive) {
                  dispatch({ type: 'setDataName', data: value })
                }
                handleClose()
              }
            }}
          >
            {value}
          </button>
        )
      })}
    </div>
  )
}
