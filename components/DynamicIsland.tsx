import { Settings } from './Settings'
import { Stats } from './Stats'
import styles from '../styles/DynamicIsland.module.scss'
import { State, Action } from '../lib/types'
import { ThemeSwitcher } from './ThemeSwitcher'
import React, { useRef } from 'react'
import { DataSelector } from './DataSelector'
import { ClientOnly } from './ClientOnly'
import { closeIcon } from './icons'
import { SoundSelector } from './SoundSelector'

export type Props = {
  state: State
  dispatch: React.Dispatch<Action>
}

export function DynamicIsland({ state, dispatch }: Props) {
  function closeThemeSwitcher() {
    dispatch({ type: 'setShowThemes', data: false })
  }

  function closeDataSelector() {
    dispatch({ type: 'setShowDataSelector', data: false })
  }

  function closeSoundSelector() {
    dispatch({ type: 'setShowSoundSelector', data: false })
  }

  const isModalOpen = state.showThemes || state.showDataSelector

  return (
    <div data-island-open={isModalOpen}>
      <div className={styles.pill}>
        {/* memoized - don't pass unstable callbacks */}
        <Settings
          dispatch={dispatch}
          soundEnabled={state.soundEnabled}
          dataName={state.dataName}
        />
      </div>

      <ClientOnly>
        {/* wpm and accuracy */}
        <Stats
          charsTyped={state.totalCharsTyped}
          timeTaken={state.totalTimeTaken}
          errors={state.totalErrors}
        />

        <DynamicIslandExpander
          show={state.showThemes}
          handleClose={closeThemeSwitcher}
          ratio={0.2}
          render={close => <ThemeSwitcher handleClose={close} />}
        />

        <DynamicIslandExpander
          handleClose={closeDataSelector}
          ratio={0.6}
          show={state.showDataSelector}
          render={close => <DataSelector dispatch={dispatch} handleClose={close} />}
        />

        <DynamicIslandExpander
          handleClose={closeSoundSelector}
          ratio={0.5}
          show={state.showSoundSelector}
          render={close => (
            <SoundSelector
              handleClose={close}
              dispatch={dispatch}
              selectedSoundPack={state.soundPack}
            />
          )}
        />
      </ClientOnly>
    </div>
  )
}

// ratio is the ratio of width of content inside the island expander and width of dynamic island itself
// this ratio is used to adjust the enter and exit animation of the content inside the island expander to make it look like the
// island itself is expanding and contracting

// we have to do this because transitioning width and height of the dynamic island itself is very CPU intensive
// and it lags on mobile devices

function DynamicIslandExpander(props: {
  handleClose: () => void
  ratio: number
  render: (close: () => void) => JSX.Element
  show: boolean
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  function handleClose() {
    if (!modalRef.current) return
    modalRef.current.setAttribute('data-closing', 'true')

    function handleAnimationEnd(event: Event) {
      // ignore animation events from children - only care about the element itself
      if (event.target !== modalRef.current) return
      // rAf to ensure the animation has finished - to avoid glitches
      requestAnimationFrame(() => {
        if (!modalRef.current) return
        modalRef.current.setAttribute('data-closing', 'false')
        modalRef.current.removeEventListener('animationend', handleAnimationEnd)
        props.handleClose()
      })
    }

    modalRef.current.addEventListener('animationend', handleAnimationEnd)

    return () => {
      if (!modalRef.current) return
      modalRef.current.removeEventListener('animationend', handleAnimationEnd)
    }
  }

  return (
    <div
      ref={modalRef}
      data-show={props.show}
      className={styles.dynamicIslandExpander}
      style={
        {
          '--ratio': props.ratio
        } as React.CSSProperties
      }
    >
      <button aria-label={'close'} className={styles.closeIcon} onClick={handleClose}>
        {closeIcon}
      </button>
      {props.render(handleClose)}
    </div>
  )
}
