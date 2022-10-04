import { CSSProperties, memo, useEffect, useMemo, useRef } from 'react';
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

	const fontSizeMultiplier = useMemo(() => {
		const chars = words.reduce((acc, w) => acc + w.length, 0);
		if (chars < 150) return 1;
		if (chars < 200) return 0.8;
		if (chars < 250) return 0.7;
		return 0.6;
	}, [words]);

	return (
		<div
			className={styles.wordsWrapper}
			style={{ '--font-size-multiplier': fontSizeMultiplier } as CSSProperties}
		>
			<input type='text' className={styles.hiddenInput} ref={hiddenInputRef} />

			<div
				className={styles.words}
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
