import { heatmapKeys } from './keys';
import { KeyStatRecord, State } from './types';

export function getSpeed(words: number, time: number) {
	return words === 0 || time === 0 ? 0 : Math.round((words / time) * 60 * 1000);
}

export function createEmptyKeyStatRecord() {
	const value: KeyStatRecord = {};
	heatmapKeys.forEach(key => {
		value[key] = {
			count: 0,
			totalTime: 0,
		};
	});

	return value;
}

export function getRandomWords(data: string[], count: number) {
	let words = [];
	let chars = 0;

	while (chars < count) {
		const randomIndex = Math.floor(Math.random() * data.length);
		chars += data[randomIndex].length;
		words.push(data[randomIndex] + ' ');
	}

	return words;
}

type Group = {
	group: string;
	values: State['dataName'][];
};

export const dataNameGroups: Group[] = [
	{
		group: 'English',
		values: [
			'english-200',
			'english-1k',
			'english-5k',
			'english-10k',
			'quotes',
			'wordle',
			'misspelling',
		],
	},
	{
		group: 'Code',
		values: ['javascript', 'rust', 'html', 'css', 'c++', 'sql', 'git', 'bash', 'python', 'java'],
	},
];

export function padStartZero(num: number) {
	return (num + '').padStart(3, '0');
}
