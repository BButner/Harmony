import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import { Song } from '../../models/service/common/ModelCommonGeneric'

interface MusicSongTableProps {
  songs: Song[];
}

const MusicSongTable: FunctionComponent<MusicSongTableProps> = ({ songs }) => {
  return (
    <div>
      {songs.map(song => {
        return <p key={song.id}>{song.name}</p>
      })}
    </div>
  )
}

MusicSongTable.propTypes = {
  songs: PropTypes.any.isRequired
}

export default MusicSongTable
