import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { ModelUserSelf } from 'models/user/ModelUser'
import Config from 'config/default.json'
import styles from './usermobile.module.scss'
import Image from 'next/image'

type UserMobileProps = {
  self: ModelUserSelf;
}

const UserMobile: FunctionComponent<UserMobileProps> = ({ self }) => {
  return (
    <div className={`p-2 space-y-4 ${styles['user-mobile-wrapper']}`}>
      <div className="w-full flex justify-center">
        <Image className="rounded-full avatar-shadow" width={75} height={75} src={`${Config.bucketUrl}${self.avatarUrl}`} quality={100} priority />
      </div>
      <div className="bg-main-300 p-2 rounded-lg">
        <p className="text-lg">{self.username}</p>
        <p className="text-color-alt">{self.displayName}</p>
        <p className="text-color-alt text-sm">{self.email}</p>
      </div>
      <div className="space-y-2">
        <button className="w-full">Profile</button>
        <button className="w-full">Settings</button>
        <button className="button-red w-full">Logout</button>
      </div>
    </div>
  )
}

export default UserMobile
