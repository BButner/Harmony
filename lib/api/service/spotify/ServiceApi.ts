import { Playlist } from "models/service/ModelService"
import { useQuery } from "react-query"
import { fetchSpotifyPlaylists } from "./SpotifyFetcher"
import { SpotifyPlaylists } from './SpotifyFetcher'

export default class ServiceApi {
  public loadPlaylists = (service: string) => {
    return useQuery<Playlist[], Error>(
      `/service/${service}`,
      this[`get${service.charAt(0).toUpperCase() + service.slice(1)}Playlists`],
      {
        retryOnMount: false,
        refetchOnMount: false,
        retry: false
      }
    )
  }

  private getSpotifyPlaylists = (): Promise<SpotifyPlaylists> => {
    return fetchSpotifyPlaylists()
  }
}