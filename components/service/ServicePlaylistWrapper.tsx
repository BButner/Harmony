import HarmonyApi from 'lib/api/HarmonyApi'
import { FunctionComponent, useState } from 'react'
import dynamic from 'next/dynamic'
import { PlaylistWrapper } from './playlist/PlaylistWrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { Playlist } from 'models/service/ModelService'
import { SelectedPlaylistList } from './playlist/SelectedPlaylistList'
import { PlaylistSongWrapper } from './playlist/PlaylistSongWrapper'
import { PlaylistControls } from './playlist/PlaylistControls'

type ServicePlaylistWrapperProps = {
  service: 'spotify' | 'pandora' | 'youtube' | 'apple';
}

export const ServicePlaylistWrapper: FunctionComponent<ServicePlaylistWrapperProps> = ({ service }) => {
  const api: HarmonyApi = new HarmonyApi()
  const playlists = api.serviceApi.loadPlaylists(service)
  const SpotifyHandler = dynamic(() => import('./spotify/SpotifyHandler').then(h => h.SpotifyHandler))
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(null)

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-wrap">
      {service === 'spotify' && <SpotifyHandler playlistData={playlists} />}
      {playlists.data && selectedPlaylist === null && <motion.ul
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex list-none flex-wrap justify-between"
      >
        {playlists.data.map(playlist => <PlaylistWrapper key={playlist.id} playlist={playlist} variants={variants} setSelectedPlaylist={setSelectedPlaylist} />)}
      </motion.ul>}
      <AnimatePresence>
        {playlists.data && selectedPlaylist !== null && 
          <div className="flex max-w-full w-full">
            <SelectedPlaylistList
              selectedPlaylist={selectedPlaylist}
              setSelectedPlaylist={setSelectedPlaylist}
              playlists={playlists.data}
            />
            <PlaylistSongWrapper selectedPlaylist={selectedPlaylist} harmonyApi={api} />
          </div>
        }
      </AnimatePresence>
      {/* <PlaylistControls /> */}
    </div>
  )
}