import { Playlist, Song } from 'models/service/ModelService'
import React from 'react'
import { QueryObserverResult } from 'react-query'

type PlaylistContextProps = {
  selectedPlaylist: Playlist;
  selectedSongs: Song[];
  setSelectedPlaylist: Function;
  setSelectedSongs: Function;
  playlists: QueryObserverResult<Playlist[], Error>;
}

export const PlaylistContext = React.createContext<Partial<PlaylistContextProps>>({})

export const PlaylistProvider = PlaylistContext.Provider

export const PlaylistConsumer = PlaylistContext.Consumer