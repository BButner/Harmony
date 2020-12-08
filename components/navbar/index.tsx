import React, { FunctionComponent, useState } from 'react'
import styles from './navbar.module.scss'
import Link from 'next/link'
import LinksMobile from './mobile/LinksMobile'
import { CSSTransition } from 'react-transition-group'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import useSWR from 'swr'
import { fetchUserSelf } from 'lib/fetcher/FetcherUser'
import { getServiceLinks } from 'lib/navbar/links'
import User from './user/index'

type NavbarProps = {
  noFill?: boolean;
  fixed?: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ noFill, fixed }) => {
  const [linksVisible, setLinksVisible] = useState<boolean>(false)
  const { data, error } = useSWR('/user/self', fetchUserSelf, {
    revalidateOnFocus: false
  })

  return (
    <div className="z-40">
      <div className={`w-screen ${noFill ? 'pr-2' : 'bg-main-200 soft-shadow'} ${styles.navbar} flex justify-between z-40 ${fixed ? 'fixed top-0 left-0' : ''}`}>
        <div className={`flex pl-4 pr-4 md:p-0 w-full md:w-auto justify-between md:justify-center items-center ${styles.hero}`}>
          <Link href='/'><a><img src="/images/logo_written.png" className={`h-12 md:pl-4 ${styles.logo}`} alt=""/></a></Link>
          <div id="nav-links-burger" className="md:hidden" onClick={(): void => setLinksVisible(!linksVisible)}><Icon path={mdiMenu} size={1} /></div>
        </div>
        <div className={"md:hidden " + styles['nav-links']}>
          <CSSTransition in={linksVisible} timeout={{ exit: 250 }} unmountOnExit classNames="slide-from-top">
            <LinksMobile setVisible={setLinksVisible} self={data} />
          </CSSTransition>
        </div>
        <div className={`hidden md:flex justify-center items-center space-x-6 ${noFill ? 'text-white' : ''}`}>
          {getServiceLinks().map(link => {
            return (
              <Link key={link.id} href={`/${link.id}`}><a className={`hover:text-${link.id}-500 block`}>{link.title}</a></Link>
            )
          })}
        </div>
        <div className="hidden md:flex mr-4 h-full justify-center items-center">
          <User self={data} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
