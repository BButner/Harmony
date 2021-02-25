import { AnimatePresence, motion } from 'framer-motion'
import { FunctionComponent } from 'react'
import styles from './BackgroundBlur.module.scss'

type BackgroundBlurProps = {
  visible: boolean;
}

export const BackgroundBlur: FunctionComponent<BackgroundBlurProps> = ({ children, visible }) => {
  const blurVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25
      }
    },
    exit: {
      opacity: 0
    }
  }

  return (
    <AnimatePresence>
      {visible && <motion.ul className={styles.blur} initial="hidden" animate="visible" variants={blurVariants} exit="exit">
        {children}
      </motion.ul>}
    </AnimatePresence>
  )
}