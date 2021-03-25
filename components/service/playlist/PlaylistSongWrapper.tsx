import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import { LoadingIcon } from 'components/misc/LoadingIcon'
import { motion } from 'framer-motion'
import HarmonyApi from 'lib/api/HarmonyApi'
import { Song } from 'models/service/ModelService'
import { FunctionComponent, useContext } from 'react'
import { handleSongSelection, songIsSelected } from 'lib/services/generic/playlistcontrols/SongSelectionHandler'
import styles from './PlaylistSongWrapper.module.scss'
import { PlaylistContext } from 'lib/services/PlaylistContext'
import { NavigationContext } from 'lib/navigation/NavigationContext'

type PlaylistSongWrapperProps = {
  harmonyApi: HarmonyApi;
}

export const PlaylistSongWrapper: FunctionComponent<PlaylistSongWrapperProps> = ({ harmonyApi }) => {
  const context = useContext(PlaylistContext)
  const navContext = useContext(NavigationContext)

  const songs = harmonyApi.serviceApi.loadSongsByPlaylistId(context.selectedPlaylist.id)
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

  const handleSongClick = (song: Song): void => {
    handleSongSelection(song, context.selectedSongs, context.setSelectedSongs, navContext.currentService)
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
        {/* Playlist Header */}
        <motion.li className="w-full relative m-4 rounded-xl overflow-hidden flex items-center bg-gray-200 space-x-4">
          <img src={context.selectedPlaylist.imageHref} className="w-40 h-40" />
          <div className="space-y-2">
            <p className="text-3xl">{context.selectedPlaylist.name}</p>
            <p>{context.selectedPlaylist.description}</p>
            <p className="text-sm text-gray-600">{songs.data.length} Songs</p>
          </div>
          <motion.div className="absolute top-0 right-0 cursor-pointer" onClick={(): void => context.setSelectedPlaylist(null)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.0 }}>
            <Icon className="mt-2 mr-2" path={mdiClose} size={1} />
          </motion.div>
        </motion.li>

        {/* Songs */}
        {songs.data.map((song, index) => {
          return (
            <motion.li
              className={`${styles['song-wrapper']} ${songIsSelected(song, context.selectedSongs) ? styles['song-wrapper-selected'] : ''}`}
              variants={variants}
              key={context.selectedPlaylist.id + song.id + index}
              onClick={(): void => handleSongClick(song)}
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