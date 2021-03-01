import { motion } from 'framer-motion'
import { Playlist } from 'models/service/ModelService'
import { FunctionComponent } from 'react'

type PlaylistWrapperProps = {
  playlist: Playlist;
  variants: any;
  setSelectedPlaylist: Function;
}

export const PlaylistWrapper: FunctionComponent<PlaylistWrapperProps> = ({ playlist, variants, setSelectedPlaylist }) => {
  return (
    <motion.li
      className="rounded-2xl shadow-2xl w-56 h-56 m-4 overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `url(${playlist.imageHref})`,
        backgroundSize: 'cover'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
      key={playlist.id}
      onClick={(): void => setSelectedPlaylist(playlist)}
    >
      <div
        className="w-full h-full flex items-end"
        style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 70%) 10%, #ffffff15 100%' }}
      >
        <div className="text-white p-4">
          <p className="text-2xl">{playlist.name}</p>
        </div>
      </div>
    </motion.li>
  )
}