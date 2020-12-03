import Layout from 'components/layout'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Config from 'config/default.json'
import { useRouter } from 'next/router'
import { timeStamp } from 'console'
import CardGeneric from 'components/generic/card/CardGeneric'
import ServicePlaylistTable from 'components/service/ServicePlaylistTable'
import Icon, { Stack } from '@mdi/react'
import { mdiSpotify } from '@mdi/js'

type SpotifyProps = {
  darkMode: boolean;
}

const Spotify: FunctionComponent<SpotifyProps> = ({ darkMode }) => {
  const router = useRouter()
  const redirect = (): void => {
    window.location.href = 'https://accounts.spotify.com/authorize' + 
      '?response_type=code' +
      '&client_id=' + Config.service.spotify.clientId + 
      '&scope=' + encodeURIComponent('playlist-read-private') + 
      '&redirect_uri=' + encodeURIComponent('http://10.0.0.97:3000/spotify')
  }
  const [pData, setPlaylists] = useState(null)

  const getSongs = (id: string): void => {
    fetch(`${Config.apiUrl}/service/spotify/playlists/${id}/songs`, {
      credentials: 'include'
    })
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        const test = data
        console.log(test)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const playlists = (): Promise<boolean> => {
    return fetch(`${Config.apiUrl}/service/spotify/playlists`, {
      credentials: 'include'
    })
      .then(resp => {
        if (resp.ok) return resp.json()
        else return null
      })
      .then(data => {
        setPlaylists(data) 
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })
  }

  useEffect(() => {
    if (router.query.code) {
      fetch(`${Config.apiUrl}/service/spotify/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ token: router.query.code, loadSongs: true })
      })
        .then(resp => {
          playlists()
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        playlists()
      }
  }, [])

  return (
    <Layout pageTitle="Spotify" darkMode={darkMode}>
      <div className="flex items-center justify-center w-full h-full relative">
        {!pData && <div className="text-center">
          <div className="relative" onClick={redirect}>
            <Icon path={mdiSpotify} size={8} className="m-auto text-gray-500 hover:text-spotify-500 cursor-pointer" />
          </div>
          <p className="text-xl text-color-alt">Spotify is not currently authorized, please <a className="cursor-pointer text-purple-500 hover:text-purple-700" onClick={redirect}>click here</a> or on the icon to reconnect.</p>
        </div>}
        {pData !== null && <ServicePlaylistTable playlists={pData} />}
      </div>
    </Layout>
  )
}

export default Spotify

export const getServerSideProps: GetServerSideProps = async ctx => {
  const settings = await fetchUserSettingsImplicit(ctx)

  return { props: { darkMode: settings.darkMode }}
}