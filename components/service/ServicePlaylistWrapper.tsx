import HarmonyApi from 'lib/api/HarmonyApi'
import { FunctionComponent } from 'react'
import dynamic from 'next/dynamic'
import { PlaylistWrapper } from './playlist/PlaylistWrapper'

type ServicePlaylistWrapperProps = {
  service: 'spotify' | 'pandora' | 'youtube' | 'apple';
}

export const ServicePlaylistWrapper: FunctionComponent<ServicePlaylistWrapperProps> = ({ service }) => {
  const playlists = new HarmonyApi().serviceApi.loadPlaylists(service)
  const SpotifyHandler = dynamic(() => import('./spotify/SpotifyHandler').then(h => h.SpotifyHandler))

  return (
    <div className="w-full h-full flex flex-wrap">
      {service === 'spotify' && <SpotifyHandler playlistData={playlists} />}
      {playlists.data && playlists.data.map(playlist => <PlaylistWrapper playlist={playlist} />)}
    </div>
  )
}