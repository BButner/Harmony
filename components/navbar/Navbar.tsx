import { getServiceLinks } from 'lib/navbar/links'
import React, { FunctionComponent } from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import useSWR from 'swr'
import { fetchUserSelf } from 'lib/fetcher/FetcherUser'
import NavbarAccess from './NavbarAccess'

type NavbarProps = {
  fixed?: boolean;
  noFill?: boolean;
}

const Navbar: FunctionComponent = () => {
  const { data, error } = useSWR('/user/self', fetchUserSelf, { revalidateOnFocus: false })

  return (
    <div className={`${styles.navbar} w-full bg-main-200 flex justify-between z-50`}>
      {/* Logo */}
      <div className="w-3/4 md:w-1/4">
        <Link href='/'><a><img src="/images/logo_written.png" className="m-2 h-12 animated-transition hover:opacity-50" /></a></Link>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex md:items-center md:justify-center md:space-x-6 md:w-1/2">
        {getServiceLinks().map(link => {
          return (
            <Link key={link.id} href={`/${link.id}`}><a className={`hover:text-${link.id}-500`}>{link.title}</a></Link>
          )
        })}
      </div>

      {/* User Info */}
     <div className="md:w-1/4">
        <NavbarAccess self={data} />
      </div>
    </div>
  )
}

export default Navbar