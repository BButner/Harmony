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
        className="rounded-l-xl p-2 bg-white shadow-xl flex space-x-4 bordernpm  border-gray-400"
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
    </div>
  )
}