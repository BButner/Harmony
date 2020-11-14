import React, { FunctionComponent, useEffect, useRef } from 'react'
import CardGeneric from 'components/generic/card/CardGeneric'
import { getLoginLinks } from 'lib/navbar/links'
import styles from './userloginlinks.module.scss'
import Link from 'next/link'
import Config from 'config/default.json'
import { clickedElementIsPopupElement } from 'lib/util/PopupUtil'
import Closable from 'components/generic/Closable'

type UserLoginLinksProps = {
  setLoginCardVisible: Function
}

const UserLoginLinks: FunctionComponent<UserLoginLinksProps> = ({ setLoginCardVisible }) => {
  const card = useRef(null)

  const handleClick = (event: MouseEvent): void => {
    const clickedElement = document.elementFromPoint(event.clientX, event.clientY)
    const loginLinks = document.getElementById('login-link')

    if (clickedElement && loginLinks) {
      if (!clickedElementIsPopupElement(clickedElement, loginLinks, card.current)) setLoginCardVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return function cleanup () {
      window.removeEventListener('click', handleClick)
    }
  })

  return (
    <div className={`${styles['login-card-wrapper']} z-40`} ref={card}>
      <CardGeneric className="space-y-4 text-center relative">
        <Closable closeFunction={setLoginCardVisible} />
        <div className="buttons space-y-4">
          <p className="text-color-alt">Already have an account?</p>
          {getLoginLinks().map(link => {
            return (
              <Link key={link.id} href={`${Config.apiUrl}/login/oauth2/authorization/${link.id}`}>
                <button className={`block w-64 m-auto ${styles['login-button-service']} button-${link.id}`}>
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

export default UserLoginLinks