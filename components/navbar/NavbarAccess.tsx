import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import NavbarLogin from './NavbarLogin'
import { CSSTransition } from 'react-transition-group'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'

type NavbarAccessProps = {
  self?: ModelUserSelf
}

const NavbarAccess: FunctionComponent<NavbarAccessProps> = ({ self }) => {
  const [loginCardVisible, setLoginCardVisible] = useState<boolean>(false)

  const handleLoginClick = (): void => {
    setLoginCardVisible(!loginCardVisible)
  }

  return (
    <div className="flex items-center justify-end h-full mr-2">
      {!self && <div className="flex items-center">
        <div className="hidden md:flex items-center space-x-4">
          <a onClick={handleLoginClick} className="hover:text-purple-500 cursor-pointer popup-activator-login">Login</a>
          <Link href='/register'><a><button className="bg-main-400 text-color-alt-opp hover:text-white">Register</button></a></Link>
        </div>
        <div className="h-full md:hidden popup-activator-login" onClick={handleLoginClick} >
          <Icon path={mdiMenu} size={1} />
        </div>

        <CSSTransition in={loginCardVisible} classNames="slide-from-right" timeout={{ exit: 250 }} unmountOnExit>
          <NavbarLogin setCardVisible={setLoginCardVisible} />
        </CSSTransition>
      </div>}
    </div>
  )
}

export default NavbarAccess