import { memo } from 'react';
import styles from '../styles/Words.module.scss';
import classnames from 'classnames';
import { ErrorLocations, Progress } from '../types';

type WordsProps = {
	words: string[];
	progress: Progress;
	errorLocations: ErrorLocations;
};

export function Words({ words, progress, errorLocations }: WordsProps) {
	return (
		<div className={styles.words}>
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
						[styles.character]: true,
						[styles.current]: activeCharIndex === characterIndex,
						[styles.isSpace]: character === ' ',
						[styles.error]: errorsInWord && errorsInWord[characterIndex] === true,
					})}
				>
					{character === ' ' ? '_' : character}
				</span>
			))}
		</div>
	);
});
