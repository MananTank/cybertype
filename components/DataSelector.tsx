import { Dispatch, useRef, useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Action } from '../lib/types'
import { cn } from '../lib/utils'
import { useArrowNavigation } from '../hooks/useArrowNavigation'
import { getAllCustomTexts, deleteCustomText, CustomText } from '../lib/customTexts'

export const dataNames = [
  'Quotes',
  'English 200',
  'English 1K',
  'English 5K',
  'English 10K',
  'Wordle',
  'Commonly Misspelled'
]

type Props = {
  dispatch: Dispatch<Action>
  handleClose: () => void
  currentDataName: string
}

export function DataSelector({ dispatch, handleClose, currentDataName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [customTexts, setCustomTexts] = useState<CustomText[]>([])

  // Load custom texts on mount
  useEffect(() => {
    getAllCustomTexts().then(setCustomTexts)
  }, [])

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

  const customTextNames = new Set(customTexts.map(ct => ct.name))

  const handleDelete = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteCustomText(name)
    const updated = await getAllCustomTexts()
    setCustomTexts(updated)

    // If the deleted item was selected, switch to default
    if (currentDataName === name) {
      dispatch({ type: 'setDataName', data: 'English 200' })
    }
  }

  // Combine built-in and custom text names
  const allNames = [...dataNames, ...customTexts.map(ct => ct.name)]

  return (
    <div
      ref={containerRef}
      className="max-w-[420px] w-[calc(100vw-80px)] flex flex-wrap gap-x-2 gap-y-2.5 p-4"
    >
      {allNames.map(value => {
        const isActive = currentDataName === value
        const isCustom = customTextNames.has(value)
        return (
          <button
            key={value}
            data-active={isActive}
            className={cn(
              'group relative text-sm py-2 px-4 rounded-full cursor-pointer select-none',
              'transition-all duration-150 ease-out outline-none',
              isCustom && 'pr-8',
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
            {/* Delete button for custom texts */}
            {isCustom && (
              <span
                role="button"
                tabIndex={0}
                onClick={e => handleDelete(value, e)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDelete(value, e as unknown as React.MouseEvent)
                  }
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-error/20 text-secondary hover:text-error transition-colors"
              >
                <X className="size-3" />
              </span>
            )}
          </button>
        )
      })}

      {/* Add custom text button */}
      <button
        type="button"
        onClick={() => dispatch({ type: 'setActivePanel', data: 'customText' })}
        className={cn(
          'group relative text-sm py-2 px-3 rounded-full cursor-pointer select-none',
          'transition-all duration-150 ease-out outline-none',
          'bg-secondary/10 text-secondary hover:bg-secondary/30 focus-visible:bg-secondary/30 active:scale-[0.99] hover:text-primary focus-visible:text-primary'
        )}
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

// Export a function to reload custom texts (called after saving a new one)
export async function reloadCustomTexts(): Promise<CustomText[]> {
  return getAllCustomTexts()
}
