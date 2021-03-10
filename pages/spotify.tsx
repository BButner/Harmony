import { FunctionComponent, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { ServicePlaylistWrapper } from 'components/service/ServicePlaylistWrapper'

const spotify: FunctionComponent = () => {
  return (
    <Layout pageTitle="Spotify">
      <ServicePlaylistWrapper />
    </Layout>
  )
}

export default spotify