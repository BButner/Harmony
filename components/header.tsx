import React, { Component, useEffect } from 'react'
import Link from 'next/link'
import { User } from '../models/User'

type HeaderProps = {
  links: string[],
  user: User
}

type HeaderState = {
  navVisible: boolean
}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor(props) {
    super(props)
    this.state = {
      navVisible: false
    }
  }

  private handleWindowResize() {
    if (window.innerWidth <= 640)
      this.setState({ navVisible: false })
    else
      this.setState({ navVisible: true })
  }

  private handleToggleNavOnClick() {
    this.setState({ navVisible: !this.state.navVisible })
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleWindowResize())
    if (window.innerWidth >= 768) {
      this.setState({ navVisible: true })
    }
  }

  public render(): JSX.Element {
    return (
      <nav className="flex items-center justify-between flex-wrap p-6 z-50 bg-white softer-shadow w-screen fixed top-0 left-0">
        <div className="flex items-center flex-shrink-0 text-lg">
          <Link href="/"><a>harmony</a></Link>
        </div>
        <div className="block md:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-gray-600 text-gray-600" onClick={() => this.handleToggleNavOnClick()}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        {this.state.navVisible && <div className="w-full block flex-grow md:flex md:items-center md:w-auto text-center">
          <div className="text-sm md:flex-grow justify-center text-center font-semibold text-gray-600">
            {this.props.links.map((link) => {
              return <Link href={link} key={link}><a
                className="block mt-4 md:inline-block md:mt-0 hover:text-gray-500 md:mr-4 animated">{link}</a></Link>
            })}
          </div>
          <Link href={this.props.user === null ? '/login' : '/user'}>
            <a className="inline-block text-sm px-4 py-2 leading-none rounded text-blue-500 border border-blue-500 bg-white hover:border-transparent hover:text-white hover:bg-blue-600 mt-4 md:mt-0 animated">
              {this.props.user === null ? 'Login/Register' : this.props.user.userName}
            </a>
          </Link>
        </div>}
      </nav>
    )
  }
}