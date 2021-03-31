import { FunctionComponent, useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { getNavigationLinks } from 'lib/navigation/NavigationLinks'
import { NavbarAccess } from './NavbarAccess'
import { useRouter } from 'next/router'
import { NavbarMobileLinks } from './mobile/NavbarMobileLinks'
import { NavbarMobileAccess } from './mobile/NavbarMobileAccess'
import { Modal } from 'components/popup/Modal'
import { HomeIcon, UserCircleIcon, MusicNoteIcon } from '@heroicons/react/outline'

export const Navbar: FunctionComponent = () => {
  const router = useRouter()
  const [serviceSelectorVisible, setServiceSelectorVisible] = useState<boolean>(false)
  const [userPopupVisible, setUserPopupVisible] = useState<boolean>(false)

  return (
    <div className="w-full h-16 md:w-72 md:h-screen bg-white md:bg-gray-700 fixed bottom-0 md:top-0 left-0 md:p-4 text-gray-400 md:text-gray-300 md:space-y-6 flex items-center md:flex-col md:flex-wrap z-50">
      <img src="/img/logos/logo_written.png" className="hidden md:block h-14 m-auto" />

      {/* Nav Links */}
      <div className="hidden md:block space-y-4 w-full">
        <Link href="/"><a className={styles.link}><HomeIcon className="w-5 h-5" />Home</a></Link>
        <Link href="/"><a className={styles.link}><UserCircleIcon className="w-5 h-5" />Your Profile</a></Link>
      </div>

      <div className="flex md:hidden justify-around absolute z-50 w-full h-full bottom-0 items-center border-t-2 border-gray-300 bg-white">
        <Link href="/"><a className=""><HomeIcon className="w-6 h-6" /></a></Link>
        <a className="" onClick={(): void => setServiceSelectorVisible(!serviceSelectorVisible)}><MusicNoteIcon className="w-6 h-6" /></a>
        <a className="" onClick={(): void => setUserPopupVisible(!userPopupVisible)}><UserCircleIcon className="w-6 h-6" /></a>
      </div>

      {/* Service Links */}
      <div className="hidden md:block space-y-4 w-full">
        <p className="text-gray-400">Services</p>
        {getNavigationLinks().map(link => {
          return (
            <Link
              href={link.href}
              key={link.id}>
                <a
                  className={`${styles.link} ${styles['link-' + link.id]} ${router.pathname.includes(link.id) ?
                    `${styles['link-active']} ${styles[`link-active-${link.id}`]}`
                    : ''}`}
                >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={link.iconPath} />
                    </svg>
                    {link.title}
                </a>
            </Link>
          )
        })}
      </div>

      <Modal
        title="Service Selection"
        description="Select a service to manage."
        visible={serviceSelectorVisible}
        setVisible={setServiceSelectorVisible}>
        <NavbarMobileLinks visible={serviceSelectorVisible} />
      </Modal>

      {/* Filler */}
      <div className="hidden md:block flex-1" />

      {/* Access Area */}
      <NavbarAccess />     

      <NavbarMobileAccess setVisible={setUserPopupVisible} visible={userPopupVisible} />
    </div>
  )
}