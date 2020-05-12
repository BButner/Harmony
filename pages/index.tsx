import React, { Component } from 'react'
import Layout from '../components/layout'
import fetch from 'isomorphic-unfetch'
import Config from '../config/default.json'
import { User } from '../models/User'
import { GetServerSideProps } from 'next'

type IndexProps = {
  user: User
}

export default class Index extends Component<IndexProps, {}> {
  constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Layout showNavBar={true} user={this.props.user}>
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
  console.log('testing')
  const response = await fetch(Config.apiUrl + '/user', {
    method: 'POST',
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    body: JSON.stringify({userName: null})
  })
  const json = await response.json()
  return { props: { user: json.user } }
}