import CardGeneric from 'components/generic/card/CardGeneric'
import Closable from 'components/generic/Closable'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import { handlePopupClick } from 'lib/components/generic/PopupClickHandler'
import { getServiceLinks } from 'lib/navbar/links'
import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useEffect } from 'react'
import styles from './navbarlogin.module.scss'
import Link from 'next/link'

type NavbarUserProps = {
  self: ModelUserSelf;
  setCardVisible: Function;
}

const NavbarUser: FunctionComponent<NavbarUserProps> = ({ self, setCardVisible }) => {
  const ID = 'navbar-profile'

  const handleClick = (event: MouseEvent): void => {
    handlePopupClick(ID, 'popup-activator-profile', setCardVisible, event)
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return function cleanup () {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={`${styles.wrapper} right-0 md:right-6 z-40 w-full md:w-auto flex items-center justify-center`}>
      <CardGeneric className={`${styles.card} ml-1 mr-1 w-full md:w-auto md:right-3 z-40 text-center space-y-4`} id={ID}>
        <Closable closeFunction={setCardVisible} />
        <div className="md:hidden space-y-4">
          {getServiceLinks().map(service => {
            return (
              <Link href={`/${service.id}`}><a className={`block hover:text-${service.id}-500`}>{service.title}</a></Link>
            )
          })}
          <hr />
        </div>
        <img src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${self.avatarUrl}`} className="w-24 h-24 rounded-full m-auto" />
        <InformationWrapper>
          <p className="text-xl">Hello, {self.username}</p>
          <p className="">{self.displayName}</p>
          <p className="text-sm text-color-alt">{self.email}</p>
        </InformationWrapper>
        <div className="space-y-2">
          <div className="space-y-2 md:flex justify-between md:space-x-2 md:space-y-0">
            <Link href={`/user/${self.idExternal}`}><button className="w-full md:w-32">Profile</button></Link>
            <Link href={`/user/${self.idExternal}?settings=true`}><button className="w-full md:w-32">Settings</button></Link>
          </div>
          <form action={`${process.env.NEXT_PUBLIC_API_URL}/logout`} method="post">
            <button className="button-red w-full">Logout</button>
          </form>
        </div>
      </CardGeneric>
    </div>
  )
}

export default NavbarUser