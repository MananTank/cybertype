import styles from '../styles/Modal.module.scss';
import { closeIcon } from './icons';

type Props = {
	onClose: () => void;
	children: React.ReactNode;
};

export function Modal(props: Props) {
	return (
		<div className={styles.modal}>
			<button className={styles.closeIcon} onClick={props.onClose}>
				{closeIcon}
			</button>
			{props.children}
		</div>
	);
}
