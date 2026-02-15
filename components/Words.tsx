'use client'

import { memo, useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { ErrorLocations, Progress } from '../lib/types'
import { SpaceIcon } from './icons'
import { motion, LayoutGroup } from 'motion/react'

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
    <div className="flex justify-center relative overflow-hidden h-[500px] leading-[1.3] py-20 z-1 text-2xl md:text-4xl select-none pointer-events-none">
      {/* top shadow */}
      <div
        className="h-[6em] w-full absolute top-0 right-0 left-0 z-10 "
        style={{
          background:
            'linear-gradient(to bottom, var(--bg), color-mix(in srgb, var(--bg) 50%, transparent), transparent)'
        }}
      />

      {/* bottom shadow */}
      <div
        className="h-[6em] w-full absolute bottom-0 right-0 left-0 z-10 "
        style={{
          background:
            'linear-gradient(to top, var(--bg), color-mix(in srgb, var(--bg) 80%, transparent), transparent)'
        }}
      />

      <LayoutGroup>
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
              index={wordIndex}
              isTyped={progress.wordIndex > wordIndex}
              isCurrent={progress.wordIndex === wordIndex}
              isUpcoming={progress.wordIndex < wordIndex}
              activeCharIndex={progress.charIndex}
              errorsInWord={errorLocations[wordIndex]}
            />
          ))}
        </div>
      </LayoutGroup>
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
  isUpcoming,
  index
}: WordProps & { index: number }) {
  return (
    <motion.div
      data-word="true"
      data-current={isCurrent}
      data-typed={isTyped}
      className="mb-2.5 inline-flex"
      initial={{ opacity: 0, filter: 'blur(8px)', y: 28 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5 + index * 0.015
      }}
    >
      {word.split('').map((character, characterIndex) => {
        const isError = errorsInWord && errorsInWord[characterIndex] === true
        const isCurrentChar = isCurrent && activeCharIndex === characterIndex
        const isTypedChar = isCurrent ? characterIndex < activeCharIndex : isTyped

        return (
          <span
            key={characterIndex}
            className={cn('p-[0.03em] block relative', {
              // Error state
              'text-error [text-shadow:0_0_0.5em_var(--error)]': isError,
              // Active word characters (not yet typed)
              'text-primary': isCurrent && !isTypedChar && !isError,
              // Typed characters (current word or past words)
              'text-tertiary': isTypedChar && !isError,
              // Upcoming words (all words after current)
              'text-secondary': isUpcoming && !isError
            })}
          >
            {/* Animated cursor line */}
            {isCurrentChar && (
              <motion.span
                layoutId="typing-cursor"
                className={cn(
                  'absolute left-0 -translate-x-1 top-[0.2em] bottom-[0.2em] w-1 rounded-full animate-blink',
                  isError ? 'bg-error' : 'bg-primary'
                )}
                transition={{
                  type: 'tween',
                  duration: 0.1,
                  ease: 'circOut'
                }}
              />
            )}
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
    </motion.div>
  )
})
