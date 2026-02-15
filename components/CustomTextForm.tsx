import { Dispatch, useState } from 'react'
import { Action } from '../lib/types'
import { saveCustomText, customTextExists, getAllCustomTexts } from '../lib/customTexts'
import { dataNames } from './DataSelector'

type Props = {
  dispatch: Dispatch<Action>
  handleClose: () => void
  onSaved: () => void
}

export function CustomTextForm({ dispatch, handleClose, onSaved }: Props) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    const trimmedName = name.trim()
    const trimmedText = text.trim()

    if (!trimmedName) {
      setError('Name is required')
      return
    }

    if (!trimmedText) {
      setError('Text is required')
      return
    }

    // Check if name conflicts with built-in data
    if (dataNames.includes(trimmedName)) {
      setError('This name is reserved')
      return
    }

    // Check if name already exists in custom texts
    const exists = await customTextExists(trimmedName)
    if (exists) {
      setError('A custom text with this name already exists')
      return
    }

    setIsSubmitting(true)
    try {
      await saveCustomText(trimmedName, trimmedText)
      onSaved()
      // Select the newly created custom text
      dispatch({ type: 'setDataName', data: trimmedName })
      handleClose()
    } catch {
      setError('Failed to save custom text')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[400px] max-w-[calc(100vw-80px)] p-4 flex flex-col gap-3">
      {/* Name input */}
      <input
        type="text"
        value={name}
        onChange={e => {
          setName(e.target.value)
          setError('')
        }}
        placeholder="Name (required)"
        className="w-full px-3 py-2 rounded-lg bg-island-button-bg hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg active:scale-[0.99] text-sm outline-none"
        autoFocus
      />

      {/* Text textarea */}
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value)
          setError('')
        }}
        placeholder="Paste your text here..."
        className="w-full px-3 py-2 rounded-lg bg-island-button-bg hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg active:scale-[0.99] outline-none text-sm resize-none h-32"
      />

      {/* Error message */}
      {error && <p className="text-error text-xs">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'setActivePanel', data: 'data' })
          }}
          className="flex-1 py-2 px-4 rounded-lg bg-island-button-bg hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg active:scale-[0.99] text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 p-3 text-sm rounded-lg bg-island-button-bg hover:bg-island-button-hover-bg focus-visible:bg-island-button-hover-bg active:scale-[0.99] font-medium transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
