import { AnimatePresence } from 'framer-motion'
import { PlaylistConsumer, PlaylistContext } from 'lib/services/PlaylistContext'
import { FunctionComponent } from 'react'
import { PlaylistSongWrapper } from './PlaylistSongWrapper'
import { SelectedPlaylistList } from './SelectedPlaylistList'

type SelectedPlaylistDisplayProps = {
  harmonyApi: any;
}

export const SelectedPlaylistDisplay: FunctionComponent<SelectedPlaylistDisplayProps> = ({ harmonyApi }) => {
  return (
    <PlaylistConsumer>
      {({ selectedPlaylist, playlists }) => (
        <AnimatePresence>
          {selectedPlaylist && 
            <div className="flex max-w-full w-full">
              <SelectedPlaylistList
                playlists={playlists.data}
              />
              <PlaylistSongWrapper
                harmonyApi={harmonyApi}
              />
            </div>
          }
        </AnimatePresence>
      )}
    </PlaylistConsumer>
  )
}