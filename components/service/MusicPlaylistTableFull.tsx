import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { getServiceNameFromId } from '../../lang/LangService'
import CardGenericSlim from '../cards/CardGenericSlim'
import { UnifiedPlaylistData } from '../../models/service/common/ModelCommonPlaylist'
import Icon from '@mdi/react'
import { mdiOpenInApp } from '@mdi/js'
import Pagination from './Pagination'

interface MusicPlaylistTableFullProps {
  service: string;
  currentPlaylists: UnifiedPlaylistData[];
  selectedPlaylist: UnifiedPlaylistData;
  setSelectedPlaylist: Function;
  pageCount: number;
  currentPage: number;
  paginate: Function;
}

const MusicPlaylistTableFull: FunctionComponent<MusicPlaylistTableFullProps> = ({ service, currentPlaylists, selectedPlaylist, setSelectedPlaylist, pageCount, currentPage, paginate }) => {
  const DESC_LENGTH = 64

  return (
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
          {currentPlaylists.map(playlist => {
            return <div style={{
              gridColumnStart: 1,
              gridColumnEnd: 5,
              gridTemplateColumns: '25% 50% 12.5% 12.5%',
              gridTemplateRows: '1'
            }}
            key={playlist.id}
            className={`animated cursor-pointer grid playlistGridRow ${selectedPlaylist && selectedPlaylist.id === playlist.id ? 'playlistGridRowSelected' : ''}`}
            onClick={(): void => setSelectedPlaylist(playlist)}>
              <p style={{ gridColumnStart: 1, gridColumnEnd: 2 }} className="pl-2">{playlist.name}</p>
              <p style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
                <i className="text-sm playlist-description">
                  {playlist.description.substring(0, DESC_LENGTH) + (playlist.description.length > DESC_LENGTH ? '...' : '')}
                </i>
              </p>
              <p style={{ gridColumnStart: 3, gridColumnEnd: 4 }} className="m-auto">{playlist.songCount}</p>
              <p style={{ gridColumnStart: 4, gridColumnEnd: 5 }}>
                <a href={playlist.uri} className="w-full text-center text-purple-500 hover:text-purple-700 animated">
                  <Icon className="m-auto aniamted" path={mdiOpenInApp} size={1}/>
                </a>
              </p>
            </div>
          })}
        </div>
      </CardGenericSlim>
      <div>
        <Pagination count={pageCount} active={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

MusicPlaylistTableFull.propTypes = {
  service: PropTypes.string.isRequired,
  currentPlaylists: PropTypes.arrayOf(PropTypes.instanceOf(UnifiedPlaylistData)).isRequired,
  selectedPlaylist: PropTypes.instanceOf(UnifiedPlaylistData).isRequired,
  setSelectedPlaylist: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
}

export default MusicPlaylistTableFull
