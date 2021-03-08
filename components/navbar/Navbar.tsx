import { FunctionComponent, useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import Icon from '@mdi/react'
import { mdiHome, mdiAccount, mdiMusicCircle } from '@mdi/js'
import { getNavigationLinks, NavigationDetail } from 'lib/navigation/NavigationLinks'
import { NavbarAccess } from './NavbarAccess'
import { useRouter } from 'next/router'
import { NavbarMobileLinks } from './NavbarMobileLinks'
import { NavbarMobileAccess } from './NavbarMobileAccess'

export const Navbar: FunctionComponent = () => {
  const router = useRouter()
  const [musicIcon, setMusicIcon] = useState<string>(mdiMusicCircle)
  const [serviceSelectorVisible, setServiceSelectorVisible] = useState<boolean>(false)
  const [userPopupVisible, setUserPopupVisible] = useState<boolean>(false)

  useEffect(() => {
    const links: NavigationDetail[] = getNavigationLinks()
    if (links.map(link => link.href).includes(router.asPath)) {
      setMusicIcon(links.filter(link => link.href === router.asPath)[0].icon)
    } else {
      setMusicIcon(mdiMusicCircle)
    }
  }, [])

  return (
    <div className="w-full h-16 md:w-72 md:h-screen bg-white md:bg-gray-700 fixed bottom-0 md:top-0 left-0 md:p-4 text-gray-400 md:text-gray-300 md:space-y-6 flex items-center md:flex-col md:flex-wrap z-50">
      <img src="/img/logo_written.png" className="hidden md:block h-14 m-auto" />

      {/* Nav Links */}
      <div className="hidden md:block space-y-4 w-full">
        <Link href="/"><a className={styles.link}><Icon path={mdiHome} size={1} />Home</a></Link>
        <Link href="/"><a className={styles.link}><Icon path={mdiAccount} size={1} />Your Profile</a></Link>
      </div>

      <div className="flex md:hidden justify-around absolute z-50 w-full h-full bottom-0 items-center border-t-2 border-gray-300 bg-white">
        <Link href="/"><a className=""><Icon path={mdiHome} size={1.25} /></a></Link>
        <a className="" onClick={(): void => setServiceSelectorVisible(!serviceSelectorVisible)}><Icon path={musicIcon} size={1.25} /></a>
        <a className="" onClick={(): void => setUserPopupVisible(!userPopupVisible)}><Icon path={mdiAccount} size={1.25} /></a>
      </div>

      {/* Service Links */}
      <div className="hidden md:block space-y-4 w-full">
        <p className="text-gray-400">Services</p>
        {getNavigationLinks().map(link => {
          return <Link href={link.href} key={link.id}><a className={`${styles.link} ${styles['link-' + link.id]}`}><Icon path={link.icon} size={1} />{link.title}</a></Link>
        })}
      </div>

      <NavbarMobileLinks visible={serviceSelectorVisible} />

      {/* Filler */}
      <div className="hidden md:block flex-1" />

      {/* Access Area */}
      <NavbarAccess />     

      <NavbarMobileAccess visible={userPopupVisible} />
    </div>
  )
}