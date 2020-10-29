import CardGeneric from 'components/generic/card/CardGeneric'
import React, { FunctionComponent, useState } from 'react'
import styles from './userlogin.module.scss'
import { CSSTransition } from 'react-transition-group'
import UserLoginLinks from './UserLoginLinks'

const UserLogin: FunctionComponent = () => {
  const [loginCardVisible, setLoginCardVisible] = useState<boolean>(false)

  return (
    <>
      <div className="space-x-4">
        <a id="login-link" className={styles['login-login']} onClick={(): void => setLoginCardVisible(!loginCardVisible)}>Login</a>
        <button className={styles['login-button']}>Register</button>
      </div>
      <CSSTransition in={loginCardVisible} timeout={{ exit: 250 }} unmountOnExit classNames="slide-from-right">
        <UserLoginLinks setLoginCardVisible={setLoginCardVisible} />
      </CSSTransition>
    </>
  )
}

export default UserLogin
