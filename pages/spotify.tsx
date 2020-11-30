import Layout from 'components/layout'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'
import { GetServerSideProps } from 'next'
import React, { FunctionComponent, useEffect } from 'react'
import Config from 'config/default.json'
import { useRouter } from 'next/router'

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

  const playlists = (): void => {
    fetch(`${Config.apiUrl}/service/spotify/playlists`, {
      credentials: 'include'
    })
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        console.log(data)
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
    } else {
      fetch(`${Config.apiUrl}/service/spotify/playlists`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(resp => {
          console.log(resp)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return (
    <Layout pageTitle="Spotify" darkMode={darkMode}>
      <button onClick={redirect}>Connect</button>
      <button onClick={playlists}>Playlists</button>
    </Layout>
  )
}

export default Spotify

export const getServerSideProps: GetServerSideProps = async ctx => {
  const settings = await fetchUserSettingsImplicit(ctx)

  return { props: { darkMode: settings.darkMode }}
}