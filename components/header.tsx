import React, { Component } from 'react'
import Link from 'next/link'
import { User } from '../models/User'

type HeaderProps = {
  links: string[];
  user: User;
}

type HeaderState = {
  navVisible: boolean;
}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor (props) {
    super(props)
    this.state = {
      navVisible: false
    }
  }

  private handleWindowResize (): void {
    if (window.innerWidth <= 640) this.setState({ navVisible: false })
    else this.setState({ navVisible: true })
  }

  private handleToggleNavOnClick (): void {
    this.setState({ navVisible: !this.state.navVisible })
  }

  componentDidMount (): void {
    window.addEventListener('resize', () => this.handleWindowResize())
    if (window.innerWidth >= 768) {
      this.setState({ navVisible: true })
    }
  }

  public render (): JSX.Element {
    return (
      <div className="bg-white w-screen fixed top-0 left-0 z-50">
        <nav className="flex items-center justify-between flex-wrap p-6">
          <div className="flex items-center flex-shrink-0 text-lg w-1/12 font-bold animated">
            <Link href="/"><a className="hover:text-purple-500 animated">harmony</a></Link>
          </div>
          <div className="block md:hidden">
            <button className="flex items-center px-3 py-2 border rounded border-bluegrey-600 text-bluegrey-600 hover:bg-white" onClick={(): void => this.handleToggleNavOnClick()}>
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div>
          {this.state.navVisible && <div className="w-full block flex-grow md:flex md:items-center md:w-auto text-center">
            <div className="text-sm md:flex-grow justify-center text-center font-semibold text-bluegrey-600">
              {this.props.links.map((link) => {
                return <Link href={link} key={link}><a
                  className="block mt-4 md:inline-block md:mt-0 hover:text-purple-500 animated nav-link">{link}</a></Link>
              })}
            </div>
          </div>}
          {this.state.navVisible && <div className="w-full md:w-1/12 flex justify-center md:justify-end mt-4 md:mt-0"><Link href={this.props.user === null ? '/login' : `/user/${this.props.user.userName}`}>
            <a className="inline-block text-sm px-4 py-2 leading-none rounded text-purple-500 border border-purple-500 bg-white hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 md:mt-0 animated">
              {this.props.user === null ? 'Login/Register' : this.props.user.userName}
            </a>
          </Link>
          </div>}
        </nav>
      </div>
    )
  }
}
