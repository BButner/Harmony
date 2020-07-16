import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { UnifiedPlaylistData } from '../../models/service/common/ModelCommonPlaylist'
import CardGenericSlim from '../cards/CardGenericSlim'
import { getServiceNameFromId } from '../../lang/LangService'
import Pagination from './Pagination'

interface MusicPlaylistTableSlimProps {
  service: string;
  currentPlaylists: UnifiedPlaylistData[];
  selectedPlaylist: UnifiedPlaylistData;
  setSelectedPlaylist: Function;
  pageCount: number;
  currentPage: number;
  paginate: Function;
}

const MusicPlaylistTableSlim: FunctionComponent<MusicPlaylistTableSlimProps> = ({ service, currentPlaylists, selectedPlaylist, setSelectedPlaylist, pageCount, currentPage, paginate }) => {
  return (
    <div className="w-1/5">
      <CardGenericSlim title={getServiceNameFromId(service) + ' Playlists'} className="w-full p1-2 pb-2">
        <div className="playlistTable" style={{ width: 'auto' }}>
          <div className="flex justify-center w-full" style={{
            gridColumnStart: 1,
            gridColumnEnd: 5
          }}>
            <p className="flex justify-center align-center"><b className="">Name</b></p>
          </div>
          {currentPlaylists.map(playlist => {
            return <div style={{
              gridColumnStart: 1,
              gridColumnEnd: 5
            }} key={playlist.id}
            className={`playlistGridRow animated cursor-pointer text-center 
            flex justify-center align-center ${selectedPlaylist.id === playlist.id ? 'playlistGridRowSelected' : ''}`}
            onClick={(): void => setSelectedPlaylist(playlist)}>
              <p>{playlist.name}</p>
            </div>
          })}
        </div>
      </CardGenericSlim>
      <div className="mt-4">
        <Pagination count={pageCount} active={currentPage} paginate={paginate}/>
      </div>
    </div>
  )
}

MusicPlaylistTableSlim.propTypes = {
  service: PropTypes.string.isRequired,
  currentPlaylists: PropTypes.arrayOf(PropTypes.instanceOf(UnifiedPlaylistData)).isRequired,
  selectedPlaylist: PropTypes.instanceOf(UnifiedPlaylistData).isRequired,
  setSelectedPlaylist: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
}

export default MusicPlaylistTableSlim
