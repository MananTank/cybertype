import styles from '../styles/Settings.module.scss';
import { ThemeIcon } from './icons';

// must match the css
const themes = ['theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'theme-6', 'theme-7'];
const bgs = ['#171717', '#181313', '#021c3b', '#270c39', '#060709', '#4f6367', '#0c0c0c'];
let index = 0;

function changeTheme() {
	index = index === themes.length - 1 ? 0 : index + 1;
	document.body.setAttribute('data-theme', themes[index]);
	const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
	meta.setAttribute('content', bgs[index]);
}

export function ThemeSwitcher() {
	return (
		<button aria-label='Change Theme' className={styles.switch} onClick={changeTheme}>
			{ThemeIcon}
		</button>
	);
}
