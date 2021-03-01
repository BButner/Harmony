import { motion } from 'framer-motion'
import { Playlist } from 'models/service/ModelService'
import { FunctionComponent } from 'react'

type SelectedPlaylistListProps = {
  playlists: Playlist[];
  selectedPlaylist: Playlist;
  setSelectedPlaylist: Function;
}

export const SelectedPlaylistList: FunctionComponent<SelectedPlaylistListProps> = ({ playlists, selectedPlaylist, setSelectedPlaylist }) => {
  const variants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        ease: 'easeIn'
      }
    }
  }
  return (
    <motion.div
      className="h-screen w-80 overflow-y-scroll overflow-x-hidden bg-gray-200"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {playlists.map(playlist => {
        return (
          <motion.div
            className="w-full h-20 flex items-center cursor-pointer overflow-hidden"
            style={{
              backgroundImage: `url(${playlist.imageHref})`,
              backgroundPosition: 'center'
            }}
            whileHover={{ x: 20 }}
            onClick={(): void => setSelectedPlaylist(playlist)}
            key={playlist.id}
          >
            <div
              className={`w-full h-full flex items-center ${selectedPlaylist.id === playlist.id ? 'bg-purple-500' : ''}`}
              style={
                selectedPlaylist.id === playlist.id ? {} : {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }
            >
              <p className="text-white text-xl pl-4">{playlist.name}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}