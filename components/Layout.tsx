import { FunctionComponent } from 'react'
import { Meta } from './Meta'
import { Navbar } from './navbar/Navbar'

type LayoutProps = {
  pageTitle: string;
}

export const Layout: FunctionComponent<LayoutProps> = ({ pageTitle, children }) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <Navbar />
      {children}
    </>
  )
}