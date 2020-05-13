import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Config from '../../config/default.json'
import Layout from '../../components/layout'
import { User } from '../../models/User'
import Card from '../../components/card'
import Router from 'next/router'
import Confirmation from '../../components/popups/confirmation'
import { GetServerSideProps } from 'next'

type UserProps = {
  user: User;
  self: User;
}

type UserState = {
  showLogoutConfirmation: boolean;
}

export default class UserCard extends Component<UserProps, UserState> {
  constructor (props) {
    super(props)
    this.state = {
      showLogoutConfirmation: false
    }
  }

  private handleAvatarOnClick (): void {
    console.log('testing')
  }

  private handleLogoutOnClick (): void {
    this.setState({ showLogoutConfirmation: true })
  }

  handleLogoutConfirmationChange = (e): void => {
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

  public render (): JSX.Element {
    return (
      <Layout showNavBar={true} user={this.props.self} title="User Information" subtitle="View your profile, change your settings, etc.">
        <div className="flex justify-center flex-wrap items-start pt-56">
          <Card className="text-center md:flex md:items-center md:text-left">
            {this.props.user.avatarUrl && <img
              className="w-32 h-32 rounded-full m-auto mb-10 md:m-0"
              src={`${Config.bucketUrl}${this.props.user.avatarUrl}.jpg`}>
            </img>}
            <div className={`${this.props.user.avatarUrl ? 'md:ml-10' : ''}`}>
              <p className="text-2xl">{this.props.user.userName}</p>
              <p className="text-lg text-bluegrey-600">{this.props.user.displayName}</p>
              <p className="text-md text-bluegrey-600">{this.props.user.email}</p>
              <p className="text-xs text-bluegrey-500 mt-4">Member since {new Date(this.props.user.date.toString()).toDateString()}</p>
            </div>
            {this.props.user.userName === this.props.self.userName && <div className="m-auto md:m-0 md:ml-10 text-center mt-5 md:mt-0">
              <button className="m-auto bg-teal-500 block text-white rounded button hover:bg-teal-700 animated mb-2">Change Email</button>
              <button onClick={(): void => this.handleLogoutOnClick()} className="m-auto md:m-0 bg-red-500 text-white rounded hover:bg-red-700 button animated">Logout</button>
            </div>}
          </Card>

          {this.state.showLogoutConfirmation && <Confirmation title={'Logout'} message={'Are you sure you wish to logout?'} onChangeValue={this.handleLogoutConfirmationChange} />}
        </div>
      </Layout>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const response = await fetch(Config.apiUrl + '/user', {
    method: 'POST',
    credentials: 'include',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie, 'Content-Type': 'application/json' } : undefined,
    body: JSON.stringify({
      userName: ctx.params.id
    })
  })
  const json = await response.json()
  return {
    props: {
      user: json.user,
      self: json.self
    }
  }
}
