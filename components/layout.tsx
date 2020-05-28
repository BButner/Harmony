import React, { FunctionComponent, useState, useEffect } from 'react'
import Header from './header'
import Meta from './meta'
import { User } from '../models/User'
import PropTypes from 'prop-types'

type LayoutProps = {
  showNavBar: boolean;
  children: any;
  user: User;
  navbarTitle?: string;
  navbarSubtitle?: string;
  title?: string;
  subtitle?: string;
  pageTitle: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ showNavBar, children, user, navbarTitle, navbarSubtitle, title, subtitle, pageTitle }) => {
  const [showNavBarSub, setShowNavBarSub] = useState<boolean>(navbarTitle !== null)

  function handleScroll (): void {
    if (window.scrollY > 50 && showNavBarSub) setShowNavBarSub(false)
    else if (window.scrollY <= 50 && !showNavBarSub) setShowNavBarSub(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  return (
    <>
      <Meta title={pageTitle}/>
      {showNavBar && <Header links={['Spotify', 'Pandora', 'YouTube Music', 'Apple Music']} user={user}/>}
      <div className="relative">
        {title && <div className={`p-0 m-0 m-auto w-screen text-center fixed top-0 left-0 z-0 bg-white transition-all duration-200 ${showNavBarSub ? 'opacity-100' : 'opacity-0'}`}>
          <p className="pt-32 text-xl">{title}</p>
          <p className="pb-32">{subtitle}</p>
        </div>}
        <div className="z-40 relative">
          {children}
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  showNavBar: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  navbarTitle: PropTypes.string,
  navbarSubtitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  pageTitle: PropTypes.string.isRequired
}

export default Layout
