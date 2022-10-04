export type Progress = {
	wordIndex: number;
	charIndex: number;
};

export type KeyStat = {
	totalTime: number;
	count: number;
};

export type KeyStatRecord = Record<string, KeyStat>;

export type ErrorLocations = Record<number, Record<number, boolean>>; // { 0: { 1: true, 3: true  }}

export type State = {
	data: string[];
	dataName:
		| 'english-200'
		| 'english-1k'
		| 'english-10k'
		| 'javascript'
		| 'misspelling'
		| 'contractions'
		| 'rust'
		| 'html'
		| 'css'
		| 'c++'
		| 'sql'
		| 'git'
		| 'english-5k'
		| 'bash'
		| 'python'
		| 'wordle'
		| 'quotes';

	typingStarted: boolean;
	totalTimeTaken: number;
	totalWordsTyped: number;
	totalCharsTyped: number;
	totalErrors: number;
	keyStats: KeyStatRecord;
	words: string[];
	errorLocations: ErrorLocations;
	progress: Progress;
	lastWordTypedTime: number;
	lastCharTypedTime: number;
};

export type Action =
	| {
			type: 'resetProgress';
	  }
	| {
			type: 'reset';
	  }
	| {
			type: 'keydown';
			key: string;
	  }
	| {
			type: 'back';
			alt: boolean;
	  }
	| {
			type: 'setData';
			dataName: State['dataName'];
			data: State['data'];
	  }
	| {
			type: 'setDataName';
			data: State['dataName'];
	  };

export type QuoteData = {
	text: string;
	source: string;
};
