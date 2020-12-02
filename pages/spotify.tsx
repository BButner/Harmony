import Layout from 'components/layout'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Config from 'config/default.json'
import { useRouter } from 'next/router'
import { timeStamp } from 'console'
import CardGeneric from 'components/generic/card/CardGeneric'
import ServicePlaylistTable from 'components/service/ServicePlaylistTable'

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

  const playlists = (): void => {
    fetch(`${Config.apiUrl}/service/spotify/playlists`, {
      credentials: 'include'
    })
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        const test = data
        setPlaylists(test)
      })
      .catch(err => {
        console.log(err)
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
          console.log(resp.body)
        })
        .catch(err => {
          console.log(err)
        })
      }
  }, [])

  return (
    <Layout pageTitle="Spotify" darkMode={darkMode}>
      <div className="flex items-start">
        <button onClick={redirect}>Connect</button>
        <button onClick={playlists}>Playlists</button>
        <br/>
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