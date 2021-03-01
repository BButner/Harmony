import { motion, useAnimation } from 'framer-motion'
import { FunctionComponent, useEffect } from 'react'
import styles from './LoadingIcon.module.scss'

export const LoadingIcon: FunctionComponent = () => {
  return (
    <div className={`flex h-32 space-x-5 mt-52`}>
      <div className={styles.sphere} />
      <div className={styles.sphere} />
      <div className={styles.sphere} />
      <div className={styles.sphere} />
    </div>
  )
}