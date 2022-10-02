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
	typingStarted: boolean;
	targetSpeed: number;
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
			type: 'setTargetSpeed';
			speed: number;
	  }
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
	  };
