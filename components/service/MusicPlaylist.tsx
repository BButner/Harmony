import React, { FunctionComponent, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import { fetchPlaylist } from '../../libs/fetcher/serviceFetcher'
import MusicPlaylistError from './MusicPlaylistError'
import { UnifiedPlaylistData } from '../../models/service/common/ModelCommonPlaylist'
import Pagination from './Pagination'
import MusicSongTable from './MusicSongTable'
import MusicPlaylistTableFull from './MusicPlaylistTableFull'
import MusicPlaylistTableSlim from './MusicPlaylistTableSlim'

interface MusicPlaylistProps {
  service: string;
}

const MusicPlaylist: FunctionComponent<MusicPlaylistProps> = ({ service }) => {
  const { data, error } = useSWR(`/service/${service}`, fetchPlaylist, {
    shouldRetryOnError: false,
    revalidateOnFocus: false
  })
  const PER_PAGE = 10

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentPlaylists, setCurrentPlaylists] = useState<UnifiedPlaylistData[]>([])
  const [selectedPlaylist, setSelectedPlaylist] = useState<UnifiedPlaylistData>(null)
  const paginate = (page: number): void => {
    setCurrentPlaylists(data.slice((page * PER_PAGE) - PER_PAGE, page * PER_PAGE))
    setCurrentPage(page)
  }
  let pageCount = 0

  useEffect(() => {
    if (data && currentPlaylists.length === 0) {
      setCurrentPlaylists(data.slice(0, PER_PAGE))
    }
  })

  if (!data) return (<p>Loading...</p>)
  if (error) return (<p>bruh</p>)

  if (data) {
    pageCount = Math.ceil(data.length / PER_PAGE)
  }

  return (
    <div className="w-3/5">
      {data[0].error.status === 999 &&
        <div className="flex justify-between">
          {selectedPlaylist === null && <MusicPlaylistTableFull
            service={service} currentPlaylists={currentPlaylists}
            selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist}
            pageCount={pageCount} currentPage={currentPage} paginate={paginate}/>}
          {selectedPlaylist && <MusicPlaylistTableSlim
            service={service} currentPlaylists={currentPlaylists}
            selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist}
            pageCount={pageCount} currentPage={currentPage} paginate={paginate}/>}
          {selectedPlaylist && <MusicSongTable songs={selectedPlaylist.songs} playlistId={selectedPlaylist.id}
            setSelectedPlaylist={setSelectedPlaylist}/>}
        </div>}
      {data[0].error.status !== 999 && <MusicPlaylistError service={service}/>}
    </div>
  )
}

MusicPlaylist.propTypes = {
  service: PropTypes.string.isRequired
}

export default MusicPlaylist
