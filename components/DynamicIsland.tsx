import { Settings } from './Settings';
import { Stats } from './Stats';
import styles from '../styles/DynamicIsland.module.scss';
import { State, Action } from '../lib/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import React, { useEffect, useRef } from 'react';
import { DataSelector } from './DataSelector';
import { Modal } from './Modal';

export type Props = {
	state: State;
	dispatch: React.Dispatch<Action>;
};

export function DynamicIsland({ state, dispatch }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	// created an effect instead of directly setting style to fix hydration warning
	useEffect(() => {
		ref.current!.style.setProperty('--data-name-len', state.dataName.length + '');
	}, [state.dataName.length]);

	return (
		<div ref={ref} className={styles.dynamicIslandContainer}>
			<div
				className={styles.dynamicIsland}
				data-show-theme={state.showThemes}
				data-show-data-selector={state.showDataSelector}
			>
				<div className={styles.dashboard}>
					<Stats
						charsTyped={state.totalCharsTyped}
						timeTaken={state.totalTimeTaken}
						errors={state.totalErrors}
					/>

					{/* memoized - don't pass unstable callbacks */}
					<Settings
						dispatch={dispatch}
						soundEnabled={state.soundEnabled}
						dataName={state.dataName}
					/>
				</div>

				{state.showThemes && (
					<Modal
						onClose={() => {
							dispatch({ type: 'setShowThemes', data: false });
						}}
					>
						<ThemeSwitcher
							onThemeChange={() => {
								dispatch({ type: 'setShowThemes', data: false });
							}}
						/>
					</Modal>
				)}

				{state.showDataSelector && (
					<Modal
						onClose={() => {
							dispatch({ type: 'setShowDataSelector', data: false });
						}}
					>
						<DataSelector dispatch={dispatch} />
					</Modal>
				)}
			</div>
		</div>
	);
}
