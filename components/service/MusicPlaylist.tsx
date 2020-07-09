import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import useSWR from 'swr'
import { fetchPlaylist } from '../../libs/fetcher/serviceFetcher'
import CardGeneric from '../cards/CardGeneric'
import MusicPlaylistError from './MusicPlaylistError'
import { UnifiedPlaylistData } from '../../models/service/common/ModelCommonPlaylist'
import CardGenericSlim from '../cards/CardGenericSlim'
import Icon from '@mdi/react'
import { mdiOpenInApp } from '@mdi/js'
import { getServiceNameFromId } from '../../lang/LangService'

interface MusicPlaylistProps {
  service: string;
}

const MusicPlaylist: FunctionComponent<MusicPlaylistProps> = ({ service }) => {
  const { data, error } = useSWR(`/service/${service}`, fetchPlaylist)
  const DESC_LENGTH = 64

  if (!data) return (<p>Loading...</p>)
  if (error) {
    return (
      <CardGeneric>
        <p>There was an error bro</p>
      </CardGeneric>
    )
  }

  return (
    <div className="">
      {data[0].error.status === 999 &&
        <CardGenericSlim title={getServiceNameFromId(service) + ' Playlists'}>
          <table className="playlist-table" style={{
            borderSpacing: '0'
          }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Song Count</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {data.splice(0, 9).map((playlist: UnifiedPlaylistData) => {
                return <tr key={playlist.id} className="animated">
                  <td>{playlist.name}</td>
                  <td>
                    <i className="text-xs playlist-description relative">
                      {playlist.description.substring(0, DESC_LENGTH) + (playlist.description.length > DESC_LENGTH ? '...' : '')}
                      <div
                        className="playlist-description-tooltip hidden absolute z-50 pt-1 bg-red-500 w-32 animated">
                        {playlist.description}
                      </div>
                    </i>
                  </td>
                  <td>{playlist.songCount}</td>
                  <td className="w-20"><a href={playlist.uri} className="w-full text-center text-purple-500 hover:text-purple-700 animated"><Icon className="m-auto" path={mdiOpenInApp} size={1}/></a></td>
                </tr>
              })}
            </tbody>
          </table>
        </CardGenericSlim>}
      {data[0].error.status !== 999 && <MusicPlaylistError service={service}/>}
    </div>
  )
}

MusicPlaylist.propTypes = {
  service: PropTypes.string.isRequired
}

export default MusicPlaylist
