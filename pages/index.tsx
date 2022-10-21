import type { NextPage } from 'next'
import styles from '../styles/index.module.scss'
import { Words } from '../components/Words'
import { KeyStats } from '../components/Keyboard'
import { useAppState } from '../lib/state'
import Head from 'next/head'
import { Nav } from '../components/Nav'
import { Loader } from '../components/Loader'
import { DynamicIsland } from '../components/DynamicIsland'
import { useData } from '../hooks/useData'
import { useKeys } from '../hooks/useKeys'
import { useTypingStarted } from '../hooks/useTyping'
import { useLocalStorage } from '../lib/localStorage'

const Home: NextPage = () => {
  const [state, dispatch] = useAppState()

  const targetKey =
    state.words.length === 0
      ? ''
      : state.words[state.progress.wordIndex][state.progress.charIndex]

  // ignore typing when dynamic island is expanded
  const ignoreTyping = state.showThemes || state.showDataSelector

  useData(state.dataName, dispatch)
  useKeys(targetKey, dispatch, state.soundEnabled, state.soundPack, ignoreTyping)
  useTypingStarted(state.typingStarted)
  useLocalStorage(state)

  return (
    <div className={styles.container}>
      {AppHead}
      <DynamicIsland state={state} dispatch={dispatch} />

      {/* if there is data to show and no other data is being fetched */}
      {state.data.length && !state.fetchingData ? (
        <>
          <Words
            words={state.words}
            progress={state.progress}
            errorLocations={state.errorLocations}
          />
        </>
      ) : (
        <Loader />
      )}

      <KeyStats keyStats={state.keyStats} />

      <div className={styles.tips}>
        <kbd>enter</kbd> to reset / change
      </div>

      <Nav />
    </div>
  )
}

const AppHead = (
  <Head>
    <title> cybertype </title>
    <meta name="theme-color" content="#171212" />
    <meta
      name="description"
      content="Fast and Minimal Typing App - Improve your typing speed."
    />
    <meta
      name="keywords"
      content="cybertype, typing app, practice typing, simple typing app, improve typing speed"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </Head>
)

export default Home
