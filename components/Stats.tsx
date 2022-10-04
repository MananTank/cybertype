import styles from '../styles/Stats.module.scss';
import { getSpeed, padStartZero } from '../lib/utils';

type StatsProps = {
	timeTaken: number;
	errors: number;
	charsTyped: number;
};

export function Stats(props: StatsProps) {
	const { timeTaken, errors, charsTyped } = props;
	const wpmSpeed = getSpeed(charsTyped, timeTaken * 5);
	const errorRate = charsTyped === 0 ? 0 : (errors * 100) / charsTyped;
	const accuracy = Math.max(Math.round(100 - errorRate), 0);

	return (
		<div className={styles.statsContainer}>
			<Stat unit='WPM' text='Speed' value={padStartZero(wpmSpeed)} />
			<Stat unit='%' text='Accuracy' value={padStartZero(accuracy)} className={styles.accuracy} />
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
				<span> {value} </span>
				<span className={styles.unit}>{unit}</span>
			</div>

			<div className={styles.text}>{text}</div>
		</div>
	);
}
