import { Playlist, Song } from 'models/service/ModelService'
import React from 'react'

type PlaylistContextProps = {
  selectedPlaylist: Playlist;
  selectedSongs: Song[];
  setSelectedPlaylist: Function;
  setSelectedSongs: Function;
}

export const PlaylistContext = React.createContext<Partial<PlaylistContextProps>>({})

export const PlaylistProvider = PlaylistContext.Provider