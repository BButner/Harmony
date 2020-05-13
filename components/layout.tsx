import React, { Component } from 'react'
import Header from './header'
import Meta from './meta'
import { User } from '../models/User'

type LayoutProps = {
  showNavBar: boolean,
  children: any,
  user: User,
  navbarTitle?: string,
  navbarSubtitle?: string,
  title?: string,
  subtitle?: string
}

type LayoutState = {
  showNavBarSub: boolean
}

export default class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      showNavBarSub: this.props.navbarTitle !== null
    }
  }

  private handleScroll () {
    if (window.scrollY > 10 && this.state.showNavBarSub) {
      this.setState({showNavBarSub: false})
    } else if (window.scrollY <= 10) {
      this.setState({showNavBarSub: true})
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', () => this.handleScroll())
  }

  public render(): JSX.Element {
    return (
      <>
        <Meta />
        {this.props.showNavBar && <Header links={['Spotify', 'Pandora', 'Google Play Music', 'YouTube Music', 'Apple Music']} user={this.props.user}/>}
        <div className="relative">
          {this.props.title && <div className={`p-0 m-0 m-auto w-screen text-center fixed top-0 left-0 z-0 bg-white transition-all duration-200 ${this.state.showNavBarSub ? 'opacity-100' : 'opacity-0'}`}>
            <p className="pt-32 text-xl">{this.props.title}</p>
            <p className="pb-32">{this.props.subtitle}</p>
          </div>}
          <div className="z-40 relative pt-56">
            {this.props.children}
          </div>
        </div>
      </>
    )
  }
}