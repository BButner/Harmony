import { FunctionComponent, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'
import { storeSpotifyToken, fetchSpotifyPlaylists } from 'lib/api/spotify/SpotifyFetcher'
import { spotifyAuthRedirect } from 'lib/services/spotify/SpotifyRedirect'
import { Playlist } from 'models/service/ModelService'
import { motion } from 'framer-motion'

const spotify: FunctionComponent = () => {
  const router = useRouter()
  const [initialPlaylistAttempt, setInitialPlaylistAttempt] = useState<boolean>(false)
  const [playlistData, setPlaylistData] = useState<Playlist[]>([])

  useEffect(() => {
    console.log(sessionStorage.getItem('spotify-token'))
    if (
      router.query.code
      && !initialPlaylistAttempt
    ) {
      setInitialPlaylistAttempt(true)
      
      if (sessionStorage.getItem('spotify-token') === null || sessionStorage.getItem('spotify-token') !== router.query.code.toString().substring(0, 5)) {
        storeSpotifyToken(router.query.code as string)
          .then(resp => {
            if (resp) {
              sessionStorage.setItem('spotify-token', router.query.code.toString().substring(0, 5))

              fetchSpotifyPlaylists()
                .then(data => {
                  setPlaylistData(data.playlistData)
                })
            }
          })
      } else {
        fetchSpotifyPlaylists()
          .then(data => {
            setPlaylistData(data.playlistData)
          })
      }
    } else {
      console.log('else')
      if (!initialPlaylistAttempt) {
        fetchSpotifyPlaylists()
          .then(data => {
            console.log('here')
            setPlaylistData(data.playlistData)
          })
        setInitialPlaylistAttempt(true)
      }
    }
  })

  return (
    <Layout pageTitle="Spotify">
      <button onClick={(): void => spotifyAuthRedirect()}>Auth</button>

      <div className="flex flex-wrap rounded-xl">
        {playlistData === null && <div>not authed</div>}
        {playlistData.length > 0 && playlistData.map(playlist => {
          return <motion.div className="m-3 shadow-2xl rounded-xl cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
            <img src={playlist.imageHref} className="w-64 h-64 rounded-t-xl" />
            <div className="rounded-b-xl bg-gray-100 text-center p-2">
              <p>{playlist.name}</p>
              {/* <p className="text-sm">{playlist.description}</p> */}
            </div>
          </motion.div>
        })}
      </div>
    </Layout>
  )
}

export default spotify