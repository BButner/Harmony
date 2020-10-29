import React, { FunctionComponent, useEffect, useRef } from 'react'
import CardGeneric from 'components/generic/card/CardGeneric'
import styles from './linksmobile.module.scss'
import Link from 'next/link'
import { getServiceLinks } from 'lib/navbar/links'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import UserMobile from './UserMobile'
import LoginMobile from './LoginMobile'
import { ModelUserSelf } from 'models/user/ModelUser'
import { clickedElementIsPopupElement } from 'lib/util/PopupUtil'

type LinksMobileProps = {
  setVisible: Function;
  self?: ModelUserSelf;
}

const LinksMobile: FunctionComponent<LinksMobileProps> = ({ setVisible, self }) => {
  const card = useRef(null)

  const handleClick = (event: MouseEvent): void => {
    const clickedElement = document.elementFromPoint(event.clientX, event.clientY)
    const navLinks = document.getElementById('nav-links-burger')

    if (clickedElement && navLinks) {
      if (!clickedElementIsPopupElement(clickedElement, navLinks, card.current)) setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return function cleanup () {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={styles['links-card']} ref={card}>
      <CardGeneric className={`md:hidden hard-shadow text-center`}>
        <div className="w-full h-12 flex justify-between">
          <Link href='/'><a><img src="/images/logo_circle.png" className="h-12 w-12" /></a></Link>
          <div onClick={(): void => setVisible(false)}><Icon path={mdiClose} size={1} /></div>
        </div>
        <div className="space-y-4">
          {getServiceLinks().map(link => {
            return (
              <Link key={link.id} href={`/${link.id}`}><a className={`hover:text-${link.id}-500 block`}>{link.title}</a></Link>
            )
          })}
        </div>
        <hr className="m-4" />
        {self && <UserMobile self={self} />}
        {!self && <LoginMobile />}
      </CardGeneric>
    </div>
  )
}

export default LinksMobile
