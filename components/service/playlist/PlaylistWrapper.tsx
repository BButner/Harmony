import { motion } from 'framer-motion'
import { PlaylistContext } from 'lib/services/PlaylistContext'
import { Playlist } from 'models/service/ModelService'
import { FunctionComponent, useContext } from 'react'

type PlaylistWrapperProps = {
  playlist: Playlist;
  variants: any;
}

export const PlaylistWrapper: FunctionComponent<PlaylistWrapperProps> = ({ playlist, variants }) => {
  const context = useContext(PlaylistContext)
  return (
    <motion.li
      className="md:rounded-2xl shadow-2xl w-full h-24 md:w-56 md:h-56 md:m-4 overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url(${playlist.imageHref})`,
        backgroundSize: 'cover'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
      key={playlist.id}
      onClick={(): void => context.setSelectedPlaylist(playlist)}
    >
      <div
        className="w-full h-full hidden md:flex items-end"
        style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 70%) 10%, #ffffff15 100%' }}
      >
        <div className="text-white p-4">
          <p className="text-2xl">{playlist.name}</p>
        </div>
      </div>
      <div className="md:hidden relative flex items-center justify-center h-full">
        <div className="w-full h-full absolute bg-gray-800 opacity-60" />
        <div className="text-white p-4 relative">
          <p className="text-2xl">{playlist.name}</p>
        </div>
      </div>
    </motion.li>
  )
}