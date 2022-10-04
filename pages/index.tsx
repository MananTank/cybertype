import type { NextPage } from 'next';
import styles from '../styles/index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Stats } from '../components/Stats';
import { Words } from '../components/Words';
import { KeyStats } from '../components/Keyboard';
import { loadedData, getInitialState, stateReducer } from '../lib/state';
import { AnimatedLoadingIcon } from '../components/icons';
import { useImmerReducer } from 'use-immer';
import { Sounds, getSounds } from '../lib/sounds';
import { State } from '../lib/types';
import Head from 'next/head';
import { Settings } from '../components/Settings';
import { Nav } from '../components/Nav';
import { useTypingFocus } from '../hooks/useTypingFocus';
import { Tips } from '../components/Tips';

const ignoreKeys = new Set([
	'Shift',
	'Alt',
	'Tab',
	'Meta',
	'Control',
	'ArrowUp',
	'CapsLock',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
]);

const HomeHead = (
	<Head>
		<title> CYBERTYPE </title>
		<meta name='theme-color' content='#171717' />
		<meta name='description' content='Cyberpunk themed typing app created by Manan Tank' />
		<meta name='keywords' content='cybertype, cyberpunk, typing app, futuristic ui, Manan Tank' />
		<meta name='viewport' content='width=device-width, initial-scale=1.0' />
	</Head>
);

const Home: NextPage = () => {
	const [soundEnabled, setSoundEnabled] = useState(true);
	const [fetchingData, setFetchingData] = useState(false);
	const soundsRef = useRef<Sounds>();
	const focusRef = useTypingFocus();
	const [showTips, setShowTips] = useState(false);

	// only call getInitialState once
	// because there is no idiomatic way to do it in useImmerReducer hook itself
	const rendered = useRef(false);
	const [state, dispatch] = useImmerReducer(
		stateReducer,
		rendered.current ? (null as unknown as State) : getInitialState()
	);
	rendered.current = true;

	const targetKey =
		state.words.length === 0 ? '' : state.words[state.progress.wordIndex][state.progress.charIndex];

	const dataName = state.dataName;

	useEffect(() => {
		let isCancelled = false;

		if (dataName in loadedData) {
			dispatch({
				type: 'setData',
				dataName: dataName,
				data: loadedData[dataName]!,
			});
		} else {
			setFetchingData(true);
			fetch(`/json/${dataName}.json`)
				.then(res => res.json())
				.then(data => {
					if (isCancelled) {
						// save the data but don't set it
						loadedData[dataName] = data;
					} else {
						setFetchingData(false);
						dispatch({ type: 'setData', data, dataName });
					}
				});
		}

		return () => {
			isCancelled = true;
		};
	}, [dispatch, dataName]);

	useEffect(() => {
		if (!soundsRef.current) soundsRef.current = getSounds();

		function handleKeyDown(event: KeyboardEvent) {
			if (ignoreKeys.has(event.key)) return;
			if (soundEnabled) soundsRef.current!.randomClick();

			if (event.key === 'Enter') {
				return dispatch({ type: 'reset' });
			}

			if (event.key === 'Backspace') {
				return dispatch({ type: 'back', alt: event.altKey });
			}

			dispatch({ type: 'keydown', key: event.key });

			// play error if typed the wrong key
			if (soundEnabled) {
				if (targetKey !== event.key) {
					soundsRef.current!.error.play();
				} else {
					soundsRef.current!.randomClick();
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [soundEnabled, dispatch, targetKey]);

	return (
		<div className={styles.container}>
			{HomeHead}

			<Nav />

			<div className={styles.dashboard} ref={focusRef} tabIndex={0}>
				<Stats
					charsTyped={state.totalCharsTyped}
					timeTaken={state.totalTimeTaken}
					errors={state.totalErrors}
				/>

				<Settings
					dispatch={dispatch}
					soundEnabled={soundEnabled}
					dataName={state.dataName}
					toggleUseSound={() => setSoundEnabled(v => !v)}
					showTips={() => setShowTips(true)}
				/>
			</div>

			{/* if there is data to show and no other data is being fetched */}
			{state.data.length && !fetchingData ? (
				<>
					<Words
						words={state.words}
						progress={state.progress}
						errorLocations={state.errorLocations}
					/>
				</>
			) : (
				<div className={styles.loader}>{AnimatedLoadingIcon}</div>
			)}

			{showTips && <Tips onClose={() => setShowTips(false)} />}

			<KeyStats keyStats={state.keyStats} />
		</div>
	);
};

export default Home;
