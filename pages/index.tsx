import type { NextPage } from 'next';
import styles from '../styles/index.module.scss';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Stats } from '../components/Stats';
import { Words } from '../components/Words';
import { ClientOnly } from '../components/ClientOnly';
import { KeyStats } from '../components/KeyStats';
import { getInitialState, stateReducer, validKeyRegex } from '../state';
import { Actions } from '../components/Actions';
import { ResetIcon } from '../components/icons';
import { useImmerReducer } from 'use-immer';
import { Sounds, getSounds } from '../sounds';
import { State } from '../types';
import Head from 'next/head';

const Home: NextPage = () => {
	const [useSound, setUseSound] = useState(true);
	const [state, dispatch] = useImmerReducer(
		stateReducer,
		undefined as unknown as State,
		getInitialState
	);

	const targetKey = state.words[state.progress.wordIndex][state.progress.charIndex];
	const soundsRef = useRef<Sounds>();

	useEffect(() => {
		if (!soundsRef.current) soundsRef.current = getSounds();

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Backspace') {
				dispatch({ type: 'back', alt: event.altKey });
				if (useSound) {
					soundsRef.current!.back.play();
				}
				return;
			}

			const key = event.key.toLowerCase();

			if (!validKeyRegex.test(key)) {
				return;
			}

			dispatch({ type: 'keydown', key: key });

			if (targetKey !== key) {
				soundsRef.current!.error.play();
			} else {
				soundsRef.current!.randomClick();
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [useSound, dispatch, targetKey]);

	return (
		<div className={styles.app}>
			<Head>
				<title> CyberType </title>
				<meta name='description' content='Cyberpunk themed typing app created by Manan Tank' />
				<meta
					name='keywords'
					content='cybertype, cyberpunk, typing app, futuristic ui, Manan Tank'
				/>
			</Head>
			<div className={styles.appName}>CyberType</div>
			<Actions
				useSound={useSound}
				toggleUseSound={() => {
					if (useSound) soundsRef.current!.thump.play();
					setUseSound(!useSound);
				}}
				onThemeChange={() => {
					if (useSound) soundsRef.current!.thump.play();
				}}
			/>

			<Stats
				wordsTyped={state.totalWordsTyped}
				charsTyped={state.totalCharsTyped}
				timeTaken={state.totalTimeTaken}
				errors={state.totalErrors}
			/>

			<div
				className={styles.reset}
				onClick={() => {
					dispatch({ type: 'reset' });
					if (useSound) soundsRef.current!.thump.play();
				}}
			>
				{ResetIcon}
			</div>

			<ClientOnly fallback={<div className={styles.wordsPlaceHolder}></div>}>
				<Words
					words={state.words}
					progress={state.progress}
					errorLocations={state.errorLocations}
				/>
				<div className={styles.wordInfo}> English 1000 </div>
			</ClientOnly>

			<KeyStats keyStats={state.keyStats} targetSpeed={state.targetSpeed} />
		</div>
	);
};

export default Home;
