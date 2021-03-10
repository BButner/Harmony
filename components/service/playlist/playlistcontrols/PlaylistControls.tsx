import Icon from '@mdi/react'
import { motion } from 'framer-motion'
import { FunctionComponent, useContext, useState } from 'react'
import { mdiChevronDoubleLeft } from '@mdi/js'
import { PlaylistContext } from 'lib/services/PlaylistContext'
import { PlaylistSongControls } from './PlaylistSongControls'

export const PlaylistControls: FunctionComponent= () => {
  const variants = {
    hidden: { x: '100%', y: '-50%' },
    visible: { x: 0, y: '-50%' }
  }

  const svgVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 180 }
  }

  const songCountVariants = {
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.1 } },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.1 } }
  }

  const context = useContext(PlaylistContext)

  const [controlsVisible, setControlsVisible] = useState<boolean>(false)

  return (
    <motion.div
      className="fixed right-0 flex items-center top-1/2 transform -translate-y-1/2"
      variants={variants}
      initial="hidden"
      animate={controlsVisible ? 'visible' : ''}
    >
      <motion.div
        className="w-6 h-32 bg-purple-500 text-white rounded-l-lg cursor-pointer flex items-center justify-center absolute right-full"
        whileHover={{ width: 32 }}
        onClick={(): void => setControlsVisible(!controlsVisible)}
      >
        {/* Red Circle for Song Count */}
        <motion.div
          className="absolute -top-3 -left-3 bg-red-500 rounded-xl p-1 text-xs text-center"
          style={{ minWidth: '24px' }}
          variants={songCountVariants}
          initial="hidden"
          animate={context.selectedSongs.length > 0 ? 'visible' : ''}
        >
            {context.selectedSongs.length}
        </motion.div>

        {/* SVG Wrapper */}
        <motion.div
          variants={svgVariants}
          initial="hidden"
          animate={controlsVisible ? 'visible' : ''}
          className="flex items-center justify-center w-full h-full"
        >
          <Icon path={mdiChevronDoubleLeft} />
        </motion.div>
      </motion.div>
      <div className="absolute w-10 bg-white left-full h-full border-t border-b border-gray-400"></div>
      <motion.div
        className="rounded-l-xl p-2 bg-white shadow-xl flex space-x-4 border-t border-l border-b border-gray-400"
      >
        <PlaylistSongControls />
      </motion.div>
    </motion.div>
  )
}