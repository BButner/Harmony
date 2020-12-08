import React, { FunctionComponent } from 'react'
import styles from './soundbar.module.scss'

type SoundbarProps = {
  animationIndex: number;
}

const Soundbar: FunctionComponent<SoundbarProps> = ({ animationIndex }) => {
  const height = Math.floor(Math.random() * 400 + 50)
  return (
    <div className={`${styles.bar}`} style={{ height }}>
      <div className={`${styles['bar-bottom']} ${styles['wave-' + (animationIndex + 1)]}`} style={{ height }}></div>
      {/* <div className={styles['bar-top']} style={{ left: (5 * index) + (4 * index) }}></div> */}
    </div>
  ) 
}

export default Soundbar