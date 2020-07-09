import React, { Component } from 'react'
import Layout from '../components/layout'
import { ModelUserSelf } from '../models/user/ModelUser'
import { GetServerSideProps } from 'next'
import { getSelf } from '../libs/fetcher/userFetcher'
import MusicPlaylist from '../components/service/MusicPlaylist'

type IndexProps = {
  user: ModelUserSelf;
}

export default class Index extends Component<IndexProps, {}> {
  constructor (props) {
    super(props)
  }

  public render (): JSX.Element {
    return (
      <Layout pageTitle="harmony" showNavBar={true} user={this.props.user}>
        <div className="flex justify-center flex-wrap items-start pt-56">
          <MusicPlaylist service={'spotify'}/>
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getSelf(ctx)
  return { props: { user: data.self } }
}
