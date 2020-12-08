import CardGeneric from 'components/generic/card/CardGeneric'
import Closable from 'components/generic/Closable'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import { handlePopupClick } from 'lib/components/generic/PopupClickHandler'
import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useEffect } from 'react'
import styles from './navbarlogin.module.scss'

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
      <CardGeneric className={`${styles.card} ml-1 mr-1 w-full md:w-auto md:right-5 z-40 text-center space-y-4 relative`} id={ID}>
        <Closable closeFunction={setCardVisible} />
        <InformationWrapper>
          <p className="text-xl">{self.username}</p>
          <p className="">{self.displayName}</p>
          <p className="text-sm text-color-alt">{self.email}</p>
        </InformationWrapper>
      </CardGeneric>
    </div>
  )
}

export default NavbarUser