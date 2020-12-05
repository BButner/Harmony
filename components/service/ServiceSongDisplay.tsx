import CardGeneric from 'components/generic/card/CardGeneric'
import Closable from 'components/generic/Closable'
import Pagination from 'components/generic/pagination/Pagination'
import { fetchPlaylistsSongs } from 'lib/fetcher/service/FetchPlaylistSongs'
import { ModelUnifiedPlaylist } from 'models/service/ModelServicePlaylist'
import { ModelUnifiedSong } from 'models/service/ModelServiceSong'
import React, { FunctionComponent, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useSWR from 'swr'
import styles from './servicesongdisplay.module.scss'

type ServiceSongDisplayProps = {
  playlist: ModelUnifiedPlaylist;
  visible: boolean;
  setVisible: Function;
}

const ServiceSongDisplay: FunctionComponent<ServiceSongDisplayProps> = ({ visible, setVisible, playlist }) => {
  const PER_PAGE: number = 10
  const SIZE = 75
  const { data: dataSongs, error  } = useSWR<ModelUnifiedSong[], any>(`/service/spotify/playlists/${playlist.id}/songs`, url => fetchPlaylistsSongs(playlist.id))
  const [currentSongs, setCurrentSongs] = useState<ModelUnifiedSong[]>([])

  if (!dataSongs) return (<p>loading...</p>)

  return (
    <div className="w-screen flex justify-center items-start">
      <CardGeneric className="w-96 text-center max-w-96 space-y-2">
        <h1 className="text-xl">{playlist.name}</h1>
        <p className="text-color-alt text-sm">{playlist.description}</p>
      </CardGeneric>
      <Closable closeFunction={setVisible} />
      <Pagination minHeight={(SIZE + 8) * PER_PAGE} schemaFilter={['name', 'artist.name']} allValues={dataSongs} setCurrentValues={setCurrentSongs} perPage={PER_PAGE} searchPrefix='Song' noFlex>
        {currentSongs.map(song => {
          return (
            <CSSTransition key={song.id} timeout={275} classNames="fade-slide">
              <CardGeneric noPadding className={`overflow-hidden flex w-2/5 ${styles['song-card']} m-auto`}>
                <img src={song.album.imageHref} width={75} height={75} />
                <div className="flex justify-between items-center">
                  <div className="pl-2 pr-2">
                    <p>{song.name}</p>
                    <p className="text-sm text-color-alt">
                      {song.artists.map(artist => artist.name).join(', ')} - {(song.album.name.length > 50 ? song.album.name.substr(0, 50).trim() + '...' : song.album.name)}
                    </p>
                  </div>
                  <div></div>
                </div>
              </CardGeneric>
            </CSSTransition>
          )
        })}
      </Pagination>
    </div>
  )
}

export default ServiceSongDisplay