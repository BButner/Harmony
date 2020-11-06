import React, { FunctionComponent } from 'react'
import Meta from './meta'
import Navbar from 'components/navbar'
import styles from './layout.module.scss'

type LayoutProps = {
  pageTitle: string;
  children: any;
  noPadding?: boolean
}

const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children, noPadding }) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <div className="h-screen w-screen">
        <Navbar />
        <div className={`${styles['page-content-wrapper']} ${noPadding ? '' : 'p-4'}  z-0`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
