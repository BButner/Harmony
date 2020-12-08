import React, { FunctionComponent } from 'react'
import IndexComputerScreen from './IndexComputerScreen'
import styles from './indexlaptop.module.scss'

const IndexLaptop: FunctionComponent = () => {
  return (
    <div className={styles['laptop-wrapper']}>
      <div className={styles.screen}>
        <IndexComputerScreen />
      </div>
      <div className={styles.keyboard}>
        <div className={styles.trackpad}></div>
      </div>
    </div>
  )
}

export default IndexLaptop