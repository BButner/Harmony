import { motion } from 'framer-motion'
import { Playlist } from 'models/service/ModelService'
import { FunctionComponent } from 'react'

type PlaylistWrapperProps = {
  playlist: Playlist;
}

export const PlaylistWrapper: FunctionComponent<PlaylistWrapperProps> = ({ playlist }) => {
  return (
    <motion.div
      className="rounded-2xl shadow-2xl w-56 h-56 m-4 overflow-hidden"
      style={{
        backgroundImage: `url(${playlist.imageHref})`,
        backgroundSize: 'cover'
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="w-full h-full flex items-end"
        style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 70%) 10%, #ffffff15 100%' }}
      >
        <div className="text-white p-4">
          <p className="text-2xl">{playlist.name}</p>
        </div>
      </div>
    </motion.div>
  )
}