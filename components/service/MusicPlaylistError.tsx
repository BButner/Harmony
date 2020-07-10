import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'
import CardGenericSlim from '../cards/CardGenericSlim'
import Icon from '@mdi/react'
import { mdiAlertCircleOutline } from '@mdi/js'
import { getServiceNameFromId } from '../../lang/LangService'
import Config from '../../config/default.json'

interface MusicPlaylistErrorProps {
  service: string;
}

const MusicPlaylistError: FunctionComponent<MusicPlaylistErrorProps> = ({ service }) => {
  const reconnectService = (): void => {
    window.location.href = `${Config.apiUrl}/service/${service}/connect`
  }

  return (
    <div style={{
      width: '42rem'
    }}>
      <CardGenericSlim title={getServiceNameFromId(service) + ' Playlists'}>
        <div className="w-full flex justify-center align-center bg-gray-200 rounded-b-lg">
          <div onClick={reconnectService} className="m-auto mt-5 mb-5">
            <Icon path={mdiAlertCircleOutline} className="text-gray-500 m-auto hover:text-gray-700 cursor-pointer animated" size={3.5}/>
          </div>
          <div className="m-auto ml-4">
            <p className="text-gray-700">Unfortunately there was an error loading the {getServiceNameFromId(service)} playlist data.</p>
            <button className="button mt-5" onClick={reconnectService}>Reconnect</button>
          </div>
        </div>
      </CardGenericSlim>
    </div>
  )
}

MusicPlaylistError.propTypes = {
  service: PropTypes.string.isRequired
}

export default MusicPlaylistError
