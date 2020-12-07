import Icon from '@mdi/react'
import { mdiLink } from '@mdi/js'
import { ModelUnifiedPlaylist } from 'models/service/ModelServicePlaylist'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from './serviceplaylisttable.module.scss'
import Image from 'next/image'
import CardGeneric from 'components/generic/card/CardGeneric'
import Pagination from 'components/generic/pagination/Pagination'
import { CSSTransition } from 'react-transition-group'
import ServiceSongDisplay from './ServiceSongDisplay'
import PopupBlur from 'components/generic/popup/PopupBlur'

type ServicePlaylistTableProps = {
  playlists?: ModelUnifiedPlaylist[];
}

const ServicePlaylistTable: FunctionComponent<ServicePlaylistTableProps> = ({ playlists }) => {
  const PER_PAGE: number = 7
  const DEFAULT_SIZE: number = 220
  const MOBILE_SIZE: number = 60
  const [size, setSize] = useState<number>(DEFAULT_SIZE)
  const [currentPlaylists, setCurrentPlaylists] = useState<ModelUnifiedPlaylist[]>([])
  const [songDisplayVisible, setSongDisplayVisible] = useState<boolean>(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<ModelUnifiedPlaylist>(null)

  const handleResize = (): void => {
    if (window.innerWidth < 640) {
      setSize(MOBILE_SIZE)
    } else {
      setSize(DEFAULT_SIZE)
    }
  }

  useEffect((): void => {
    handleResize()
    window.addEventListener('resize', handleResize)

    function cleanup() {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={size === DEFAULT_SIZE ? { width: `${size * PER_PAGE + 50}px` } : {}} className="w-full">
      <Pagination
        schemaFilter={['name', 'description']}
        allValues={playlists}
        setCurrentValues={setCurrentPlaylists}
        perPage={PER_PAGE}
        minHeight={size === MOBILE_SIZE ? (MOBILE_SIZE * PER_PAGE) + (8 * PER_PAGE) : DEFAULT_SIZE}
        searchPrefix='Playlist'
        className="space-y-2 md:flex md:justify-center md:items-center md:space-x-2 w-full"
      >
        {currentPlaylists.map(playlist => {
          return (
            <CSSTransition key={playlist.id} timeout={275} classNames="fade-slide" unmountOnExit>
              <CardGeneric className={`overflow-hidden bg-main-200 ${styles['playlist-card']} w-full flex md:w-auto md:block`} noPadding onClick={(): void => {
                setSelectedPlaylist(playlist)
                setSongDisplayVisible(true)
              }}>
                <img src={playlist.imageHref} width={size} height={size} />
                <div className="pl-2 md:pl-0 md:text-center flex items-center justify-center" style={{ height: '60px' }}>
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
        <ServiceSongDisplay playlist={selectedPlaylist} visible={songDisplayVisible} setVisible={setSongDisplayVisible} />
      </PopupBlur>
    </div>
  )
}

export default ServicePlaylistTable