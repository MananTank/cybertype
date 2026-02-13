'use client'

import { memo, useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { ErrorLocations, Progress } from '../lib/types'
import { SpaceIcon } from './icons'

type WordsProps = {
  words: string[]
  progress: Progress
  errorLocations: ErrorLocations
}

export function Words({ words, progress, errorLocations }: WordsProps) {
  const wordsRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(true)

  // auto infinite scroll
  // set transform on the .words element to keep the active word in view
  useEffect(() => {
    if (!shouldScrollRef.current) return

    shouldScrollRef.current = false
    setTimeout(() => {
      shouldScrollRef.current = true
    }, 500) // scrolling throttled to at most every 500ms

    setTimeout(() => {
      if (!wordsRef.current) return

      const activeWordEl = wordsRef.current.querySelector(
        '[data-current="true"][data-word="true"]'
      ) as HTMLElement

      if (!activeWordEl) return
      const top = activeWordEl.getBoundingClientRect().top
      const wordsTop = wordsRef.current.getBoundingClientRect().top
      wordsRef.current.style.setProperty('--depth', wordsTop - top + 'px')
    }, 50)
  })

  return (
    <div className="shrink grow outline-none flex justify-center relative max-h-[12em] max-[1200px]:max-h-[12em] leading-[1.3] mt-[150px] z-1 text-[40px] max-[1600px]:text-[34px] max-[1400px]:text-[30px] max-[1200px]:text-[24px] max-[600px]:text-[20px] select-none">
      {/* Progressive blur on both top and bottom */}
      <div
        className="relative overflow-hidden"
        // style={{
        //   WebkitMaskImage:
        //     'linear-gradient(to bottom, transparent, black 3em, black calc(100% - 3em), transparent)'
        // }}
      >
        {/* top shadow */}
        <div
          className="h-[3em] w-full absolute top-0 right-0 left-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, var(--bg), color-mix(in srgb, var(--bg) 50%, transparent), transparent)'
          }}
        />

        {/* bottom shadow */}
        <div
          className="h-[6em] w-full absolute bottom-0 right-0 left-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, var(--bg), color-mix(in srgb, var(--bg) 80%, transparent), transparent)'
          }}
        />

        <div
          ref={wordsRef}
          className="text-center will-change-transform transition-transform duration-500 ease-out"
          style={{
            ['--top-offset' as string]: '2em',
            transform: 'translateY(calc(var(--depth, 0px) + var(--top-offset)))'
          }}
        >
          {words.map((word, wordIndex) => (
            <Word
              key={wordIndex}
              word={word}
              isTyped={progress.wordIndex > wordIndex}
              isCurrent={progress.wordIndex === wordIndex}
              isUpcoming={progress.wordIndex < wordIndex}
              activeCharIndex={progress.charIndex}
              errorsInWord={errorLocations[wordIndex]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

type WordProps = {
  word: string
  isCurrent: boolean
  isTyped: boolean
  isUpcoming: boolean
  activeCharIndex: number // -1 if active character Index is not inside the word
  errorsInWord?: ErrorLocations[number]
}

const Word = memo(function Word({
  word,
  errorsInWord,
  activeCharIndex,
  isTyped,
  isCurrent,
  isUpcoming
}: WordProps) {
  return (
    <div
      data-word="true"
      data-current={isCurrent}
      data-typed={isTyped}
      className="mb-2.5 inline-flex"
    >
      {word.split('').map((character, characterIndex) => {
        const isError = errorsInWord && errorsInWord[characterIndex] === true
        const isCurrentChar = isCurrent && activeCharIndex === characterIndex
        const isTypedChar = isCurrent ? characterIndex < activeCharIndex : isTyped

        return (
          <span
            key={characterIndex}
            className={cn('p-[0.03em] block', {
              // Error state
              'text-error [text-shadow:0_0_0.5em_var(--error)]': isError,
              // Current character animation
              'animate-[cursor_500ms_ease_infinite]': isCurrentChar && !isError,
              'animate-[cursor-error_200ms_ease_infinite]': isCurrentChar && isError,
              // Active word characters (not error)
              'text-primary': isCurrent && !isError,
              // Typed word characters (not error)
              'text-tertiary': isTypedChar && !isCurrent && !isError,
              // Upcoming words (all words after current)
              'text-secondary': isUpcoming && !isError
            })}
          >
            {character === ' ' ? (
              <SpaceIcon
                className={cn(
                  'w-[0.6em] h-[0.6em] translate-y-[0.25em] inline-block align-baseline',
                  isError ? 'text-error' : 'text-transparent'
                )}
              />
            ) : (
              character
            )}
          </span>
        )
      })}
    </div>
  )
})
