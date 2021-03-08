import { motion } from 'framer-motion'
import { FunctionComponent } from 'react'
import styles from './LoadingIcon.module.scss'

export const LoadingIcon: FunctionComponent = () => {
  const path: string = "M142.74,91.25c-9.37-15.15-27.23-15.51-41.3-8.32-16.86,8.62-30.25,28.71-30.25,28.71s9.13-66-15.18-94C32.81-9.13,14.79,2.3,13.55,3.14h0l0,0h0c-28.74,25.93-2.91,91-1,95.67,0,0,0,0,0,0C1.3,39.34,33,28.32,38.84,26.81c4.08,7.88,8,18.39,11.11,32.4,9.64,43.07-3.82,114-10.14,142.91a.6.6,0,0,0,1.15.3c23.15-65.91,53.71-83.73,53.71-83.73s11.64-9.77,22.07-8.33,11.39,17.37,11.39,17.41c1.91,20.35-14.37,50.35-27,58.21a.58.58,0,0,0,.48,1C120.31,182,170.75,136.53,142.74,91.25Z"

  return (
    <div className="text-center">
      <svg
        className={styles.icon}
        fill="none"
        strokeWidth="4"
        height="200"
        width="175"
        viewBox="-30 0 210 180"
      >
        <motion.path
          d={path}
          initial={{ pathLength: 1, pathOffset: 0 }}
          animate={{ pathLength: 0, pathOffset: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.25, repeatType: "reverse" }}
        />
      </svg>
      <div className="m-auto flex items-center justify-center space-x-2">
        <p className="text-xl text-gray-400 pt-4">Loading...</p>
      </div>
    </div>
  )
}