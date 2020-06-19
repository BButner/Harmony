import React, { Component } from 'react'
import Layout from '../components/layout'
import { UserSelf } from '../models/User'
import { GetServerSideProps } from 'next'
import { getSelf } from '../libs/fetcher/userFetcher'

type IndexProps = {
  user: UserSelf;
}

export default class Index extends Component<IndexProps, {}> {
  constructor (props) {
    super(props)
  }

  public render (): JSX.Element {
    return (
      <Layout pageTitle="harmony" showNavBar={true} user={this.props.user}>
        <div className="w-full h-full flex-grow flex justify-center align-middle">
          <div className="m-auto">
            test
          </div>
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await getSelf(ctx)
  return { props: { user: data.self } }
}
