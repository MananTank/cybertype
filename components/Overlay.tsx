import styles from '../styles/Overlay.module.scss';

type Props = {
	onClick: () => void;
};

export function Overlay(props: Props) {
	return <div onClick={props.onClick} className={styles.overlay}></div>;
}
