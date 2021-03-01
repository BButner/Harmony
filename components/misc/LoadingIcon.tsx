import { motion, useAnimation } from 'framer-motion'
import { FunctionComponent, useEffect } from 'react'
import styles from './LoadingIcon.module.scss'

export const LoadingIcon: FunctionComponent = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}></div>
    </div>
  )
}