import styles from '../styles/KeyStats.module.scss';
import { KeyStatRecord } from '../types';
import { keys } from '../state';
import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { getSpeed } from '../utils';
import { ClientOnly } from './ClientOnly';

type Props = {
	keyStats: KeyStatRecord;
	targetSpeed: number;
};

const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export function KeyStats({ keyStats, targetSpeed }: Props) {
	const mapper = (keys: string[]) =>
		keys.map(key => (
			<KeyStat
				key={key}
				keyName={key}
				count={keyStats[key].count}
				totalTime={keyStats[key].totalTime}
				targetSpeed={targetSpeed}
			/>
		));

	return (
		<div className={styles.keyStats}>
			<div className={styles.row}>{mapper(row1)}</div>
			<div className={styles.row}>{mapper(row2)}</div>
			<div className={styles.row}>{mapper(row3)}</div>
		</div>
	);
}

type KeyStatProps = {
	count: number;
	totalTime: number;
	keyName: string;
	targetSpeed: number;
};

const KeyStat = memo(function KeyStat({ targetSpeed, keyName, count, totalTime }: KeyStatProps) {
	const keySpeed = totalTime === 0 ? 0 : getSpeed(count, totalTime * 5);
	const label = getSpeedLabel(keySpeed, targetSpeed);
	const elRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === keyName) {
				elRef.current!.setAttribute('data-pressed', '');
				setTimeout(() => {
					elRef.current!.removeAttribute('data-pressed');
				}, 400);
			}
		}
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [keyName]);

	return (
		<div className={`${styles.keyStat} ${label}`} ref={elRef}>
			<div className={styles.keyName}>{keyName}</div>
			{keySpeed !== 0 && (
				<div className={styles.statsContainer}>
					<div className={styles.speed}>
						{keySpeed}
						<span className={styles.unit}>WPM</span>
					</div>
				</div>
			)}
		</div>
	);
});

export const getSpeedLabel = (speed: number, targetSpeedValue: number) => {
	if (speed === 0) return styles.notTyped;
	const ratio = speed / targetSpeedValue;
	if (ratio >= 1) return styles.fastest;
	if (ratio >= 0.9) return styles.fast;
	if (ratio >= 0.8) return styles.normal;
	if (ratio >= 0.7) return styles.slow;
	return styles.slowest;
};
