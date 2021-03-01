import Icon from '@mdi/react'
import { motion } from 'framer-motion'
import { FunctionComponent } from 'react'
import { mdiChevronDoubleLeft } from '@mdi/js'

export const PlaylistControls: FunctionComponent = () => {
  const variants = {
    hidden: { right: '-100%' },
    visible: { right: 0 }
  }
  return (
    <div className="fixed right-0 flex items-center top-1/2 transform -translate-y-1/2">
      <motion.div
        className="w-6 h-32 bg-purple-500 text-white rounded-l-lg cursor-pointer flex items-center justify-center absolute right-full"
        whileHover={{ width: 32 }}
      >
        <Icon path={mdiChevronDoubleLeft} />
      </motion.div>
      <motion.div
        className="w-52 h-52 bg-purple-500 rounded-xl p-1"
      >
        <div className="w-full h-full bg-white rounded-lg"></div>
      </motion.div>
    </div>
  )
}