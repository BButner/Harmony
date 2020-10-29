import CardGeneric from 'components/generic/card/CardGeneric'
import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useRef, useEffect } from 'react'
import styles from './userinfocard.module.scss'
import Closable from 'components/generic/Closable'
import { clickedElementIsPopupElement } from 'lib/util/PopupUtil'

type UserInfoCardProps = {
  self: ModelUserSelf,
  closeFunction: Function
}

const UserInfoCard: FunctionComponent<UserInfoCardProps> = ({ self, closeFunction }) => {
  const card = useRef(null)

  const handleClick = (event: MouseEvent): void => {
    const clickedElement = document.elementFromPoint(event.clientX, event.clientY)
    const loginLinks = document.getElementById('toggle-action-user')

    if (clickedElement && loginLinks) {
      if (!clickedElementIsPopupElement(clickedElement, loginLinks, card.current)) closeFunction(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return function cleanup () {
      window.removeEventListener('click', handleClick)
    }
  })

  return (
    <div className={styles['card-wrapper']} ref={card}>
      <CardGeneric>
        <Closable closeFunction={closeFunction} />
        <p>{self.username}</p>
      </CardGeneric>
    </div>
  )
}

export default UserInfoCard