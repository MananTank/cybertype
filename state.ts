import { State, Action, KeyStatRecord } from './types';
import { english1k } from './wordsData';

/** safe to mutate state because this is a reducer is used by use-immer */

export function stateReducer(state: State, action: Action): void {
	switch (action.type) {
		case 'setTargetSpeed': {
			state.targetSpeed = action.speed;
			return;
		}

		case 'back': {
			if (action.alt) {
				if (state.progress.charIndex === 0) {
					if (state.progress.wordIndex === 0) return;
					state.progress.wordIndex--;
				}
				state.progress.charIndex = 0;
			} else {
				if (state.progress.charIndex === 0) {
					if (state.progress.wordIndex === 0) return;
					state.progress.charIndex = state.words[state.progress.wordIndex - 1].length - 1;
					state.progress.wordIndex--;
				} else {
					state.progress.charIndex--;
				}
			}

			return;
		}

		case 'resetProgress': {
			resetProgress(state);
			return;
		}

		case 'reset': {
			reset(state);
			return;
		}

		case 'keydown': {
			const targetKey = state.words[state.progress.wordIndex][state.progress.charIndex];

			const now = performance.now();

			if (!state.typingStarted) {
				handleFirstKeyDown(state, now);
			}

			const isCorrect = action.key === targetKey;

			if (!isCorrect) {
				handleIncorrectKeyDown(state);
			} else {
				fixErrorsIfCorrected(state);
			}

			handleKeyDown(state, action.key, now, isCorrect);

			return;
		}
	}
}

function fixErrorsIfCorrected(state: State) {
	const w = state.progress.wordIndex;
	const c = state.progress.charIndex;

	if (state.errorLocations[w] && state.errorLocations[w][c]) {
		state.errorLocations[w][c] = false;
		state.totalErrors--;
	}
}

function handleFirstKeyDown(state: State, time: number) {
	state.typingStarted = true;
	state.lastCharTypedTime = time;
	state.lastWordTypedTime = time;
}

function handleKeyDown(state: State, key: string, keyDownTime: number, isCorrect: boolean) {
	// update the stats for the key

	if (isCorrect) {
		const keyStats = state.keyStats[key];
		keyStats.count = keyStats.count + 1;
		keyStats.totalTime = keyStats.totalTime + (keyDownTime - state.lastCharTypedTime);

		state.totalCharsTyped++;
	}

	state.totalTimeTaken = state.totalTimeTaken + (keyDownTime - state.lastCharTypedTime);

	// word not fully typed, progress to next character
	if (state.progress.charIndex < state.words[state.progress.wordIndex].length - 1) {
		state.progress.charIndex++;
	}

	// if word fully typed, progress to next word if there is a next word
	else if (state.progress.wordIndex < state.words.length - 1) {
		// set progress to next word
		state.progress.wordIndex++;
		state.progress.charIndex = 0;

		// update the number of words typed and total time taken
		if (isCorrect) {
			state.totalWordsTyped++;
			state.lastWordTypedTime = keyDownTime;
		}
	}

	// typing complete
	else {
		// reset progress
		state.progress.wordIndex = 0;
		state.progress.charIndex = 0;
		// change words
		state.words = getRandomWords();
		// clear errorLocations
		state.errorLocations = {};
	}

	if (isCorrect) {
		state.lastCharTypedTime = keyDownTime;
	}
}

function handleIncorrectKeyDown(state: State) {
	const w = state.progress.wordIndex;
	const c = state.progress.charIndex;
	if (!state.errorLocations[w]) {
		state.errorLocations[w] = {};
	}

	state.totalErrors++;
	state.errorLocations[w][c] = true;
}

function resetProgress(state: State) {
	state.totalErrors = 0;
	state.typingStarted = false;
	state.lastWordTypedTime = 0;
	state.lastCharTypedTime = 0;
	state.totalTimeTaken = 0;
	state.totalWordsTyped = 0;
	state.totalCharsTyped = 0;
	state.keyStats = createEmptyKeyStatRecord();
	state.errorLocations = {};
	state.progress = {
		wordIndex: 0,
		charIndex: 0,
	};
}

function reset(state: State) {
	resetProgress(state);
	state.words = getRandomWords();
}

export function getInitialState(): State {
	return {
		totalErrors: 0,
		typingStarted: false,
		targetSpeed: 100,
		words: getRandomWords(),
		lastWordTypedTime: 0,
		lastCharTypedTime: 0,
		totalTimeTaken: 0,
		totalWordsTyped: 0,
		totalCharsTyped: 0,
		keyStats: createEmptyKeyStatRecord(),
		errorLocations: {},
		progress: {
			wordIndex: 0,
			charIndex: 0,
		},
	};
}

export const keys = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

function createEmptyKeyStatRecord() {
	const value: KeyStatRecord = {};
	keys.forEach(key => {
		value[key] = {
			count: 0,
			totalTime: 0,
		};
	});

	value[' '] = {
		count: 0,
		totalTime: 0,
	};

	return value;
}

function getRandomWords() {
	let words = [];
	for (let i = 0; i < 12; i++) {
		const randomIndex = Math.floor(Math.random() * english1k.length);
		words.push(english1k[randomIndex] + ' ');
	}
	return words;
}

export const validKeyRegex = /^([a-zA-Z]|\s)$/;
