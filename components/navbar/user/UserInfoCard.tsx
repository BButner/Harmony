import CardGeneric from 'components/generic/card/CardGeneric'
import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useRef, useEffect } from 'react'
import styles from './userinfocard.module.scss'
import Closable from 'components/generic/Closable'
import { clickedElementIsPopupElement } from 'lib/util/PopupUtil'
import Config from 'config/default.json'
import Image from 'next/image'

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
      <CardGeneric className="text-center space-y-6">
        <Closable closeFunction={closeFunction} />
        <div className="m-auto flex justify-center">
          <Image className="w-full m-auto " width={100} height={100} src={`${Config.bucketUrl}${self.avatarUrl}`} quality={100} priority />
        </div>
        <div>
          <p className="text-lg">Welcome, {self.username}.</p>
          <p className="text-color-alt">{self.displayName}</p>
          <p className="text-color-alt text-sm">{self.email}</p>
        </div>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <button className="w-32">Profile</button>
            <button className="w-32">Settings</button>
          </div>
          <button className="button-red w-full">Logout</button>
        </div>
      </CardGeneric>
    </div>
  )
}

export default UserInfoCard