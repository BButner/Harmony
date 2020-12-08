import React, { FunctionComponent, useEffect } from 'react'
import Meta from './meta'
import Navbar from 'components/navbar'
import styles from './layout.module.scss'
import { mdiPageLayoutBody } from '@mdi/js'

type LayoutProps = {
  pageTitle: string;
  children: any;
  noPadding?: boolean;
  darkMode?: boolean;
  navbarFixed?: boolean;
  navbarNoFill?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children, noPadding, darkMode, navbarFixed, navbarNoFill }) => {
  useEffect(() => {
    if (self && darkMode && !document.body.classList.contains('dark')) {
      document.body.classList.add('dark')
    }
  }, [])

  return (
    <>
      <Meta pageTitle={pageTitle} />
      <div className="h-screen w-screen">
        <Navbar noFill={navbarNoFill} fixed={navbarFixed} />
        <div className={`${styles['page-content-wrapper']} ${navbarFixed ? styles['page-content-wrapper-fixed-nav'] : ''} ${noPadding ? '' : 'p-4'} z-0`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
