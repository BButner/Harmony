import CardGeneric from 'components/generic/card/CardGeneric'
import React, { FunctionComponent, useEffect } from 'react'
import styles from './navbarlogin.module.scss'
import Link from 'next/link'
import { getLoginLinks } from 'lib/navbar/links'
import Closable from 'components/generic/Closable'
import { handlePopupClick } from 'lib/components/generic/PopupClickHandler'

type NavbarLoginProps = {
  setCardVisible: Function
}

const NavbarLogin: FunctionComponent<NavbarLoginProps> = ({ setCardVisible }) => {
  const ID = 'navbar-login'

  const handleClick = (event: MouseEvent): void => {
    handlePopupClick(ID, 'popup-activator-login', setCardVisible, event)
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return function cleanup () {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={`${styles.wrapper} right-0 md:right-6 z-40 w-full md:w-auto flex items-center justify-center`}>
      <CardGeneric className={`${styles.card} ml-1 mr-1 w-full md:w-auto md:right-5 z-40 text-center space-y-4`} id={ID}>
        <Closable closeFunction={setCardVisible} />
        <div className="buttons space-y-4">
          <p className="text-color-alt">Already have an account?</p>
          {getLoginLinks().map(link => {
            return (
              <Link key={link.id} href={`${process.env.NEXT_PUBLIC_API_URL}/login/oauth2/authorization/${link.id}`}>
                <button className={`block w-4/5 m-auto ${styles['login-button-service']} button-${link.id}`}>
                  <img className={styles['login-button-service-image']} src={`/images/login/${link.id}-login.png`} />
                  {link.title}
                </button>
              </Link>
            )
          })}
        </div>
        <p className="text-color-alt">Don't have an account? <Link href='/register'><a className="text-purple-500">Register</a></Link>.</p>
      </CardGeneric>
    </div>
  )
}

export default NavbarLogin