import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import NavbarLogin from './NavbarLogin'
import { CSSTransition } from 'react-transition-group'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import NavbarUser from './NavbarUser'
import styles from './navbaraccess.module.scss'

type NavbarAccessProps = {
  self?: ModelUserSelf;
  noFill?: boolean;
  scrolled?: boolean;
}

const NavbarAccess: FunctionComponent<NavbarAccessProps> = ({ self, noFill, scrolled }) => {
  const [loginCardVisible, setLoginCardVisible] = useState<boolean>(false)
  const [profileCardVisible, setProfileCardVisible] = useState<boolean>(false)

  const handleLoginClick = (): void => {
    setLoginCardVisible(!loginCardVisible)
  }

  const handleProfileClick = (): void => {
    setProfileCardVisible(!profileCardVisible)
  }

  return (
    <div className="flex items-center justify-end h-full mr-2">
      {!self && <div className="flex items-center">
        <div className="hidden md:flex items-center space-x-4">
          <a onClick={handleLoginClick} className={`${noFill && !scrolled ? 'hover:text-purple-400' : 'hover:text-purple-500'} cursor-pointer popup-activator-login`}>Login</a>
          <Link href='/register'><button className={`${styles['register-button']} ${noFill && !scrolled ? styles['register-button-nofill'] : ''}`}>Register</button></Link>
        </div>
        <div className="h-full md:hidden popup-activator-login" onClick={handleLoginClick} >
          <Icon path={mdiMenu} size={1} />
        </div>

        <CSSTransition in={loginCardVisible} classNames="slide-from-right" timeout={{ exit: 250 }} unmountOnExit>
          <NavbarLogin setCardVisible={setLoginCardVisible} />
        </CSSTransition>
      </div>}

      {self && <div className="flex items-center text-color-main">
        <div className={`hidden ${styles.profile} ${noFill && !scrolled ? styles['profile-nofill'] : ''} popup-activator-profile`} onClick={handleProfileClick}>
          <img className="w-8 h-8" src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${self.avatarUrl}`} />
          <p>{self.username}</p>
        </div>
        <div className="h-full md:hidden popup-activator-profile" onClick={handleProfileClick} >
          <Icon path={mdiMenu} size={1} />
        </div>

        <CSSTransition in={profileCardVisible} classNames="slide-from-right" timeout={{ exit: 250 }} unmountOnExit>
          <NavbarUser setCardVisible={setProfileCardVisible} self={self} />
        </CSSTransition>
      </div>}
    </div>
  )
}

export default NavbarAccess