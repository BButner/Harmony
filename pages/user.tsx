import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Config from '../config/default.json'
import Layout from '../components/layout'
import { User } from '../models/User'
import Card from '../components/card'
import Router from 'next/router'
import Confirmation from '../components/popups/confirmation'
import { GetServerSideProps } from 'next'

type UserProps = {
  user: User
}

type UserState = {
  showLogoutConfirmation: boolean
}

export default class UserCard extends Component<UserProps, UserState> {
  constructor(props) {
    super(props)
    this.state = {
      showLogoutConfirmation: false
    }
  }


  private handleAvatarOnClick() {
    console.log('testing')
  }

  private handleLogoutOnClick() {
    this.setState({ showLogoutConfirmation: true })
  }

  handleLogoutConfirmationChange = e => {
    if (e) {
      fetch(Config.apiUrl + '/logout', {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            Router.push('/')
          }
        })
    } else {
      this.setState({ showLogoutConfirmation: false })
    }
  }

  public render(): JSX.Element {
    return (
      <Layout showNavBar={true} user={this.props.user}>
        <div className="mt-20 flex justify-center flex-wrap items-start">
          <Card title={this.props.user.userName} subtitle={this.props.user.displayName} size={2} className="md:mr-10 mb-20 md:mb-0">
            <div className="text-center">
              {this.props.user.avatarUrl && <img className="w-48 h-48 rounded-full mb-10 m-auto hover:opacity-50 animated cursor-pointer"
                src={`${Config.bucketUrl}${this.props.user.avatarUrl}.jpg`} alt="Avatar"
                onClick={() => this.handleAvatarOnClick()}
              />}
              <div className="pb-5">
                <p className="pb-2"><input type="email" className="border border-gray-500 rounded p-1" readOnly={true} placeholder={this.props.user.email} /></p>
                <button className="bg-blue-500 text-white hover:bg-blue-700 rounded pt-1 pb-1 pl-5 pr-5 animated">Change Email</button>
              </div>
              <button onClick={() => this.handleLogoutOnClick()} className="bg-red-600 text-white hover:bg-red-800 rounded pt-1 pb-1 pl-5 pr-5 animated">Logout</button>
              <p className="pt-20 text-xs text-gray-500 italic">Member since {new Date(this.props.user.date.toString()).toDateString()}</p>
            </div>
          </Card>

          <Card size={2} title={'Statistics'}>
            <div className="md:flex">
              <div className="stat-wrapper text-center md:mr-10 mb-10">
                <p className="text-blue-500 text-6xl">6</p>
                <p>Playlists Transferred</p>
              </div>
              <div className="stat-wrapper text-center md:mr-10">
                <p className="text-blue-500 text-6xl">18</p>
                <p>Playlists You've Grabbed</p>
              </div>
              <div className="stat-wrapper text-center">
                <p className="text-blue-500 text-6xl">53</p>
                <p>Playlists Grab Count</p>
              </div>
            </div>
          </Card>

          {this.state.showLogoutConfirmation && <Confirmation title={'Logout'} message={'Are you sure you wish to logout?'} onChangeValue={this.handleLogoutConfirmationChange} />}
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const response = await fetch(Config.apiUrl + '/user', {
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })
  const json = await response.json()
  return { props: { user: json.user } }
}