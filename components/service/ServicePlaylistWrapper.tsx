import HarmonyApi from 'lib/api/HarmonyApi'
import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { PlaylistWrapper } from './playlist/PlaylistWrapper'
import { motion } from 'framer-motion'
import { Playlist, Song } from 'models/service/ModelService'
import { PlaylistControls } from './playlist/playlistcontrols/PlaylistControls'
import { hydrateFromLocalStorage } from 'lib/services/generic/playlistcontrols/SongSelectionHandler'
import { PlaylistProvider } from 'lib/services/PlaylistContext'
import { SelectedPlaylistDisplay } from './playlist/SelectedPlaylistDisplay'
import { NavigationContext } from 'lib/navigation/NavigationContext'

export const ServicePlaylistWrapper: FunctionComponent = () => {
  const api: HarmonyApi = new HarmonyApi()
  const navContext = useContext(NavigationContext)

  const playlists = api.serviceApi.loadPlaylists(navContext.currentService)
  const SpotifyHandler = dynamic(() => import('./spotify/SpotifyHandler').then(h => h.SpotifyHandler))
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(null)
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([])

  useEffect(() => {
    setSelectedSongs(hydrateFromLocalStorage(setSelectedSongs, navContext.currentService))
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.025
      }
    }
  }

  return (
    <PlaylistProvider value={{
      selectedPlaylist,
      selectedSongs,
      setSelectedSongs,
      setSelectedPlaylist,
      playlists
    }}>
      <div className="w-full h-full lg:flex flex-wrap">
        {navContext.currentService === 'spotify' && <SpotifyHandler playlistData={playlists} />}
        {playlists.data && selectedPlaylist === null && <motion.ul
          variants={variants}
          initial="hidden"
          animate="visible"
          className="lg:flex list-none flex-wrap justify-between"
        >
          {playlists.data.map(playlist => <PlaylistWrapper key={playlist.id} playlist={playlist} variants={variants} />)}
        </motion.ul>}

        {selectedPlaylist && <SelectedPlaylistDisplay harmonyApi={api} />}

        <PlaylistControls />
      </div>
    </PlaylistProvider>
  )
}