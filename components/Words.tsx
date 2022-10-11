import { memo, useEffect, useRef } from 'react'
import styles from '../styles/Words.module.scss'
import classnames from 'classnames'
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
        `.${styles.current}.${styles.word}`
      ) as HTMLElement

      const top = activeWordEl.getBoundingClientRect().top
      const wordsTop = wordsRef.current.getBoundingClientRect().top
      wordsRef.current.style.setProperty('--depth', wordsTop - top + 'px')
    }, 50)
  })

  return (
    <div className={styles.wordsWrapper}>
      <div className={styles.wordsScroll}>
        <div className={styles.words} ref={wordsRef}>
          {words.map((word, wordIndex) => (
            <Word
              key={wordIndex}
              word={word}
              isTyped={progress.wordIndex > wordIndex}
              isCurrent={progress.wordIndex === wordIndex}
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
  activeCharIndex: number // -1 if active character Index is not inside the word
  errorsInWord?: ErrorLocations[number]
}

const Word = memo(function Word({
  word,
  errorsInWord,
  activeCharIndex,
  isTyped,
  isCurrent
}: WordProps) {
  return (
    <div
      className={classnames({
        [styles.word]: true,
        [styles.current]: isCurrent,
        [styles.typed]: isTyped
      })}
    >
      {word.split('').map((character, characterIndex) => (
        <span
          key={characterIndex}
          className={classnames({
            [styles.typed]: characterIndex < activeCharIndex,
            [styles.character]: true,
            [styles.current]: isCurrent && activeCharIndex === characterIndex,
            [styles.isSpace]: character === ' ',
            [styles.error]: errorsInWord && errorsInWord[characterIndex] === true
          })}
        >
          {character === ' ' ? SpaceIcon : character}
        </span>
      ))}
    </div>
  )
})
