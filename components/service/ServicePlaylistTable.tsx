import Icon from '@mdi/react'
import { mdiLink } from '@mdi/js'
import { UnifiedPlaylist } from 'models/service/ModelServicePlaylist'
import React, { FunctionComponent, useState } from 'react'
import styles from './serviceplaylisttable.module.scss'
import Image from 'next/image'
import CardGeneric from 'components/generic/card/CardGeneric'
import Pagination from 'components/generic/pagination/Pagination'
import { CSSTransition } from 'react-transition-group'
import ServiceSongDisplay from './ServiceSongDisplay'
import PopupBlur from 'components/generic/popup/PopupBlur'

type ServicePlaylistTableProps = {
  playlists?: UnifiedPlaylist[];
}

const ServicePlaylistTable: FunctionComponent<ServicePlaylistTableProps> = ({ playlists }) => {
  const PER_PAGE: number = 7
  const SIZE: number = 220
  const [currentPlaylists, setCurrentPlaylists] = useState<UnifiedPlaylist[]>([])
  const [songDisplayVisible, setSongDisplayVisible] = useState<boolean>(false)

  return (
    <div style={{ width: `${SIZE * PER_PAGE + 50}px` }}>
      <Pagination schemaFilter={['name', 'description']} allValues={playlists} setCurrentValues={setCurrentPlaylists} perPage={PER_PAGE} minHeight={280} searchPrefix="Playlist">
        {currentPlaylists.map(playlist => {
          return (
            <CSSTransition key={playlist.id} timeout={275} classNames="fade-slide" unmountOnExit>
              <CardGeneric className={`overflow-hidden bg-main-200 ${styles['playlist-card']}`} noPadding onClick={(): void => setSongDisplayVisible(true)}>
                <img src={playlist.imageHref} width={220} height={220} />
                <div className="text-center flex items-center justify-center" style={{ height: '60px' }}>
                  <div>
                    <p>{(playlist.name.length > 24 ? playlist.name.substr(0, 24) + '...' : playlist.name)}</p>
                    <p className="text-color-alt text-sm">{(playlist.description.length > 25 ? playlist.description.substr(0, 25).trim() + '...' : 'No Description')}</p>
                  </div>
                </div>
              </CardGeneric>
            </CSSTransition>
          )
        })}
      </Pagination>
      <PopupBlur visible={songDisplayVisible}>
        <ServiceSongDisplay visible={songDisplayVisible} setVisible={setSongDisplayVisible} />
      </PopupBlur>
    </div>
  )
}

export default ServicePlaylistTable