export function getSpeed(words: number, time: number) {
	return words === 0 ? 0 : Math.round((words / time) * 60 * 1000);
}
