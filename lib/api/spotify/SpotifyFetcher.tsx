import { Playlist } from "models/service/ModelService"
import { ENDPOINT_SPOTIFY_PLAYLISTS, ENDPOINT_SPOTIFY_TOKEN } from "../Endpoints"

interface SpotifyPlaylists {
  authed: boolean;
  playlistData?: Playlist[];
}

export const fetchSpotifyPlaylists = (): Promise<SpotifyPlaylists> => {
  return fetch(ENDPOINT_SPOTIFY_PLAYLISTS, {
    credentials: 'include'
  })
    .then(resp => {
      if (resp.ok) return resp.json()
      else return { authed: false, playlistData: null }
    })
    .then(playlistData => {
      return { authed: true, playlistData }
    })
    .catch(err => {
      return { authed: true, playlistData: null }
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