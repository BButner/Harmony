import React, { FunctionComponent, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import { fetchPlaylist } from '../../libs/fetcher/serviceFetcher'
import MusicPlaylistError from './MusicPlaylistError'
import { UnifiedPlaylistData } from '../../models/service/common/ModelCommonPlaylist'
import CardGenericSlim from '../cards/CardGenericSlim'
import Icon from '@mdi/react'
import { mdiOpenInApp, mdiArrowRight, mdiArrowLeft } from '@mdi/js'
import { getServiceNameFromId } from '../../lang/LangService'
import Pagination from './Pagination'

interface MusicPlaylistProps {
  service: string;
}

const MusicPlaylist: FunctionComponent<MusicPlaylistProps> = ({ service }) => {
  const { data, error } = useSWR(`/service/${service}`, fetchPlaylist, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  })
  const DESC_LENGTH = 64
  const PER_PAGE = 10

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentPlaylists, setCurrentPlaylists] = useState<UnifiedPlaylistData[]>([])
  const paginate = (page: number): void => {
    setCurrentPlaylists(data.slice((page * PER_PAGE) - PER_PAGE, page * PER_PAGE))
    setCurrentPage(page)
  }
  let pageCount = 0

  useEffect(() => {
    if (data && currentPlaylists.length === 0) {
      setCurrentPlaylists(data.slice(0, 10))
    }
  })

  if (!data) return (<p>Loading...</p>)
  if (error) return (<p>bruh</p>)

  if (data) {
    pageCount = Math.ceil(data.length / 10)
  }

  return (
    <div className="w-3/5">
      {data[0].error.status === 999 &&
        <div>
          <CardGenericSlim title={getServiceNameFromId(service) + ' Playlists'} className="playlistCard w-full p1-2 pb-2">
            <div className={`playlistTable border-${service}-500`}>
              {['Name', 'Description', 'Song Count', 'Link'].map((header, index) => {
                return (
                  <div key={header} style={{
                    gridColumnStart: index + 1,
                    gridColumnEnd: index + 2,
                    gridRowStart: 1,
                    gridRowEnd: 2
                  }} className={`${index === 0 ? 'pl-2' : ''} ${[2, 3].includes(index) ? 'm-auto' : ''} flex`}>
                    <p className="flex justify-left align-center"><b className="m-auto">{header}</b></p>
                  </div>
                )
              })}
              {currentPlaylists.map((playlist, index) => {
                return <div style={{
                  gridColumnStart: 1,
                  gridColumnEnd: 5,
                  gridTemplateColumns: '25% 50% 12.5% 12.5%',
                  gridTemplateRows: '1'
                }}
                key={playlist.id}
                className="animated cursor-pointer grid playlistGridRow">
                  <p style={{ gridColumnStart: 1, gridColumnEnd: 2 }} className="pl-2">{playlist.name}</p>
                  <p style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
                    <i className="text-sm playlist-description">
                      {playlist.description.substring(0, DESC_LENGTH) + (playlist.description.length > DESC_LENGTH ? '...' : '')}
                    </i>
                  </p>
                  <p style={{ gridColumnStart: 3, gridColumnEnd: 4 }} className="m-auto">{playlist.songCount}</p>
                  <p style={{ gridColumnStart: 4, gridColumnEnd: 5 }}>
                    <a href={playlist.uri} className="w-full text-center text-purple-500 hover:text-purple-700 animated">
                      <Icon className="m-auto" path={mdiOpenInApp} size={1}/>
                    </a>
                  </p>
                </div>
              })}
            </div>
          </CardGenericSlim>
          <div className="bg-red">
            <Pagination count={pageCount} active={currentPage} paginate={paginate}/>
          </div>
        </div>}
      {data[0].error.status !== 999 && <MusicPlaylistError service={service}/>}
    </div>
  )
}

MusicPlaylist.propTypes = {
  service: PropTypes.string.isRequired
}

export default MusicPlaylist
