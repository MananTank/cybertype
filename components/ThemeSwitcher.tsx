import styles from '../styles/Actions.module.scss';
import { ThemeIcon } from './icons';

const themes = ['red', 'green', 'purple'];
let index = 0;

function changeTheme() {
	index = index === themes.length - 1 ? 0 : index + 1;
	document.body.setAttribute('data-theme', themes[index]);
}

export function ThemeSwitcher({ onThemeChange }: { onThemeChange: () => void }) {
	return (
		<button
			aria-label='Change Theme'
			className={styles.switch}
			onClick={() => {
				onThemeChange();
				changeTheme();
			}}
		>
			{ThemeIcon}
		</button>
	);
}
