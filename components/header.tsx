import React, { FunctionComponent, useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from '../models/User'
import PropTypes from 'prop-types'

type HeaderProps = {
  links: string[];
  user: User;
}

const Header: FunctionComponent<HeaderProps> = ({ links, user }) => {
  const [navVisible, setNavVisible] = useState<boolean>(false)

  function handleWindowResize (): void {
    if (window.innerWidth <= 640) setNavVisible(false)
    else setNavVisible(true)
  }

  function handleToggleNavOnClick (): void {
    setNavVisible(!navVisible)
  }

  useEffect(() => {
    window.addEventListener('resize', () => handleWindowResize())
    if (window.innerWidth >= 768) setNavVisible(true)
  })

  return (
    <div className="bg-white w-screen fixed top-0 left-0 z-50">
      <nav className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 text-lg w-2/3 font-bold animated">
          <Link href="/"><a className="hover:text-purple-500 animated">harmony</a></Link>
          {navVisible && <div className="hidden md:block w-full block ml-10 md:flex justify-start md:w-auto text-left">
            <div className="text-sm md:flex-grow justify-center text-center font-semibold text-bluegrey-600">
              {links.map((link) => {
                return <Link href={link} key={link}><a
                  className="block mt-4 md:inline-block md:mt-0 hover:text-purple-500 animated nav-link">{link}</a></Link>
              })}
            </div>
          </div>}
        </div>
        <div className="block md:hidden">
          <button className="flex items-center px-3 py-2 border rounded border-bluegrey-600 text-bluegrey-600 hover:bg-white" onClick={(): void => handleToggleNavOnClick()}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        {navVisible && <div className="w-full block flex-grow md:hidden text-center">
          <div className="text-sm md:flex-grow justify-center text-center font-semibold text-bluegrey-600">
            {links.map((link) => {
              return <Link href={link} key={link}><a
                className="block mt-4 md:inline-block md:mt-0 hover:text-purple-500 animated nav-link">{link}</a></Link>
            })}
          </div>
        </div>}
        {navVisible && <div className="w-full md:w-1/12 flex justify-center md:justify-end mt-4 md:mt-0"><Link href={user === null ? '/login' : `/user/${user.userName}`}>
          <a className="inline-block text-sm px-4 py-2 leading-none rounded text-purple-500 border border-purple-500 bg-white hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 md:mt-0 animated">
            {user === null ? 'Login/Register' : user.userName}
          </a>
        </Link>
        </div>}
      </nav>
    </div>
  )
}

Header.propTypes = {
  links: PropTypes.array.isRequired,
  user: PropTypes.any.isRequired
}

export default Header
