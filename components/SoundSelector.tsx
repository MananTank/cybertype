import { SoundPack, soundPacks } from '../lib/sounds'
import { Action } from '../lib/types'
import styles from '../styles/SoundSelector.module.scss'
import { DoneIcon } from './icons'

export type Props = {
  handleClose: () => void
  selectedSoundPack: SoundPack
  dispatch: React.Dispatch<Action>
}

export function SoundSelector(props: Props) {
  return (
    <div className={styles.options}>
      {soundPacks.map(soundPack => {
        return (
          <div
            key={soundPack.id}
            className={styles.option}
            data-active={props.selectedSoundPack === soundPack.id}
            onClick={() => {
              props.dispatch({ type: 'setSoundPack', data: soundPack.id })
              props.handleClose()
            }}
          >
            {props.selectedSoundPack === soundPack.id && (
              <div className={styles.done}> {DoneIcon} </div>
            )}
            <div className={styles.name}> {soundPack.name}</div>
            <div className={styles.type}> {soundPack.type}</div>
          </div>
        )
      })}
    </div>
  )
}
