import styles from '../styles/Loader.module.scss'

export function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
