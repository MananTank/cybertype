import { ThemeSwitcher } from './ThemeSwitcher';
import styles from '../styles/Actions.module.scss';
import { ResetIcon, GithubIcon, SoundEnabledIcon, SoundDisabled } from './icons';

type ActionsProps = {
	useSound: boolean;
	toggleUseSound: () => void;
	onThemeChange: () => void;
};

export function Actions({ useSound, toggleUseSound, onThemeChange }: ActionsProps) {
	return (
		<div className={styles.actions}>
			<ThemeSwitcher onThemeChange={onThemeChange} />

			<button className={styles.sound} onClick={toggleUseSound} aria-label='toggle sound effects'>
				{useSound ? SoundEnabledIcon : SoundDisabled}
			</button>

			<a href='github.com/MananTank' className={styles.github} aria-label='View on Github'>
				{GithubIcon}
			</a>
		</div>
	);
}
