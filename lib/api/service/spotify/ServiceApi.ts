import { Playlist, Song } from "models/service/ModelService"
import { useQuery } from "react-query"
import { fetchSpotifyPlaylists, fetchSpotifyPlaylistSongs } from "./SpotifyFetcher"
import { SpotifyPlaylists } from './SpotifyFetcher'

export default class ServiceApi {
  public loadPlaylists = (service: string) => {
    return useQuery<Playlist[], Error>(
      `/service/${service}`,
      this[`get${this.uppercaseService(service)}Playlists`],
      {
        retryOnMount: false,
        refetchOnMount: false,
        retry: false
      }
    )
  }

  public loadSongsByPlaylistId = (playlistId: string) => {
    return useQuery<Song[], Error>(
      [`/service/spotify/playlist/${playlistId}`, playlistId],
      () => this[`getSpotifyPlaylistSongs`](playlistId)
    )
  }

  private getSpotifyPlaylists = (): Promise<Playlist[]> => {
    return fetchSpotifyPlaylists()
  }

  private getSpotifyPlaylistSongs = (playlistId: string): Promise<Song[]> => {
    return fetchSpotifyPlaylistSongs(playlistId)
  }

  private uppercaseService = (serviceId: string): string => {
    return serviceId.charAt(0).toUpperCase() + serviceId.slice(1)
  }
}