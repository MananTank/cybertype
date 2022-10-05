import { State, Action, KeyStatRecord, QuoteData } from './types';
import { getRandomWords, createEmptyKeyStatRecord } from './utils';

type LoadedData = Record<State['dataName'], State['data'] | undefined>;

// key-value store of all the data loaded from network
export const loadedData = {} as LoadedData;

export function stateReducer(state: State, action: Action): void {
	switch (action.type) {
		case 'setData': {
			loadedData[state.dataName] = action.data;
			state.data = action.data;
			updateWords(state);
			resetProgress(state);
			return;
		}

		case 'setDataName': {
			state.dataName = action.data;
			resetProgress(state);
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
		const stats = state.keyStats[key.toLowerCase()];

		// if we are tracking the stat for this key
		if (stats) {
			const keyStats = stats;
			keyStats.count = keyStats.count + 1;
			keyStats.totalTime = keyStats.totalTime + (keyDownTime - state.lastCharTypedTime);
		}

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
		updateWords(state);
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

function updateWords(state: State) {
	if (state.dataName === 'quotes') {
		const i = Math.round(Math.random() * state.data.length);
		const data = state.data as unknown as QuoteData[];
		state.words = data[i].text.split(' ').map(w => w + ' ');
	} else {
		state.words = getRandomWords(state.data);
	}
}

function reset(state: State) {
	resetProgress(state);
	updateWords(state);
}

export function getInitialState(): State {
	return {
		data: [],
		dataName: 'english-200',
		totalErrors: 0,
		typingStarted: false,
		words: [],
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
	' ',
	'[',
	']',
	';',
	`'`,
	',',
	'.',
	'/',
];
