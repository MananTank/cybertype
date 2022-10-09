import { themes, useThemeIndex } from '../hooks/useThemeIndex';
import styles from '../styles/ThemeSwitcher.module.scss';

export type Props = {
	onThemeChange: () => void;
};

export function ThemeSwitcher(props: Props) {
	const [themeIndex, setThemeIndex] = useThemeIndex();
	return (
		<div className={styles.themeSwitcher}>
			<div className={styles.themes}>
				{themes.map((theme, i) => {
					return (
						<div
							data-theme={i}
							key={i}
							// style={{ background: theme }}
							onClick={() => {
								props.onThemeChange();
								setThemeIndex(i);
							}}
							className={styles.theme}
						>
							<h3> {theme.name}</h3>
							<div className={styles.palette}></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
