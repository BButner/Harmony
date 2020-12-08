import CardGeneric from 'components/generic/card/CardGeneric'
import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useRef, useEffect } from 'react'
import styles from './userinfocard.module.scss'
import Closable from 'components/generic/Closable'
import { clickedElementIsPopupElement } from 'lib/util/PopupUtil'
import Image from 'next/image'
import Link from 'next/link'
import InformationWrapper from 'components/generic/information/InformationWrapper'
import useSWR from 'swr'
import { fetchUserSettings } from 'lib/fetcher/FetcherUserSettings'
import { updateDarkMode } from 'lib/pusher/PusherUser'
import DarkModeCheckbox from 'components/generic/DarkModeCheckbox'

type UserInfoCardProps = {
  self: ModelUserSelf,
  closeFunction: Function
}

const UserInfoCard: FunctionComponent<UserInfoCardProps> = ({ self, closeFunction }) => {
  const card = useRef(null)
  const { data: dataSettings, mutate: mutateSettings } = useSWR('/self/settings', () => fetchUserSettings(self.idExternal))

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
    <div className={`${styles['card-wrapper']} z-40`} ref={card}>
      <CardGeneric className="text-center space-y-6">
        <Closable closeFunction={closeFunction} />
        <div className="m-auto flex justify-center">
          <Image className="w-full m-auto rounded-full avatar-shadow" width={100} height={100} src={`${process.env.BUCKET_URL}${self.avatarUrl}`} quality={100} priority />
        </div>
        <InformationWrapper>
          <p className="text-lg">Hello, {self.username}.</p>
          <p className="text-color-alt">{self.displayName}</p>
          <p className="text-color-alt text-sm">{self.email}</p>
        </InformationWrapper>
        <DarkModeCheckbox idExternal={self.idExternal} dataSettings={dataSettings} mutateSettings={mutateSettings} />
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Link href={`/user/${self.idExternal}`}><button className="w-32">Profile</button></Link>
            <button className="w-32">Settings</button>
          </div>
          <form action={`${process.env.API_URL}/logout`} method="post">
            <button className="button-red w-full">Logout</button>
          </form>
        </div>
      </CardGeneric>
    </div>
  )
}

export default UserInfoCard