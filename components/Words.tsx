import React, { CSSProperties, memo, useEffect, useMemo, useRef } from 'react';
import styles from '../styles/Words.module.scss';
import classnames from 'classnames';
import { ErrorLocations, Progress } from '../lib/types';
import { SpaceIcon } from './icons';
import { useTypingFocus } from '../hooks/useTypingFocus';

type WordsProps = {
	words: string[];
	progress: Progress;
	errorLocations: ErrorLocations;
};

export function Words({ words, progress, errorLocations }: WordsProps) {
	const hiddenInputRef = useTypingFocus();
	const wordsRef = useRef<HTMLDivElement>(null);
	const shouldScrollRef = useRef(true);

	// const lastRawProgress = useRef(progress.rawCharIndex);

	// auto infinite scroll
	// set transform on the .words element to keep the active word in view
	useEffect(() => {
		if (!shouldScrollRef.current) return;

		shouldScrollRef.current = false;
		setTimeout(() => {
			shouldScrollRef.current = true;
		}, 500); // scrolling throttled to at most every 500ms

		// TODO: adjust transition based on how fast the user is typing
		// const progressDiff = Math.abs(lastRawProgress.current - progress.charIndex);
		// lastRawProgress.current = progress.charIndex;

		const activeWordEl = wordsRef.current!.querySelector(
			`.${styles.current}.${styles.word}`
		) as HTMLInputElement;

		const top = activeWordEl.getBoundingClientRect().top;
		const wordsTop = wordsRef.current!.getBoundingClientRect().top;

		wordsRef.current!.style.setProperty('--depth', wordsTop - top + 'px');
	});

	return (
		<div className={styles.wordsWrapper}>
			<div className={styles.wordsScroll}>
				<input
					type='text'
					className={styles.hiddenInput}
					ref={hiddenInputRef}
					aria-label='type here'
				/>

				<div
					className={styles.words}
					ref={wordsRef}
					onClick={() => {
						hiddenInputRef.current!.click();
						hiddenInputRef.current!.focus();
					}}
				>
					{words.map((word, wordIndex) => (
						<Word
							key={wordIndex}
							word={word}
							isTyped={progress.wordIndex > wordIndex}
							activeCharIndex={progress.wordIndex !== wordIndex ? -1 : progress.charIndex}
							errorsInWord={errorLocations[wordIndex]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

type WordProps = {
	word: string;
	isTyped: boolean;
	activeCharIndex: number; // -1 if active character Index is not inside the word
	errorsInWord?: ErrorLocations[number];
};

const Word = memo(function Word({ word, errorsInWord, activeCharIndex, isTyped }: WordProps) {
	return (
		<div
			className={classnames({
				[styles.word]: true,
				[styles.current]: activeCharIndex !== -1,
				[styles.typed]: isTyped,
			})}
		>
			{word.split('').map((character, characterIndex) => (
				<span
					key={characterIndex}
					className={classnames({
						[styles.typed]: characterIndex < activeCharIndex,
						[styles.character]: true,
						[styles.current]: activeCharIndex === characterIndex,
						[styles.isSpace]: character === ' ',
						[styles.error]: errorsInWord && errorsInWord[characterIndex] === true,
					})}
				>
					{character === ' ' ? SpaceIcon : character}
				</span>
			))}
		</div>
	);
});
