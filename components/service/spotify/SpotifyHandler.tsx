import { FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/router'
import { QueryObserverResult } from 'react-query'
import { Playlist } from 'models/service/ModelService'
import { storeSpotifyToken } from 'lib/api/service/spotify/SpotifyFetcher'
import { motion } from 'framer-motion'
import { spotifyAuthRedirect } from 'lib/services/spotify/SpotifyRedirect'
import { LoadingIcon } from 'components/misc/LoadingIcon'
import { iconSpotify } from 'lib/icons'

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
            <svg
              viewBox="0 0 24 24"
              className="w-32 h-32 lg:w-56 lg:h-56 m-auto text-gray-400 transition cursor-pointer hover:text-spotify-500"
              fill="currentColor"
            >
              <path d={iconSpotify} />
            </svg>
          </motion.div>
          <p className="text-lg lg:text-2xl text-gray-800">Spotify is not currently authenticated. Please click the logo above in order to reconnect!</p>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}