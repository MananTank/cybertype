import { Dispatch, memo } from 'react';
import { Action, State } from '../lib/types';
import { QuestionIcon, ResetIcon, SoundDisabled, SoundEnabledIcon, ChevronIcon } from './icons';
import styles from '../styles/Settings.module.scss';
import { dataNameGroups } from '../lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';

type SettingsProps = {
	dispatch: Dispatch<Action>;
	soundEnabled: boolean;
	dataName: State['dataName'];
	showTips: () => void;
	toggleUseSound: () => void;
};

export const Settings = memo(function Settings({
	dispatch,
	soundEnabled,
	dataName,
	toggleUseSound,
	showTips,
}: SettingsProps) {
	return (
		<div className={styles.settings}>
			{/* data selector */}
			<div className={styles.dataSelector}>
				<select
					className={styles.wordInfo}
					value={dataName}
					onChange={event => {
						const dataName = event.target.value;
						dispatch({ type: 'setDataName', data: dataName as State['dataName'] });
					}}
				>
					{dataNameGroups.map(dataNameGroup => (
						<optgroup label={dataNameGroup.group} key={dataNameGroup.group}>
							{dataNameGroup.values.map(value => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</optgroup>
					))}
				</select>

				{ChevronIcon}
			</div>

			<div className={styles.icons}>
				{/* reset */}
				<div className={styles.reset} onClick={() => dispatch({ type: 'reset' })}>
					{ResetIcon}
				</div>

				{/* theme switcher */}
				<ThemeSwitcher />

				{/* sound */}
				<button className={styles.sound} onClick={toggleUseSound} aria-label='toggle sound effects'>
					{soundEnabled ? SoundEnabledIcon : SoundDisabled}
				</button>

				{/* question */}
				<button aria-label='ShortCuts' className={styles.question} onClick={showTips}>
					{QuestionIcon}
				</button>
			</div>
		</div>
	);
});
