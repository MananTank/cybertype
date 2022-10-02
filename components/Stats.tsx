import styles from '../styles/Stats.module.scss';
import { getSpeed } from '../utils';

type Props = {
	wordsTyped: number;
	timeTaken: number;
	errors: number;
	charsTyped: number;
};

export function Stats(props: Props) {
	const { wordsTyped, timeTaken, errors, charsTyped } = props;
	const wpmSpeed = getSpeed(wordsTyped, timeTaken);
	const cpmSpeed = getSpeed(charsTyped, timeTaken);
	const errorRate = charsTyped === 0 ? 0 : (errors * 100) / charsTyped;
	const accuracy = Math.max(Math.round(100 - errorRate), 0);

	return (
		<div className={styles.stats}>
			<Stat unit='WPM' text='speed' value={wpmSpeed} />
			{/* <Stat unit='CPM' text='speed' value={cpmSpeed} className={styles.cpm} /> */}
			<Stat unit='%' text='accuracy' value={accuracy} className={styles.accuracy} />
			<Stat unit='' text='words' value={wordsTyped} className={styles.words} />
			<Stat unit='' text='letters' value={charsTyped} className={styles.letters} />
		</div>
	);
}

type StatProps = {
	unit: string;
	text: string;
	value: string | number;
	className?: string;
};

function Stat(props: StatProps) {
	const { unit, text, value, className } = props;
	return (
		<div className={`${styles.stat} ${className || ''}`}>
			<div className={styles.value}>
				<span> {value}</span>
				<span className={styles.unit}>{unit}</span>
			</div>

			<div className={styles.text}>{text}</div>
		</div>
	);
}
