import { ModelUserSelf } from 'models/user/ModelUser'
import React, { FunctionComponent, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './userinfo.module.scss'
import UserInfoCard from './UserInfoCard'

type UserInfoProps = {
  self: ModelUserSelf
}

const UserInfo: FunctionComponent<UserInfoProps> = ({ self }) => {
  const [userInfoCardVisible, setUserInfoCardVisible] = useState<Boolean>(false)

  return (
    <>
      <div
        className={styles['user-wrapper'] + " p-2 flex justify-center items-center space-x-4"}
        id="toggle-action-user"
        onClick={(): void => setUserInfoCardVisible(!userInfoCardVisible)}
      >
        <div className="rounded-full h-8 w-8 bg-center bg-cover " style={{ backgroundImage: `url('${process.env.BUCKET_URL}${self.avatarUrl}')` }} />
        <p>{self.username}</p>
      </div>
      <CSSTransition in={userInfoCardVisible} timeout={{ exit: 250 }} unmountOnExit classNames="slide-from-right">
        <UserInfoCard self={self} closeFunction={setUserInfoCardVisible} />
      </CSSTransition>
    </>
  )
}

export default UserInfo