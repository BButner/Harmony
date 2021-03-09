import Icon from '@mdi/react'
import { motion } from 'framer-motion'
import { FunctionComponent, useContext, useState } from 'react'
import { mdiChevronDoubleLeft } from '@mdi/js'
import { PlaylistContext } from 'lib/services/PlaylistContext'

export const PlaylistControls: FunctionComponent= () => {
  const variants = {
    hidden: { x: '100%', y: '-50%' },
    visible: { x: 0, y: '-50%' }
  }

  const svgVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 180 }
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
        <div className="absolute -top-3 -left-3 bg-red-500 rounded-xl p-1 text-xs text-center" style={{ minWidth: '24px' }}>{context.selectedSongs.length}</div>
        <motion.div
          variants={svgVariants}
          initial="hidden"
          animate={controlsVisible ? 'visible' : ''}
          className="flex items-center justify-center w-full h-full"
        >
          <Icon path={mdiChevronDoubleLeft} />
        </motion.div>
      </motion.div>
      <div className="absolute w-10 bg-white left-full h-full"></div>
      <motion.div
        className="rounded-l-xl p-2 bg-white shadow-xl flex space-x-4 border-t border-l border-b border-gray-400"
      >
        <div className="space-y-2 text-center">
          <p>Songs</p>
          <button className="block w-full button-blue">Select All Songs</button>
          <button className="button-red">Deselect All Songs</button>
        </div>
        <div className="space-y-2 text-center">
          <p>Playlist</p>
          <button className="block w-full button-blue">Transfer Playlist</button>
          <button className="block button-green w-full">Backup Playlist</button>
          <button className="button-red w-full">Delete Playlist</button>
        </div>
      </motion.div>
    </motion.div>
  )
}