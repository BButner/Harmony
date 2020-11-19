import '../styles/_settings.scss'
import '../styles/global.scss'
import { GetServerSideProps } from 'next'
import React from 'react'
import { fetchUserSettingsImplicit } from 'lib/fetcher/FetcherUserSettings'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
