import { Dispatch } from 'react'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'

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
  return (
    <div className="max-w-[420px] w-[calc(100vw-80px)] flex flex-wrap gap-x-2 gap-y-2.5 p-4">
      {dataNames.map(value => {
        const isActive = currentDataName === value
        return (
          <button
            key={value}
            data-active={isActive}
            className={cn(
              'group relative text-sm py-2 px-4 rounded-full cursor-pointer',
              'transition-all duration-150 ease-out',
              'outline-none focus-visible:ring-2 focus-visible:ring-island-fg focus-visible:ring-offset-2 focus-visible:ring-offset-island-bg',
              isActive
                ? 'bg-island-fg text-island-bg shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                : 'bg-island-fg/10 text-island-fg hover:bg-island-fg/15 active:scale-[0.99]'
            )}
            onClick={() => {
              if (!isActive) {
                dispatch({ type: 'setDataName', data: value })
              }
              handleClose()
            }}
          >
            {value}
          </button>
        )
      })}
    </div>
  )
}
