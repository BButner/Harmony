import { LoadingIcon } from 'components/misc/LoadingIcon'
import { motion } from 'framer-motion'
import HarmonyApi from 'lib/api/HarmonyApi'
import { Playlist } from 'models/service/ModelService'
import { FunctionComponent } from 'react'

type PlaylistSongWrapperProps = {
  selectedPlaylist: Playlist;
  harmonyApi: HarmonyApi;
}

export const PlaylistSongWrapper: FunctionComponent<PlaylistSongWrapperProps> = ({ selectedPlaylist, harmonyApi }) => {
  const songs = harmonyApi.serviceApi.loadSongsByPlaylistId(selectedPlaylist.id)
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.01
      }
    }
  }

  if (songs.isError || songs.isLoading) {
    return <div className="h-screen flex items-center justify-center" style={{ width: 'calc(100% - 320px)' }}><LoadingIcon /></div>
  } else if (songs.data) {
    return (
      <motion.ul
        className="max-h-screen overflow-y-auto flex flex-wrap overflow-x-hidden justify-around items-start"
        style={{
          width: 'calc(100% - 320px)'
        }}
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <motion.li className="w-full m-4 rounded-xl overflow-hidden flex items-center bg-gray-200 space-x-4">
          <img src={selectedPlaylist.imageHref} className="h-32 w-32" />
          <div className="space-y-2">
            <p className="text-3xl">{selectedPlaylist.name}</p>
            <p>{selectedPlaylist.description}</p>
            <p className="text-sm text-gray-600">{songs.data.length} Songs</p>
          </div>
        </motion.li>
        {songs.data.map((song, index) => {
          return (
            <motion.li
              className="h-20 w-96 bg-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex items-center"
              variants={variants}
              key={selectedPlaylist.id + song.id + index}
            >
              <img className="w-20 h-20" src={song.album.imageHref} />
              <div
                className="space-y-1 text-gray-900 m-2 overflow-hidden max-w-full"
                style={{
                  textOverflow: 'ellipsis'
                }}
              >
                <p className="whitespace-nowrap">{song.name}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{song.artists.map(artist => artist.name).join(', ')}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{song.album.name}</p>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    )
  }
}