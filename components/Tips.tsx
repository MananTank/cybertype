import styles from '../styles/Tips.module.scss';
import { QuestionIcon, ResetIcon } from './icons';

type Props = {
	onClose: () => void;
};

export function Tips(props: Props) {
	return (
		<>
			<div onClick={props.onClose} className={styles.overlay}></div>
			<div className={styles.tips}>
				<h2 aria-label='Tips'>{QuestionIcon}</h2>
				<p>
					Hit <kbd>Enter</kbd> OR click on {ResetIcon} to Reset for starting a new typing session.
				</p>

				<p>
					Hit <kbd>option + delete</kbd> in Mac OR <kbd>alt + backspace</kbd> in Windows to go back
					one word instead of a single character
				</p>
			</div>
		</>
	);
}
