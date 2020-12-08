import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'
import CardGeneric from 'components/generic/card/CardGeneric'
import Closable from 'components/generic/Closable'
import Pagination from 'components/generic/pagination/Pagination'
import { fetchPlaylistsSongs } from 'lib/fetcher/service/FetchPlaylistSongs'
import { ModelUnifiedPlaylist } from 'models/service/ModelServicePlaylist'
import { ModelUnifiedSong } from 'models/service/ModelServiceSong'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import useSWR from 'swr'
import styles from './servicesongdisplay.module.scss'

type ServiceSongDisplayProps = {
  playlist: ModelUnifiedPlaylist;
  visible: boolean;
  setVisible: Function;
}

const ServiceSongDisplay: FunctionComponent<ServiceSongDisplayProps> = ({ visible, setVisible, playlist }) => {
  const DEFAULT_PER_PAGE = 12
  const MOBILE_PER_PAGE = 8
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE)
  const SIZE = 60
  const { data: dataSongs, error  } = useSWR<ModelUnifiedSong[], any>(`/service/spotify/playlists/${playlist.id}/songs`, url => fetchPlaylistsSongs(playlist.id))
  const [currentSongs, setCurrentSongs] = useState<ModelUnifiedSong[]>([])

  const handleResize = (): void => {
    if (window.innerWidth < 640) {
      setPerPage(MOBILE_PER_PAGE)
    } else {
      setPerPage(DEFAULT_PER_PAGE)
    }
  }

  useEffect((): void => {
    handleResize()
    window.addEventListener('resize', handleResize)

    function cleanup () {
      window.removeEventListener('resize', handleResize)
    }
  })

  if (!dataSongs) return (<p>loading...</p>)

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden space-y-2 md:space-y-0 md:flex md:justify-center md:items-start md:space-x-4 p-2">
      <CardGeneric className="w-full md:w-96 text-center md:max-w-96 space-y-2 appear">
        <h1 className="text-xl">{playlist.name}</h1>
        <p className="text-color-alt text-sm pb-4">{playlist.description}</p>
        <Icon className="m-auto text-spotify-500" path={mdiSpotify} size={4} />
        <div className="pt-2 flex justify-around flex-wrap">
          <a href={playlist.uri} className="mt-2"><button className="w-28">View</button></a>
          <button className="button-blue w-28 mt-2">Transfer</button>
          <button className="button-blue w-28 mt-2">Share</button>
          <button className="button-red w-28 mt-2">Delete</button>
        </div>
      </CardGeneric>
      <Closable closeFunction={setVisible} />
      <div className="w-full md:w-2/5">
        <Pagination className="w-2/5 space-y-2" minHeight={(SIZE + 8) * perPage} schemaFilter={['name', 'artist.name']} allValues={dataSongs} setCurrentValues={setCurrentSongs} perPage={perPage} searchPrefix='Song' noFlex>
          {currentSongs.map((song, index) => {
            return (
              <CSSTransition key={`${song.id}:${index}`} timeout={275} classNames="fade-slide-left">
                <CardGeneric noPadding className={`overflow-hidden flex ${styles['song-card']} w-full whitespace-nowrap`} noFill>
                  <img src={song.album.imageHref} width={SIZE} height={SIZE} />
                  <div className="flex items-center bg-main-200 w-full p-2">
                    <div>
                      <p>{song.name}</p>
                      <p className="text-sm text-color-alt overflow-hidden max-w-full mr-2">
                        {song.artists.map(artist => artist.name).join(', ')} - {(song.album.name.length > 50 ? song.album.name.substr(0, 50).trim() + '...' : song.album.name)}
                      </p>
                    </div>
                  </div>
                </CardGeneric>
              </CSSTransition>
            )
          })}
        </Pagination>
      </div>
    </div>
  )
}

export default ServiceSongDisplay