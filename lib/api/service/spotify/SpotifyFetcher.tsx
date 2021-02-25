import { Playlist } from "models/service/ModelService"
import { ENDPOINT_SPOTIFY_PLAYLISTS, ENDPOINT_SPOTIFY_TOKEN } from "../../Endpoints"

export interface SpotifyPlaylists {
  authed: boolean;
  playlists?: Playlist[];
}

export const fetchSpotifyPlaylists = (): Promise<Playlist[]> => {
  return fetch(ENDPOINT_SPOTIFY_PLAYLISTS, {
    credentials: 'include'
  })
    .then(resp => {
      if (resp.ok) return resp.json()
      else throw("")
    })
    .then(playlistData => {
      return playlistData
    })
    .catch(err => {
      throw(err)
    })
}

export const storeSpotifyToken = (spotifyCode: string): Promise<boolean> => {
  return fetch(ENDPOINT_SPOTIFY_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ token: spotifyCode })
  })
    .then(resp => resp.ok)
    .catch(err => false)
}