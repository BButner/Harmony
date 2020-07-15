import React, { FunctionComponent, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Song } from '../../models/service/common/ModelCommonGeneric'
import CardGenericSlim from '../cards/CardGenericSlim'
import Pagination from './Pagination'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

interface MusicSongTableProps {
  songs: Song[];
  playlistId: string;
  setSelectedPlaylist: Function;
}

const MusicSongTable: FunctionComponent<MusicSongTableProps> = ({ songs, playlistId, setSelectedPlaylist }) => {
  console.log(songs)
  const PER_PAGE = 10
  const PAGE_COUNT = Math.ceil(songs.length / PER_PAGE)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [currentSongs, setCurrentSongs] = useState<Song[]>([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string>('')

  const paginate = (page: number): void => {
    setCurrentSongs(songs.slice((page * PER_PAGE) - PER_PAGE, page * PER_PAGE))
    setCurrentPage(page)
  }

  useEffect(() => {
    if (currentPlaylistId === '') {
      setCurrentSongs(songs.slice(0, PER_PAGE))
      setCurrentPlaylistId(playlistId)
    } else if (currentPlaylistId !== playlistId) {
      setCurrentSongs(songs.slice(0, PER_PAGE))
      setCurrentPlaylistId(playlistId)
    }
  })

  return (
    <div className="w-3/4">
      <CardGenericSlim title={'Songs'} className="playlistCard w-full pb-2 relative">
        <div className="absolute top-0 right-0 m-auto cursor-pointer"
          onClick={(): void => setSelectedPlaylist(null)}><Icon
            className="text-shadow
            hover:text-red-500 animated mb-10 text-bluegrey-300 animated"
            path={mdiClose} size={1}/></div>
        <div className="songTable">
          {['Name', 'Artist', 'Album'].map((header, index) => {
            return (
              <div key={header} style={{
                gridColumnStart: index + 1,
                gridColumnEnd: index + 2,
                gridRowStart: 1,
                gridRowEnd: 2
              }} className={`${index === 0 ? 'pl-2' : ''} flex`}>
                <p className="flex justify-left align-center"><b className="m-auto">{header}</b></p>
              </div>
            )
          })}
          {currentSongs.map((song, index) => {
            return <div style={{
              gridColumnStart: 1,
              gridColumnEnd: 4,
              gridTemplateColumns: '30% 30% 40%',
              gridTemplateRows: '1'
            }}
            key={song.id + index}
            className="songGridRow grid text-xs">
              <p style={{ gridColumnStart: 1, gridColumnEnd: 2 }} className="pl-2">{song.name}</p>
              <p style={{ gridColumnStart: 2, gridColumnEnd: 3 }}><i>{song.artists.map(artist => artist.name).join(', ')}</i></p>
              <p style={{ gridColumnStart: 3, gridColumnEnd: 4 }}>{song.album.name}</p>
            </div>
          })}
        </div>
      </CardGenericSlim>
      <Pagination count={PAGE_COUNT} active={currentPage} paginate={paginate}/>
    </div>
  )
}

MusicSongTable.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.instanceOf(Song)).isRequired,
  playlistId: PropTypes.string.isRequired,
  setSelectedPlaylist: PropTypes.func.isRequired
}

export default MusicSongTable
