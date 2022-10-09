import { Dispatch } from 'react';
import { Action, State } from '../lib/types';
import styles from '../styles/DataSelector.module.scss';

const dataNameGroups = [
	{
		group: 'English',
		values: [
			'Quotes',
			'English 200',
			'English 1K',
			'English 5K',
			'English 10K',
			'Wordle',
			'Commonly Misspelled',
		],
	},
	{
		group: 'Programming',
		values: ['JavaScript', 'Rust', 'HTML', 'CSS', 'C++', 'SQL', 'Git', 'Bash', 'Python', 'Java'],
	},
];

export function DataSelector({ dispatch }: { dispatch: Dispatch<Action> }) {
	return (
		<div className={styles.dataSelector}>
			{dataNameGroups.map(dataNameGroup => (
				<div key={dataNameGroup.group} className={styles.group}>
					<h3> {dataNameGroup.group} </h3>
					<div className={styles.grid}>
						{dataNameGroup.values.map(value => (
							<div
								key={value}
								className={styles.option}
								onClick={() => {
									dispatch({ type: 'setShowDataSelector', data: false });
									dispatch({ type: 'setDataName', data: value });
								}}
							>
								{value}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
