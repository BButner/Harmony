import { NavigationContext } from 'lib/navigation/NavigationContext'
import { clearSelectedSongs } from 'lib/services/generic/playlistcontrols/SongControls'
import { PlaylistConsumer, PlaylistContext } from 'lib/services/PlaylistContext'
import { FunctionComponent, useContext } from 'react'

export const PlaylistSongControls: FunctionComponent = () => {
  const navContext = useContext(NavigationContext)

  return (
    <PlaylistConsumer>
      {({ setSelectedSongs }) => (
        <div className="space-y-2 text-center">
          <p>Songs</p>
          <button
            className="block button-red"
            onClick={(): void => clearSelectedSongs(navContext.currentService, setSelectedSongs)}
          >Clear Selected Songs</button>
        </div>
      )}
    </PlaylistConsumer>
  )
}