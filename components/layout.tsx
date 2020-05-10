import React, { Component } from 'react'
import Header from './header'
import Meta from './meta'
import { User } from '../models/User'

type LayoutProps = {
  showNavBar: boolean,
  children: any,
  user: User
}

type LayoutState = {
  test: number
}

export default class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      test: 0
    }
  }

  public render(): JSX.Element {
    return (
      <>
        <Meta />
        {this.props.showNavBar && <Header links={['Spotify']} user={this.props.user} />}
        <div className="mt-32">
          {this.props.children}
        </div>
      </>
    )
  }
}