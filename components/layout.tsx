import React, { FunctionComponent, useEffect } from 'react'
import Meta from './meta'
import Navbar from 'components/navbar/Navbar'
import styles from './layout.module.scss'

type LayoutProps = {
  pageTitle: string;
  children: any;
  noPadding?: boolean;
  darkMode?: boolean;
  navNoFill?: boolean;
  navFixed?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children, noPadding, darkMode, navFixed, navNoFill }) => {
  useEffect(() => {
    if (self && darkMode && !document.body.classList.contains('dark')) {
      document.body.classList.add('dark')
    }
  }, [])

  return (
    <>
      <Meta pageTitle={pageTitle} />
      <div className="h-screen w-screen">
        <Navbar fixed={navFixed} noFill={navNoFill} />
        <div id="layout" className={`${styles['page-content-wrapper']} ${navFixed ? styles['page-content-wrapper-fixed-nav'] : ''} ${noPadding ? '' : 'p-4'} z-0`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
