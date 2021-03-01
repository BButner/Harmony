import { FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QueryObserverResult } from 'react-query'
import { Playlist } from 'models/service/ModelService'
import { storeSpotifyToken } from 'lib/api/service/spotify/SpotifyFetcher'
import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'
import { motion } from 'framer-motion'
import { spotifyAuthRedirect } from 'lib/services/spotify/SpotifyRedirect'
import { LoadingIcon } from 'components/misc/LoadingIcon'

type SpotifyHandlerProps = {
  playlistData: QueryObserverResult<Playlist[], Error>;
}

export const SpotifyHandler: FunctionComponent<SpotifyHandlerProps> = ({ playlistData }) => {
  const router = useRouter()

  useEffect(() => {
    if (playlistData.isError) {
      playlistData.remove()
      if (router.query.code) {
        storeSpotifyToken(router.query.code.toString())
          .then(stored => {
            if (stored) {
              router.push('/spotify')
              playlistData.refetch()
            }
          })
      }
    }
  })

  if (playlistData.isLoading) {
    return <div className="w-full h-screen flex items-center justify-center"><LoadingIcon /></div>
  } else if (!playlistData.isSuccess && (playlistData.isError || !playlistData.data)) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1 }} onClick={spotifyAuthRedirect}>
            <Icon path={mdiSpotify} size={8} className="text-gray-400 m-auto mb-10 transition cursor-pointer duration-200 hover:text-spotify-500" />
          </motion.div>
          <p className="text-2xl text-gray-800">Spotify is not currently authenticated. Please click the logo above in order to reconnect!</p>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}