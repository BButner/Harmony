import { mdiPowerStandby } from '@mdi/js'
import React, { FunctionComponent } from 'react'
import styles from './indexcomputer.module.scss'
import IndexComputerScreen from './IndexComputerScreen'

const IndexComputer: FunctionComponent = () => {
  return (
    <div className={`${styles['computer-wrapper']}`}>
      <div className={styles['monitor-wrapper']}>
        <div className={styles.screen}>
          <IndexComputerScreen />
        </div>
        <div className={styles.chin}></div>
      </div>
      <div className={styles.stand}></div>
      <div className={styles.foot}></div>
    </div>
  )
}

export default IndexComputer