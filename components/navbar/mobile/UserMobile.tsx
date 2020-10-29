import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { ModelUserSelf } from 'models/user/ModelUser'
import Config from 'config/default.json'
import styles from './usermobile.module.scss'

type UserMobileProps = {
  self: ModelUserSelf;
}

const UserMobile: FunctionComponent<UserMobileProps> = ({ self }) => {
  return (
    <div className={`bg-main-300 p-2 space-y-4 ${styles['user-mobile-wrapper']}`}>
      <div className="flex justify-start items-center">
        <div className="rounded-full h-12 w-12 bg-center bg-cover " style={{ backgroundImage: `url('${Config.bucketUrl}${self.avatarUrl}')` }} />
        <div className="text-left pl-2">
          <p>{self.username}</p>
          <p className="text-xs">{self.email}</p>
        </div>
      </div>
      <div className="flex justify-between ml-4 mr-4">
        <Link href={`/user/${self.username}`}><a className="block">Profile</a></Link>
        <a className="block">Sign Out</a>
      </div>
    </div>
  )
}

export default UserMobile
